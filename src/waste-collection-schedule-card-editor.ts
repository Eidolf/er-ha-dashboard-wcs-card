import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WCSCardConfig, HomeAssistant } from './types';
import { localize } from './localize';

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

  get _icon_color(): string {
    return this._config?.icon_color || 'var(--primary-text-color)';
  }

  get _icon_size(): string {
    return this._config?.icon_size || '30px';
  }

  get _custom_colors_str(): string {
    return this._config?.custom_colors ? JSON.stringify(this._config.custom_colors, null, 2) : '';
  }

  get _custom_icons_str(): string {
    return this._config?.custom_icons ? JSON.stringify(this._config.custom_icons, null, 2) : '';
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    const lang = this.hass.language || 'en';

    return html`
      <div class="card-config">
        <!-- Main Entity -->
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

        <!-- Card Title -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.title', '', '', lang)}"
            .value="${this._title}"
            .configValue="${'title'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Layout Selector -->
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

        <!-- Icon Customizations -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.icon_size', '', '', lang)}"
            .value="${this._icon_size}"
            .configValue="${'icon_size'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Color Customizations -->
        <div class="option">
          <ha-textfield
            label="${localize('editor.due_color', '', '', lang)}"
            .value="${this._due_color}"
            .configValue="${'due_color'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <div class="option">
          <ha-textfield
            label="${localize('editor.due_1_color', '', '', lang)}"
            .value="${this._due_1_color}"
            .configValue="${'due_1_color'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <div class="option">
          <ha-textfield
            label="${localize('editor.icon_color', '', '', lang)}"
            .value="${this._icon_color}"
            .configValue="${'icon_color'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- JSON Custom Mappings -->
        <div class="option">
          <ha-textarea
            label="Custom Colors JSON (e.g. { \\"Bio\\": \\"green\\" })"
            .value="${this._custom_colors_str}"
            .configValue="${'custom_colors'}"
            @input="${this._jsonChanged}"
            rows="3"
          ></ha-textarea>
        </div>

        <div class="option">
          <ha-textarea
            label="Custom Icons JSON (e.g. { \\"Bio\\": \\"mdi:leaf\\" })"
            .value="${this._custom_icons_str}"
            .configValue="${'custom_icons'}"
            @input="${this._jsonChanged}"
            rows="3"
          ></ha-textarea>
        </div>

        <!-- Checkboxes -->
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

  private _jsonChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue;
    if (configValue) {
      try {
        const value = JSON.parse(target.value);
        this._config = {
          ...this._config,
          [configValue]: value,
        };
        this._fireConfigChanged();
      } catch (err) {
        // Suppress parse errors during typing
      }
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
    ha-select, ha-textfield, ha-textarea, ha-entity-picker {
      width: 100%;
    }
    .toggles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 8px;
    }
    ha-formfield {
      display: flex;
      align-items: center;
    }
  `;
}
