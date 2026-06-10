import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WCSCardConfig, HomeAssistant, WasteCollectionInfo, HassEntity } from './types';
import { styles } from './styles';
import { localize } from './localize';

// Import editor to register it
import './waste-collection-schedule-card-editor';

function hexToRgbStr(colorStr: string): string {
  let hex = colorStr.trim();
  if (hex.startsWith('var(')) {
    // If it's a CSS variable, we can't easily parse it to RGB on the server/JS side directly,
    // so we return a default or let it degrade.
    return '244, 67, 54';
  }
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const num = parseInt(hex, 16);
  if (isNaN(num)) return '244, 67, 54';
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

@customElement('waste-collection-schedule-card')
export class WasteCollectionScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: WCSCardConfig;

  public static get styles() {
    return styles;
  }

  public static getConfigElement() {
    return document.createElement('waste-collection-schedule-card-editor');
  }

  public static getStubConfig() {
    return {
      entity: '',
      title: 'Müllabfuhr',
      layout: 'card',
      hide_before: -1,
    };
  }

  public setConfig(config: WCSCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    
    // Normalize config
    this.config = {
      layout: 'card',
      hide_before: -1,
      hide_date: false,
      hide_days: false,
      hide_dow: true,
      hide_icon: false,
      hide_on_click: true,
      hide_on_today: false,
      hide_title: false,
      due_color: '#f44336', // Red
      due_1_color: '#ff9800', // Orange
      icon_color: 'var(--primary-text-color)',
      ...config
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) {
      return true;
    }
    // Update if any of the target entities' states changed
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass) {
      const entities = this._getEntities();
      for (const entity of entities) {
        if (oldHass.states[entity] !== this.hass.states[entity]) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  private _getEntities(): string[] {
    const list: string[] = [];
    if (this.config.entity) {
      list.push(this.config.entity);
    }
    if (this.config.entities && Array.isArray(this.config.entities)) {
      list.push(...this.config.entities);
    }
    return [...new Set(list)];
  }

  private _getWasteIcon(type: string): string {
    if (this.config.custom_icons) {
      const lowerType = type.toLowerCase();
      for (const [key, icon] of Object.entries(this.config.custom_icons)) {
        if (lowerType.includes(key.toLowerCase())) {
          return icon;
        }
      }
    }

    // Default icon mapping based on common German/English terms
    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun')) {
      return 'mdi:leaf';
    }
    if (typeLower.includes('papier') || typeLower.includes('pappe') || typeLower.includes('blau')) {
      return 'mdi:package-variant';
    }
    if (typeLower.includes('gelb') || typeLower.includes('plastik') || typeLower.includes('recycle') || typeLower.includes('wertstoff')) {
      return 'mdi:recycle';
    }
    if (typeLower.includes('rest') || typeLower.includes('hausmüll') || typeLower.includes('grau') || typeLower.includes('schwarz')) {
      return 'mdi:trash-can';
    }
    if (typeLower.includes('glas') || typeLower.includes('flasche')) {
      return 'mdi:glass-fragile';
    }
    if (typeLower.includes('schadstoff') || typeLower.includes('gift') || typeLower.includes('chem')) {
      return 'mdi:biohazard';
    }
    if (typeLower.includes('sperr')) {
      return 'mdi:sofa';
    }
    if (typeLower.includes('tanne') || typeLower.includes('baum') || typeLower.includes('weihnacht')) {
      return 'mdi:pine-tree';
    }

    return 'mdi:trash-can-outline';
  }

  private _getWasteColor(type: string): string {
    if (this.config.custom_colors) {
      const lowerType = type.toLowerCase();
      for (const [key, color] of Object.entries(this.config.custom_colors)) {
        if (lowerType.includes(key.toLowerCase())) {
          return color;
        }
      }
    }

    // Default color mapping
    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun')) {
      return '#4caf50'; // Green
    }
    if (typeLower.includes('papier') || typeLower.includes('pappe') || typeLower.includes('blau')) {
      return '#2196f3'; // Blue
    }
    if (typeLower.includes('gelb') || typeLower.includes('plastik') || typeLower.includes('recycle') || typeLower.includes('wertstoff')) {
      return '#fbc02d'; // Yellow
    }
    if (typeLower.includes('rest') || typeLower.includes('hausmüll') || typeLower.includes('grau') || typeLower.includes('schwarz')) {
      return '#707070'; // Gray
    }
    if (typeLower.includes('glas') || typeLower.includes('flasche')) {
      return '#00bcd4'; // Cyan
    }
    if (typeLower.includes('schadstoff') || typeLower.includes('gift') || typeLower.includes('chem')) {
      return '#9c27b0'; // Purple
    }
    if (typeLower.includes('sperr')) {
      return '#795548'; // Brown
    }
    if (typeLower.includes('tanne') || typeLower.includes('baum') || typeLower.includes('weihnacht')) {
      return '#009688'; // Teal
    }

    return this.config.icon_color || 'var(--primary-text-color)';
  }

  private _parseEntities(): WasteCollectionInfo[] {
    const list: WasteCollectionInfo[] = [];
    const entities = this._getEntities();

    for (const entityId of entities) {
      const stateObj = this.hass.states[entityId] as HassEntity | undefined;
      if (!stateObj) continue;

      const attrs = stateObj.attributes;
      
      // Case 1: The entity contains multiple wastes in `wastes` array attribute (standard next_collection style)
      if (attrs.wastes && Array.isArray(attrs.wastes)) {
        for (const wasteItem of attrs.wastes) {
          const daysTo = Number(wasteItem.daysTo);
          if (isNaN(daysTo)) continue;

          const dateStr = wasteItem.date;
          const wasteType = wasteItem.type || stateObj.attributes.friendly_name || 'Müll';
          
          const isToday = daysTo === 0;
          const isTomorrow = daysTo === 1;
          
          const ackKey = `wcs_ack_${entityId}_${wasteType}_${dateStr}`;
          const isAcknowledged = localStorage.getItem(ackKey) === 'true';

          list.push({
            entityId,
            friendlyName: wasteType,
            daysTo,
            dateText: dateStr,
            types: [wasteType],
            icon: this._getWasteIcon(wasteType),
            color: this._getWasteColor(wasteType),
            isToday,
            isTomorrow,
            isAcknowledged,
          });
        }
      } else {
        // Case 2: Individual sensor (one type of waste)
        // Standard State can be the number of days or date string
        let daysTo = Number(stateObj.state);
        if (isNaN(daysTo) && attrs.daysTo !== undefined) {
          daysTo = Number(attrs.daysTo);
        }
        
        // If state is not a number, see if we can read daysTo from attributes
        if (isNaN(daysTo)) {
          continue;
        }

        const friendlyName = attrs.friendly_name || entityId;
        const types = attrs.types || [friendlyName];
        const primaryType = types[0] || friendlyName;
        
        const dateText = attrs.dateText || '';
        const isToday = daysTo === 0;
        const isTomorrow = daysTo === 1;

        const ackKey = `wcs_ack_${entityId}_${primaryType}_${dateText}`;
        const isAcknowledged = localStorage.getItem(ackKey) === 'true';

        list.push({
          entityId,
          friendlyName,
          daysTo,
          dateText,
          types,
          icon: this._getWasteIcon(primaryType),
          color: this._getWasteColor(primaryType),
          isToday,
          isTomorrow,
          isAcknowledged,
        });
      }
    }

    // Sort list by days remaining
    return list.sort((a, b) => a.daysTo - b.daysTo);
  }

  private _acknowledge(item: WasteCollectionInfo): void {
    if (!this.config.hide_on_click) return;
    if (!item.isToday && !item.isTomorrow) return;

    const ackKey = `wcs_ack_${item.entityId}_${item.types[0] || item.friendlyName}_${item.dateText}`;
    localStorage.setItem(ackKey, 'true');
    this.requestUpdate();
  }

  protected render(): TemplateResult | null {
    if (!this.hass) return null;

    const parsedItems = this._parseEntities();
    const lang = this.config.language || this.hass.language || 'en';

    // Filter based on configuration
    const filteredItems = parsedItems.filter(item => {
      // Hide acknowledged items
      if (item.isAcknowledged) return false;

      // Hide today if hide_on_today config is active
      if (this.config.hide_on_today && item.isToday) return false;

      // Hide if before threshold
      if (this.config.hide_before !== undefined && this.config.hide_before > -1) {
        if (item.daysTo > this.config.hide_before) return false;
      }

      return true;
    });

    if (filteredItems.length === 0) {
      // If we are to hide the whole card, return empty
      return html``;
    }

    // Generate style overrides for rgb colors
    const dueColorHex = this.config.due_color || '#f44336';
    const due1ColorHex = this.config.due_1_color || '#ff9800';

    return html`
      <div 
        class="wcs-card ${this.config.layout ? `layout-${this.config.layout}` : ''}"
        style="
          --rgb-due-color: ${hexToRgbStr(dueColorHex)};
          --rgb-due-1-color: ${hexToRgbStr(due1ColorHex)};
        "
      >
        ${!this.config.hide_title && this.config.title
          ? html`
              <div class="wcs-header" style="${this.config.title_size ? `font-size: ${this.config.title_size};` : ''}">
                ${this.config.title}
              </div>
            `
          : ''}

        <div class="wcs-container ${this.config.layout ? `layout-${this.config.layout}` : ''}">
          ${filteredItems.map(item => this._renderItem(item, lang))}
        </div>
      </div>
    `;
  }

  private _renderItem(item: WasteCollectionInfo, lang: string): TemplateResult {
    // Choose status text
    let statusText = '';
    if (item.isToday) {
      statusText = localize('state.today', '', '', lang);
    } else if (item.isTomorrow) {
      statusText = localize('state.tomorrow', '', '', lang);
    } else if (item.daysTo === 1) {
      statusText = localize('state.1_day', '', '', lang);
    } else {
      statusText = localize('state.in_days', '{days}', String(item.daysTo), lang);
    }

    // Icon dynamic styling
    let iconColor = item.color;
    if (item.isToday && this.config.due_color) {
      iconColor = this.config.due_color;
    } else if (item.isTomorrow && this.config.due_1_color) {
      iconColor = this.config.due_1_color;
    }

    const itemClasses = [
      'wcs-item',
      this.config.layout ? `layout-${this.config.layout}` : '',
      item.isToday ? 'due-today' : '',
      item.isTomorrow ? 'due-tomorrow' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div 
        class="${itemClasses}"
        @click="${() => this._acknowledge(item)}"
      >
        ${!this.config.hide_icon
          ? html`
              <div class="wcs-icon-wrapper ${this.config.layout ? `layout-${this.config.layout}` : ''}">
                <ha-icon
                  icon="${item.icon}"
                  style="
                    color: ${iconColor};
                    --mdc-icon-size: ${this.config.icon_size || '30px'};
                    width: ${this.config.icon_size || '30px'};
                    height: ${this.config.icon_size || '30px'};
                  "
                ></ha-icon>
              </div>
            `
          : ''}

        <div class="wcs-content ${this.config.layout ? `layout-${this.config.layout}` : ''}">
          <div 
            class="wcs-name ${this.config.layout ? `layout-${this.config.layout}` : ''}"
            style="${this.config.title_size ? `font-size: ${this.config.title_size};` : ''}"
          >
            ${item.friendlyName}
          </div>
          
          <div 
            class="wcs-details ${this.config.layout ? `layout-${this.config.layout}` : ''}"
            style="${this.config.details_size ? `font-size: ${this.config.details_size};` : ''}"
          >
            ${!this.config.hide_date && item.dateText
              ? html`<span class="wcs-date">${item.dateText}</span>`
              : ''}
            
            ${!this.config.hide_days
              ? html`
                  <span class="wcs-badge ${item.isToday ? 'today' : item.isTomorrow ? 'tomorrow' : 'upcoming'}">
                    ${statusText}
                  </span>
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}

// Add the card to Home Assistant's card list
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'waste-collection-schedule-card',
  name: 'Waste Collection Schedule Card',
  description: 'A modern Lovelace card for Home Assistant waste collection schedules.',
  preview: true,
});
