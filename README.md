# Waste Collection Schedule Card

A modern, high-quality, and highly customizable Home Assistant Lovelace custom card for displaying waste collection schedules. Built specifically as a modern successor for Home Assistant 2026.x, using LitElement, shadow DOM, and featuring responsive layout engines (cards, rows, and grids) with premium glassmorphic styling and smooth animations.

This card is designed to integrate seamlessly with the popular [HACS Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule) component.

---

## Features

- 🎨 **Modern Design**: Responsive glassmorphism styling that respects your active Home Assistant theme (light/dark mode out of the box).
- 📱 **Flexible Layouts**: Choose between `card` (standard panel), `row` (compact list item), and `grid` (side-by-side chips).
- 💡 **Acknowledge Pickups**: Click on due cards (today/tomorrow) to acknowledge that the bin has been placed or collected, hiding the card until the next collection date.
- ⚡ **Visual Editor**: Full support for the Lovelace visual dashboard card editor.
- 🎨 **Auto-Mappings**: Default smart mapping of typical German & English waste categories (Restmüll, Bio, Papier, Recycling, etc.) to matching icons and colors. Fully overrideable.
- 🌐 **Localization**: Native support for English (en) and German (de) out of the box.

---

## Installation

### HACS (Home Assistant Community Store) - Recommended
1. Open HACS in Home Assistant.
2. Click the three dots in the top-right corner and select **Custom repositories**.
3. Paste the URL of this repository into the **Repository** field.
4. Select **Lovelace** (or **Plugin**) as the category and click **Add**.
5. Find **Waste Collection Schedule Card** in HACS, click **Download**, and restart/refresh your Home Assistant frontend.

### Manual Installation
1. Download the file `waste-collection-schedule-card.js` from the latest release or from the `dist` folder.
2. Copy it into your Home Assistant directory: `<config>/www/community/waste-collection-schedule-card/`.
3. Add the resource in **Settings -> Dashboards -> Resources**:
   - **URL**: `/local/community/waste-collection-schedule-card/waste-collection-schedule-card.js`
   - **Type**: `JavaScript Module`

---

## Configuration

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | String | - | *Conditional*. Entity ID of the waste sensor (e.g. `sensor.waste_collection_schedule`). |
| `entities` | List | - | *Conditional*. A list of entity IDs if you use separate sensors for each waste type. |
| `title` | String | `Müllabfuhr` | Title displayed at the top of the card. |
| `layout` | String | `card` | Layout style: `card`, `row`, or `grid`. |
| `hide_before` | Number | `-1` | Hide the item until `X` days before the collection date. Default is `-1` (always show). |
| `hide_on_click` | Boolean | `true` | Allows clicking the card when due today/tomorrow to temporarily dismiss/acknowledge it. |
| `hide_on_today` | Boolean | `false` | Hide the collection item completely when the due date is today (e.g. if collected early in morning). |
| `due_color` | String | `#f44336` | Icon and text highlight color on the day of collection. |
| `due_1_color` | String | `#ff9800` | Icon and text highlight color on the day before collection. |
| `icon_color` | String | `var(--primary-text-color)` | Standard icon color for upcoming events. |
| `icon_size` | String | `30px` | Size of the waste icon. |
| `custom_colors` | Map | - | Map keywords in waste names to custom colors. |
| `custom_icons` | Map | - | Map keywords in waste names to custom MDI icons. |
| `hide_title` | Boolean | `false` | Hide the card header title. |
| `hide_date` | Boolean | `false` | Hide the absolute date text. |
| `hide_days` | Boolean | `false` | Hide the relative day countdown badges. |
| `hide_icon` | Boolean | `false` | Hide the waste type icons. |

---

## Examples

### 1. Basic configuration (Visual editor or YAML)
Displays the next upcoming collection using a generic sensor.

```yaml
type: custom:waste-collection-schedule-card
entity: sensor.next_collection
title: Abfallkalender
```

### 2. Multi-sensor Grid Layout with Custom Mappings
Using individual sensors for each waste type, rendering them side-by-side as modern grid chips with custom overrides.

```yaml
type: custom:waste-collection-schedule-card
title: Müllabfuhr Termine
layout: grid
entities:
  - sensor.bio_waste
  - sensor.paper_waste
  - sensor.residual_waste
  - sensor.yellow_bag
custom_colors:
  Bio: "#4caf50"
  Papier: "#2196f3"
  Restmüll: "#5d5d5d"
  Sack: "#ffeb3b"
custom_icons:
  Bio: "mdi:leaf"
  Papier: "mdi:file-document"
  Restmüll: "mdi:trash-can"
  Sack: "mdi:recycle"
```

### 3. Compact Row Layout
Perfect for sidebar dashboards or nested configurations.

```yaml
type: custom:waste-collection-schedule-card
layout: row
hide_before: 5
entity: sensor.next_collection
hide_title: true
```

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
