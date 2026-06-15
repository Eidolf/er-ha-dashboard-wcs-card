export interface WCSCardConfig {
  type: string;
  entity?: string;
  entities?: string[];
  title?: string;
  layout?: 'card' | 'row' | 'grid';
  dow_format?: 'long' | 'short';
  due_color?: string;
  due_1_color?: string;
  icon_color?: string;
  icon_size?: string;
  icon_cell_padding?: string;
  icon_cell_width?: string;
  hass_lang_priority?: boolean;
  hide_before?: number;
  hide_date?: boolean;
  hide_days?: boolean;
  hide_dow?: boolean;
  hide_icon?: boolean;
  hide_on_click?: boolean;
  hide_on_today?: boolean;
  hide_title?: boolean;
  title_size?: string;
  details_size?: string;
  custom_colors?: Record<string, string>;
  custom_icons?: Record<string, string>;
  language?: string;
  max_items?: number;
  next_only?: boolean;
}

export interface HassEntityAttributeBase {
  friendly_name?: string;
  unit_of_measurement?: string;
  icon?: string;
  [key: string]: any;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributeBase & {
    // Waste Collection Schedule attributes
    types?: string[];
    daysTo?: number;
    dateText?: string;
    wastes?: Array<{
      date: string;
      daysTo: number;
      type: string;
    }>;
    verbose_state?: boolean;
    verbose_format?: string;
  };
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale: {
    language: string;
    number_format: string;
    time_format: string;
    date_format: string;
  };
  themes: {
    themes: Record<string, any>;
    active_theme: string;
  };
  localize(key: string, ...args: any[]): string;
}

export interface WasteCollectionInfo {
  entityId: string;
  friendlyName: string;
  daysTo: number;
  dateText: string;
  types: string[];
  icon: string;
  color: string;
  isToday: boolean;
  isTomorrow: boolean;
  isAcknowledged: boolean;
}
