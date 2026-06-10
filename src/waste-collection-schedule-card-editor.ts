import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WCSCardConfig, HomeAssistant } from './types';
import { localize } from './localize';

// Import helper functions to parse names
function cleanWasteName(name: string): string {
  return name
    .replace(/Waste Collection Schedule\s*/gi, '')
    .trim();
}

function parseDateString(str: string): Date | null {
  if (!str) return null;
  let match = str.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  match = str.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return null;
}

const COMMON_ICONS = [
  { value: 'mdi:leaf', label: 'Leaf (Bio / Garden)' },
  { value: 'mdi:trash-can', label: 'Trash Can (Restmüll)' },
  { value: 'mdi:package-variant', label: 'Package (Papier)' },
  { value: 'mdi:recycle', label: 'Recycle (Gelber Sack)' },
  { value: 'mdi:glass-fragile', label: 'Glass (Glas)' },
  { value: 'mdi:sofa', label: 'Sofa (Sperrmüll)' },
  { value: 'mdi:biohazard', label: 'Biohazard (Schadstoff)' },
  { value: 'mdi:pine-tree', label: 'Pine Tree (Weihnachtsbaum)' },
  { value: 'mdi:trash-can-outline', label: 'Default outline' }
];

@customElement('waste-collection-schedule-card-editor')
export class WasteCollectionScheduleCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WCSCardConfig;

  public setConfig(config: WCSCardConfig): void {
    this._config = config;
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  get _title(): string {
    return this._config?.title || '';
  }

  get _layout(): string {
    return this._config?.layout || 'card';
  }

  get _hide_before(): number {
    return this._config?.hide_before ?? -1;
  }

  get _due_color(): string {
    return this._config?.due_color || '#f44336';
  }

  get _due_1_color(): string {
    return this._config?.due_1_color || '#ff9800';
  }

  get _icon_size(): string {
    return this._config?.icon_size || '30px';
  }

  private _getDetectedWasteTypes(): string[] {
    if (!this.hass || !this._config) return [];
    const list = new Set<string>();
    const entities: string[] = [];
    if (this._config.entity) entities.push(this._config.entity);
    if (this._config.entities && Array.isArray(this._config.entities)) {
      entities.push(...this._config.entities);
    }
    
    for (const entityId of entities) {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) continue;
      const attrs = stateObj.attributes;

      // 1. Wastes array
      if (attrs.wastes && Array.isArray(attrs.wastes)) {
        for (const w of attrs.wastes) {
          if (w.type) list.add(cleanWasteName(w.type));
        }
      }
      // 2. Attributes with date keys
      for (const [key, val] of Object.entries(attrs)) {
        if (parseDateString(key)) {
          list.add(cleanWasteName(String(val)));
        }
      }
      // 3. Fallback to friendly name or entity ID
      const friendly = cleanWasteName(attrs.friendly_name || entityId.split('.').pop() || '');
      if (friendly) list.add(friendly);
    }

    return Array.from(list).filter(Boolean);
  }

  private _getWasteColor(type: string): string {
    const customColors = this._config?.custom_colors || {};
    // Return custom color or fallback to standard color picker format (hex)
    if (customColors[type]) return customColors[type];
    
    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun') || typeLower.includes('garten')) {
      return '#4caf50';
    }
    if (typeLower.includes('papier') || typeLower.includes('pappe') || typeLower.includes('blau')) {
      return '#2196f3';
    }
    if (typeLower.includes('gelb') || typeLower.includes('plastik') || typeLower.includes('recycle') || typeLower.includes('wertstoff')) {
      return '#fbc02d';
    }
    if (typeLower.includes('rest') || typeLower.includes('hausmüll') || typeLower.includes('grau') || typeLower.includes('schwarz')) {
      return '#707070';
    }
    if (typeLower.includes('glas') || typeLower.includes('flasche')) {
      return '#00bcd4';
    }
    return '#e1e1e1';
  }

  private _getWasteIcon(type: string): string {
    const customIcons = this._config?.custom_icons || {};
    if (customIcons[type]) return customIcons[type];

    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun') || typeLower.includes('garten')) return 'mdi:leaf';
    if (typeLower.includes('papier') || typeLower.includes('pappe') || typeLower.includes('blau')) return 'mdi:package-variant';
    if (typeLower.includes('gelb') || typeLower.includes('plastik') || typeLower.includes('recycle') || typeLower.includes('wertstoff')) return 'mdi:recycle';
    if (typeLower.includes('rest') || typeLower.includes('hausmüll') || typeLower.includes('grau') || typeLower.includes('schwarz')) return 'mdi:trash-can';
    if (typeLower.includes('glas') || typeLower.includes('flasche')) return 'mdi:glass-fragile';
    return 'mdi:trash-can-outline';
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    const lang = this.hass.language || 'en';
    const detectedTypes = this._getDetectedWasteTypes();

    return html`
      <div class="card-config">
        <!-- Main Entity Selection -->
        <div class="option">
          <ha-entity-picker
            .label="${localize('editor.entity', '', '', lang)}"
            .hass="${this.hass}"
            .value="${this._entity}"
            .configValue="${'entity'}"
            @value-changed="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <!-- Multiple Entities (Text input list) -->
        <div class="option">
          <ha-textfield
            label="Zusätzliche Entitäten (Kommagetrennt für mehrere)"
            .value="${this._config?.entities ? this._config.entities.join(', ') : ''}"
            .configValue="${'entities'}"
            @input="${this._entitiesChanged}"
          ></ha-textfield>
        </div>

        <!-- Card Title -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.title', '', '', lang)}"
            .value="${this._title}"
            .configValue="${'title'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Layout Style -->
        <div class="option">
          <ha-select
            label="${localize('editor.layout', '', '', lang)}"
            .value="${this._layout}"
            .configValue="${'layout'}"
            @selected="${this._valueChanged}"
            @closed="${(ev: Event) => ev.stopPropagation()}"
          >
            <mwc-list-item value="card">${localize('editor.layout_card', '', '', lang)}</mwc-list-item>
            <mwc-list-item value="row">${localize('editor.layout_row', '', '', lang)}</mwc-list-item>
            <mwc-list-item value="grid">${localize('editor.layout_grid', '', '', lang)}</mwc-list-item>
          </ha-select>
        </div>

        <!-- Style customization headers -->
        <div class="section-title">Farben für Termine & Icons</div>

        <!-- Due colors -->
        <div class="color-row">
          <div class="color-picker-wrapper">
            <span class="color-label">Heute fällig:</span>
            <input 
              type="color" 
              .value="${this._due_color}" 
              .configValue="${'due_color'}"
              @input="${this._valueChanged}"
            />
          </div>
          <div class="color-picker-wrapper">
            <span class="color-label">Morgen fällig:</span>
            <input 
              type="color" 
              .value="${this._due_1_color}" 
              .configValue="${'due_1_color'}"
              @input="${this._valueChanged}"
            />
          </div>
        </div>

        <div class="option">
          <ha-textfield
            label="${localize('editor.icon_size', '', '', lang)}"
            .value="${this._icon_size}"
            .configValue="${'icon_size'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Detected Waste Types Custom Style Editor -->
        ${detectedTypes.length > 0
          ? html`
              <div class="section-title">Müllsorten anpassen</div>
              <div class="waste-customizer-list">
                ${detectedTypes.map(type => this._renderWasteCustomizerRow(type))}
              </div>
            `
          : ''}

        <!-- General switches -->
        <div class="section-title">Anzeige-Optionen</div>
        <div class="toggles">
          <ha-formfield .label="${localize('editor.hide_title', '', '', lang)}">
            <ha-switch
              .checked="${!!this._config?.hide_title}"
              .configValue="${'hide_title'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${localize('editor.hide_date', '', '', lang)}">
            <ha-switch
              .checked="${!!this._config?.hide_date}"
              .configValue="${'hide_date'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${localize('editor.hide_days', '', '', lang)}">
            <ha-switch
              .checked="${!!this._config?.hide_days}"
              .configValue="${'hide_days'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${localize('editor.hide_icon', '', '', lang)}">
            <ha-switch
              .checked="${!!this._config?.hide_icon}"
              .configValue="${'hide_icon'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${localize('editor.hide_on_click', '', '', lang)}">
            <ha-switch
              .checked="${this._config?.hide_on_click !== false}"
              .configValue="${'hide_on_click'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${localize('editor.hide_on_today', '', '', lang)}">
            <ha-switch
              .checked="${!!this._config?.hide_on_today}"
              .configValue="${'hide_on_today'}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }

  private _renderWasteCustomizerRow(type: string): TemplateResult {
    const selectedIcon = this._getWasteIcon(type);
    const selectedColor = this._getWasteColor(type);
    const isCustomIcon = !COMMON_ICONS.some(i => i.value === selectedIcon);

    return html`
      <div class="waste-row">
        <div class="waste-type-header">${type}</div>
        <div class="waste-inputs">
          <!-- Color picker -->
          <div class="color-picker-box">
            <input 
              type="color" 
              .value="${selectedColor}" 
              @input="${(ev: any) => this._customStyleChanged(type, 'color', ev.target.value)}"
            />
          </div>

          <!-- Icon Selector Dropdown -->
          <div class="icon-selector">
            <select 
              .value="${isCustomIcon ? 'custom' : selectedIcon}"
              @change="${(ev: any) => this._customStyleChanged(type, 'icon-select', ev.target.value)}"
            >
              ${COMMON_ICONS.map(i => html`<option value="${i.value}">${i.label}</option>`)}
              <option value="custom">Custom Icon...</option>
            </select>
          </div>

          <!-- Custom icon input (only if custom is selected) -->
          <div class="custom-icon-input">
            <input 
              type="text" 
              placeholder="mdi:trash-can" 
              .value="${selectedIcon}"
              @input="${(ev: any) => this._customStyleChanged(type, 'icon-text', ev.target.value)}"
            />
          </div>
        </div>
      </div>
    `;
  }

  private _customStyleChanged(type: string, field: 'color' | 'icon-select' | 'icon-text', value: string): void {
    if (!this._config) return;

    if (field === 'color') {
      const customColors = { ...(this._config.custom_colors || {}) };
      customColors[type] = value;
      this._config = {
        ...this._config,
        custom_colors: customColors
      };
    } else if (field === 'icon-select') {
      if (value !== 'custom') {
        const customIcons = { ...(this._config.custom_icons || {}) };
        customIcons[type] = value;
        this._config = {
          ...this._config,
          custom_icons: customIcons
        };
      }
    } else if (field === 'icon-text') {
      const customIcons = { ...(this._config.custom_icons || {}) };
      customIcons[type] = value;
      this._config = {
        ...this._config,
        custom_icons: customIcons
      };
    }

    this._fireConfigChanged();
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue;
    
    if (configValue) {
      let value = target.value;
      if (target.type === 'number') {
        value = Number(value);
      }
      this._config = {
        ...this._config,
        [configValue]: value,
      };
      this._fireConfigChanged();
    }
  }

  private _entitiesChanged(ev: any): void {
    if (!this._config) return;
    const val = ev.target.value;
    const entities = val.split(',').map((e: string) => e.trim()).filter(Boolean);
    this._config = {
      ...this._config,
      entities: entities.length > 0 ? entities : undefined
    };
    this._fireConfigChanged();
  }

  private _toggleChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue;
    if (configValue) {
      this._config = {
        ...this._config,
        [configValue]: target.checked,
      };
      this._fireConfigChanged();
    }
  }

  private _fireConfigChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .option {
      display: flex;
      flex-direction: column;
    }
    .section-title {
      font-weight: bold;
      font-size: 1.1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 4px;
      margin-top: 8px;
    }
    .color-row {
      display: flex;
      gap: 16px;
    }
    .color-picker-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .color-picker-wrapper input[type="color"] {
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      background: none;
    }
    .color-label {
      font-size: 0.95rem;
    }
    .waste-customizer-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .waste-row {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.03);
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .waste-type-header {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .waste-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .color-picker-box input[type="color"] {
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      background: none;
    }
    .icon-selector select {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      min-width: 140px;
    }
    .custom-icon-input input {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      width: 130px;
    }
    ha-select, ha-textfield, ha-textarea, ha-entity-picker {
      width: 100%;
    }
    .toggles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    ha-formfield {
      display: flex;
      align-items: center;
    }
  `;
}
