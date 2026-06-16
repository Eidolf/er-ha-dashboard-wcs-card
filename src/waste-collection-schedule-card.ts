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

function parseDateString(str: string): Date | null {
  if (!str) return null;
  // Try to match YYYY-MM-DD
  let match = str.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  // Try to match DD.MM.YYYY
  match = str.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (match) {
    return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  }
  // Try to match MM/DD/YYYY
  match = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    return new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2]));
  }
  return null;
}

function formatDate(date: Date, format: string): string {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  if (format === 'YYYY-MM-DD') {
    return `${yyyy}-${mm}-${dd}`;
  }
  return `${dd}.${mm}.${yyyy}`;
}

function calculateDaysDifference(targetDate: Date, currentDate: Date): number {
  const d1 = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const d2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function cleanWasteName(name: string): string {
  return name
    .replace(/Waste Collection Schedule\s*/gi, '')
    .trim();
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
      due_color: '#f44336',
      due_1_color: '#ff9800',
      icon_color: 'var(--primary-text-color)',
      next_only: true,
      max_items: 5,
      date_format: 'DD.MM.YYYY',
      ...config
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) {
      return true;
    }
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

    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun') || typeLower.includes('garten')) {
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

    const typeLower = type.toLowerCase();
    if (typeLower.includes('bio') || typeLower.includes('organ') || typeLower.includes('braun') || typeLower.includes('garten')) {
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
    const today = new Date();

    for (const entityId of entities) {
      const stateObj = this.hass.states[entityId] as HassEntity | undefined;
      if (!stateObj) continue;

      const attrs = stateObj.attributes;
      const friendlyName = cleanWasteName(attrs.friendly_name || entityId.split('.').pop() || 'Müll');

      let parsedAny = false;

        // 1. Check if the entity contains multiple wastes in `wastes` array attribute
        if (attrs.wastes && Array.isArray(attrs.wastes)) {
          for (const wasteItem of attrs.wastes) {
            const daysTo = Number(wasteItem.daysTo);
            if (isNaN(daysTo)) continue;

            const dateStr = wasteItem.date;
            const wasteType = cleanWasteName(wasteItem.type || friendlyName);
            
            const isToday = daysTo === 0;
            const isTomorrow = daysTo === 1;
            const ackKey = `wcs_ack_${entityId}_${wasteType}_${dateStr}`;
            const isAcknowledged = localStorage.getItem(ackKey) === 'true';

            const parsedDate = parseDateString(dateStr);
            const displayDate = parsedDate ? formatDate(parsedDate, this.config.date_format || 'DD.MM.YYYY') : dateStr;

            list.push({
              entityId,
              friendlyName: wasteType,
              daysTo,
              dateText: displayDate,
              types: [wasteType],
              icon: this._getWasteIcon(wasteType),
              color: this._getWasteColor(wasteType),
              isToday,
              isTomorrow,
              isAcknowledged,
              ackKey,
            });
            parsedAny = true;
          }
        }

        // 2. Scan all attribute keys for dates (e.g. "2026-06-17": "Biotonne")
        for (const [key, val] of Object.entries(attrs)) {
          const parsedDate = parseDateString(key);
          if (parsedDate) {
            const daysTo = calculateDaysDifference(parsedDate, today);
            if (daysTo < 0) continue; // Skip past collections

            const wasteType = cleanWasteName(String(val));
            const dateStr = key;
            const isToday = daysTo === 0;
            const isTomorrow = daysTo === 1;
            const ackKey = `wcs_ack_${entityId}_${wasteType}_${dateStr}`;
            const isAcknowledged = localStorage.getItem(ackKey) === 'true';

            const displayDate = formatDate(parsedDate, this.config.date_format || 'DD.MM.YYYY');

            if (!list.some(item => item.entityId === entityId && item.friendlyName === wasteType && item.dateText === displayDate)) {
              list.push({
                entityId,
                friendlyName: wasteType,
                daysTo,
                dateText: displayDate,
                types: [wasteType],
                icon: this._getWasteIcon(wasteType),
                color: this._getWasteColor(wasteType),
                isToday,
                isTomorrow,
                isAcknowledged,
                ackKey,
              });
              parsedAny = true;
            }
          }
        }

        // 3. Fallback: Parse state itself
        if (!parsedAny) {
          let daysTo = Number(stateObj.state);
          let dateText = attrs.dateText || '';
          let wasteType = friendlyName;

          // If not a number, try parsing state as a date string (e.g. "on Wed, 17.06.2026")
          if (isNaN(daysTo)) {
            const parsedDate = parseDateString(stateObj.state);
            if (parsedDate) {
              daysTo = calculateDaysDifference(parsedDate, today);
              dateText = stateObj.state.replace(/^on\s+\w+,\s+/i, ''); // clean prefix like "on Wed, "
            }
          }

          if (!isNaN(daysTo) && daysTo >= 0) {
            const isToday = daysTo === 0;
            const isTomorrow = daysTo === 1;
            const ackKey = `wcs_ack_${entityId}_${wasteType}_${dateText}`;
            const isAcknowledged = localStorage.getItem(ackKey) === 'true';

            const parsedDate = parseDateString(dateText);
            const displayDate = parsedDate ? formatDate(parsedDate, this.config.date_format || 'DD.MM.YYYY') : dateText;

            list.push({
              entityId,
              friendlyName: wasteType,
              daysTo,
              dateText: displayDate,
              types: [wasteType],
              icon: this._getWasteIcon(wasteType),
              color: this._getWasteColor(wasteType),
              isToday,
              isTomorrow,
              isAcknowledged,
              ackKey,
            });
          }
        }
    }

    // Sort by days remaining
    let sorted = list.sort((a, b) => a.daysTo - b.daysTo);

    // If next_only is true, filter to show only the single nearest date per unique waste type name
    if (this.config.next_only !== false) {
      const seen = new Set<string>();
      sorted = sorted.filter(item => {
        const key = item.friendlyName.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // Limit by max_items if defined and > 0
    const maxItems = Number(this.config.max_items ?? 5);
    if (!isNaN(maxItems) && maxItems > 0) {
      sorted = sorted.slice(0, maxItems);
    }

    return sorted;
  }

  private _acknowledge(item: WasteCollectionInfo): void {
    if (!this.config.hide_on_click) return;
    if (!item.isToday && !item.isTomorrow) return;

    localStorage.setItem(item.ackKey, 'true');
    this.requestUpdate();
  }

  protected render(): TemplateResult | null {
    if (!this.hass) return null;

    const entities = this._getEntities().filter(Boolean);
    let parsedItems = this._parseEntities();
    const lang = this.config.language || this.hass.language || 'en';

    const isPreview = entities.length === 0;
    if (isPreview) {
      parsedItems = [
        {
          entityId: 'stub.bio',
          friendlyName: 'Biotonne',
          daysTo: 0,
          dateText: formatDate(new Date(), this.config.date_format || 'DD.MM.YYYY'),
          types: ['Bio'],
          icon: 'mdi:leaf',
          color: '#4caf50',
          isToday: true,
          isTomorrow: false,
          isAcknowledged: false,
          ackKey: '',
        },
        {
          entityId: 'stub.paper',
          friendlyName: 'Altpapier',
          daysTo: 1,
          dateText: formatDate(new Date(Date.now() + 86400000), this.config.date_format || 'DD.MM.YYYY'),
          types: ['Papier'],
          icon: 'mdi:package-variant',
          color: '#2196f3',
          isToday: false,
          isTomorrow: true,
          isAcknowledged: false,
          ackKey: '',
        },
        {
          entityId: 'stub.rest',
          friendlyName: 'Restmüll',
          daysTo: 5,
          dateText: formatDate(new Date(Date.now() + 5 * 86400000), this.config.date_format || 'DD.MM.YYYY'),
          types: ['Restmüll'],
          icon: 'mdi:trash-can',
          color: '#707070',
          isToday: false,
          isTomorrow: false,
          isAcknowledged: false,
          ackKey: '',
        }
      ];
    }

    const filteredItems = isPreview ? parsedItems : parsedItems.filter(item => {
      if (item.isAcknowledged) return false;
      if (this.config.hide_on_today && item.isToday) return false;
      if (this.config.hide_before !== undefined && this.config.hide_before > -1) {
        if (item.daysTo > this.config.hide_before) return false;
      }
      return true;
    });

    if (filteredItems.length === 0) {
      return html``;
    }

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

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'waste-collection-schedule-card',
  name: 'Waste Collection Schedule Card',
  description: 'A modern Lovelace card for Home Assistant waste collection schedules.',
  preview: true,
});
