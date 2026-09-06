# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-09-06

### Added
- **Offline Cache Fallback (2 Weeks)**: Automatic local storage caching of waste collection schedules. When the target calendar integration or upstream municipal API fails (e.g. HTTP 500 Bad Gateway/Server Error) and entities become `unavailable` or empty, the card seamlessly falls back to the latest known cached schedule.
- **Dynamic Date Recalculation**: Cached occurrences automatically recalculate days remaining relative to the current day, filtering out expired dates.
- **Offline Indicator**: A subtle `Offline` badge appears in the header showing the date the cache snapshot was taken.
- **Editor Switch**: Added a toggle switch in the card editor to enable or disable the offline cache (`enable_cache: true/false`).
- **Release Documentation**: Added structured release instructions and this changelog.

---

## [1.2.0] - 2026-09-04

### Added
- **Date Format Selector**: Added option to choose between German/European `DD.MM.YYYY` and ISO `YYYY-MM-DD` in both card YAML configuration and the visual card editor.
- **Robust Date String Parsing**: Support for parsing dates embedded in friendly entity states and multi-day attribute structures.

### Fixed
- **Click-to-Dismiss Storage Key**: Resolved an issue where acknowledged/dismissed trash pickups failed to persist when clicked on due today/tomorrow.
- **Visual Editor Dropdowns**: Migrated editor `<ha-select>` controls to use the modern Home Assistant options API for full compatibility with HA 2026.x.

---

## [1.1.0] - 2026-09-03

### Added
- **Visual Multi-Entity Picker**: Dynamic entity picker row in the visual card editor to easily add, sort, or delete multiple waste collection sensors.
- **Max Items & Next Only Limits**: Configurable limit (`max_items`) and deduplication switch (`next_only`) to only show the single nearest upcoming collection per waste category.
- **Visual Color & Icon Customizer**: Interactive color pickers and icon overrides directly mapped to detected waste types.
- **Card Layout Engines**: Enhanced support for `card`, compact `row`, and side-by-side `grid` chip styles.

---

## [1.0.0] - 2026-09-01

### Added
- **Initial Release**: Modern Lovelace card for Home Assistant Waste Collection Schedule with LitElement, shadow DOM, glassmorphic styling, and German/English translations.
