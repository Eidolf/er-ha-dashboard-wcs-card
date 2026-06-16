const languages: Record<string, Record<string, string>> = {
  en: {
    'state.today': 'Today',
    'state.tomorrow': 'Tomorrow',
    'state.in_days': 'In {days} days',
    'state.1_day': 'In 1 day',
    'state.days': 'days',
    'state.day': 'day',
    'editor.entity': 'Entity (Required)',
    'editor.entities': 'Entities (Optional, list)',
    'editor.title': 'Title',
    'editor.layout': 'Layout Style',
    'editor.layout_card': 'Standard Card',
    'editor.layout_row': 'Compact Row',
    'editor.layout_grid': 'Grid Layout',
    'editor.hide_before': 'Hide entire card until X days before (Default: -1 / disabled)',
    'editor.hide_date': 'Hide Date Text',
    'editor.hide_days': 'Hide Number of Days',
    'editor.hide_dow': 'Hide Day of the Week',
    'editor.hide_icon': 'Hide Icon',
    'editor.hide_on_click': 'Dismiss on click (when due today/tomorrow)',
    'editor.hide_on_today': 'Hide on today (e.g. if collected early in morning)',
    'editor.hide_title': 'Hide Title',
    'editor.icon_size': 'Icon Size (e.g., 30px)',
    'editor.due_color': 'Due Today Color (e.g., red or #ff0000)',
    'editor.due_1_color': 'Due Tomorrow Color (e.g., orange)',
    'editor.icon_color': 'Standard Icon Color (e.g., var(--primary-text-color))',
    'editor.invalid_json': 'Invalid JSON format',
    'editor.max_items': 'Maximum items to display (Default: 5)',
    'editor.next_only': 'Only show the next upcoming collection per waste type',
    'editor.date_format': 'Date Format',
  },
  de: {
    'state.today': 'Heute',
    'state.tomorrow': 'Morgen',
    'state.in_days': 'In {days} Tagen',
    'state.1_day': 'In 1 Tag',
    'state.days': 'Tage',
    'state.day': 'Tag',
    'editor.entity': 'Entität (Erforderlich)',
    'editor.entities': 'Entitäten (Optional, Liste)',
    'editor.title': 'Titel',
    'editor.layout': 'Layout-Stil',
    'editor.layout_card': 'Standard-Karte',
    'editor.layout_row': 'Kompakte Zeile',
    'editor.layout_grid': 'Raster-Layout (Grid)',
    'editor.hide_before': 'Karte ausblenden bis X Tage vor Termin (Standard: -1 / inaktiv)',
    'editor.hide_date': 'Datum ausblenden',
    'editor.hide_days': 'Tage ausblenden',
    'editor.hide_dow': 'Wochentag ausblenden',
    'editor.hide_icon': 'Icon ausblenden',
    'editor.hide_on_click': 'Per Klick ausblenden (wenn heute/morgen fällig)',
    'editor.hide_on_today': 'Heute ausblenden (z.B. bei früher Abholung)',
    'editor.hide_title': 'Titel ausblenden',
    'editor.icon_size': 'Icon-Größe (z.B. 30px)',
    'editor.due_color': 'Farbe am Abholtag (z.B. red oder #ff0000)',
    'editor.due_1_color': 'Farbe am Vortag (z.B. orange)',
    'editor.icon_color': 'Standard Icon-Farbe (z.B. var(--primary-text-color))',
    'editor.invalid_json': 'Ungültiges JSON-Format',
    'editor.max_items': 'Maximale Anzahl an Terminen (Standard: 5)',
    'editor.next_only': 'Nur den nächsten Termin pro Müllsorte anzeigen',
    'editor.date_format': 'Datumsformat',
  }
};

export function localize(string: string, search = '', replace = '', lang = 'en'): string {
  const language = lang.split('-')[0];
  const translations = languages[language] || languages['en'];
  
  let translated = translations[string] || languages['en'][string] || string;

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
