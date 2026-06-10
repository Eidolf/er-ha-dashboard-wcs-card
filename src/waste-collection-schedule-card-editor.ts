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

  get _max_items(): number {
    return this._config?.max_items ?? 5;
  }

  get _next_only(): boolean {
    return this._config?.next_only !== false;
  }

  get _entitiesList(): string[] {
    const list: string[] = [];
    if (this._config?.entity) {
      list.push(this._config.entity);
    }
    if (this._config?.entities && Array.isArray(this._config.entities)) {
      list.push(...this._config.entities);
    }
    return [...new Set(list)];
  }

  private _getDetectedWasteTypes(): string[] {
    if (!this.hass || !this._config) return [];
    const list = new Set<string>();
    const entities = this._entitiesList;
    
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
    const entities = this._entitiesList;

    return html`
      <div class="card-config">
        <!-- Multiple Entities Picker List -->
        <div class="option">
          <div class="section-title">Müllsensoren (Entitäten)</div>
          <div class="entities-list">
            ${entities.map((entityId, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${entityId}"
                  .index="${index}"
                  @value-changed="${this._entityChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
                <button class="delete-btn" @click="${() => this._removeEntity(index)}">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </button>
              </div>
            `)}
          </div>
          <button class="add-btn" @click="${this._addEntity}">
            <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
          </button>
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
            @change="${this._valueChanged}"
            @closed="${(ev: Event) => ev.stopPropagation()}"
          >
            <mwc-list-item value="card">${localize('editor.layout_card', '', '', lang)}</mwc-list-item>
            <mwc-list-item value="row">${localize('editor.layout_row', '', '', lang)}</mwc-list-item>
            <mwc-list-item value="grid">${localize('editor.layout_grid', '', '', lang)}</mwc-list-item>
          </ha-select>
        </div>

        <!-- Limit / Max Items -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.max_items', '', '', lang)}"
            type="number"
            .value="${String(this._max_items)}"
            .configValue="${'max_items'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Threshold to Hide -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.hide_before', '', '', lang)}"
            type="number"
            .value="${String(this._hide_before)}"
            .configValue="${'hide_before'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
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
              .checked="${!this._config?.hide_title}"
              .configValue="${'hide_title'}"
              .invert="${true}"
              @change="${this._toggleInvertedChanged}"
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

          <ha-formfield .label="${localize('editor.next_only', '', '', lang)}">
            <ha-switch
              .checked="${this._next_only}"
              .configValue="${'next_only'}"
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
          <div class="color-picker-box">
            <input 
              type="color" 
              .value="${selectedColor}" 
              @input="${(ev: any) => this._customStyleChanged(type, 'color', ev.target.value)}"
            />
          </div>

          <div class="icon-selector">
            <select 
              .value="${isCustomIcon ? 'custom' : selectedIcon}"
              @change="${(ev: any) => this._customStyleChanged(type, 'icon-select', ev.target.value)}"
            >
              ${COMMON_ICONS.map(i => html`<option value="${i.value}">${i.label}</option>`)}
              <option value="custom">Custom Icon...</option>
            </select>
          </div>

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
      this._config = { ...this._config, custom_colors: customColors };
    } else if (field === 'icon-select') {
      if (value !== 'custom') {
        const customIcons = { ...(this._config.custom_icons || {}) };
        customIcons[type] = value;
        this._config = { ...this._config, custom_icons: customIcons };
      }
    } else if (field === 'icon-text') {
      const customIcons = { ...(this._config.custom_icons || {}) };
      customIcons[type] = value;
      this._config = { ...this._config, custom_icons: customIcons };
    }

    this._fireConfigChanged();
  }

  private _entityChanged(ev: any): void {
    if (!this._config) return;
    const index = ev.target.index;
    const value = ev.detail.value;

    const list = [...this._entitiesList];
    if (value) {
      list[index] = value;
    } else {
      list.splice(index, 1);
    }

    this._updateEntities(list);
  }

  private _addEntity(): void {
    const list = [...this._entitiesList, ''];
    this._updateEntities(list);
  }

  private _removeEntity(index: number): void {
    const list = [...this._entitiesList];
    list.splice(index, 1);
    this._updateEntities(list);
  }

  private _updateEntities(list: string[]): void {
    const cleanList = list.filter(Boolean);
    this._config = {
      ...this._config,
      entity: undefined, // Clear legacy single entity key
      entities: cleanList.length > 0 ? cleanList : undefined
    };
    this._fireConfigChanged();
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue || target.getAttribute('configValue');
    
    if (configValue) {
      let value = target.value;
      if (configValue === 'max_items' || configValue === 'hide_before') {
        value = Number(value);
        if (isNaN(value)) value = undefined;
      }
      this._config = {
        ...this._config,
        [configValue]: value,
      };
      this._fireConfigChanged();
    }
  }

  private _toggleChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue || target.getAttribute('configValue');
    if (configValue) {
      this._config = {
        ...this._config,
        [configValue]: target.checked,
      };
      this._fireConfigChanged();
    }
  }

  private _toggleInvertedChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue || target.getAttribute('configValue');
    if (configValue) {
      this._config = {
        ...this._config,
        [configValue]: !target.checked,
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
    .entities-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .entity-row ha-entity-picker {
      flex: 1;
    }
    .delete-btn, .add-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--primary-text-color, #fff);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      transition: background 0.2s;
    }
    .delete-btn:hover {
      background: rgba(244, 67, 54, 0.2);
      border-color: rgba(244, 67, 54, 0.4);
    }
    .add-btn {
      padding: 8px 16px;
      width: fit-content;
      gap: 6px;
    }
    .add-btn:hover {
      background: rgba(255, 255, 255, 0.1);
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
