import { css } from 'lit';

export const styles = css`
  :host {
    --wcs-accent-color: var(--primary-color, #03a9f4);
    --wcs-text-primary: var(--primary-text-color, #e1e1e1);
    --wcs-text-secondary: var(--secondary-text-color, #9e9e9e);
    --wcs-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --wcs-card-border-radius: var(--ha-card-border-radius, 16px);
    --wcs-card-border-width: var(--ha-card-border-width, 1px);
    --wcs-card-border-color: var(--ha-card-border-color, rgba(255, 255, 255, 0.1));
    display: block;
  }

  .wcs-card {
    background: var(--wcs-card-bg);
    border-radius: var(--wcs-card-border-radius);
    border: var(--wcs-card-border-width) solid var(--wcs-card-border-color);
    padding: 16px;
    box-shadow: var(--ha-card-box-shadow, none);
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .wcs-card.layout-grid {
    padding: 12px;
  }

  .wcs-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .wcs-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wcs-container.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 10px;
  }

  /* Waste Item Styling */
  .wcs-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }

  .wcs-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }

  /* Grid specific item styles */
  .wcs-item.layout-grid {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 16px 8px;
    min-height: 120px;
    gap: 8px;
  }

  .wcs-item.layout-row {
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
  }

  .wcs-item.layout-row:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: none;
  }

  /* Icon wrapper */
  .wcs-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wcs-icon-wrapper.layout-grid {
    margin-bottom: 4px;
  }

  /* Content wrapper */
  .wcs-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  .wcs-content.layout-grid {
    margin-left: 0;
    align-items: center;
    width: 100%;
  }

  .wcs-content.layout-row {
    margin-left: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /* Typographies */
  .wcs-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    line-height: 1.2;
  }

  .wcs-name.layout-grid {
    font-size: 0.9rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .wcs-details {
    font-size: 0.85rem;
    color: var(--wcs-text-secondary);
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .wcs-details.layout-grid {
    justify-content: center;
    text-align: center;
    margin-top: 2px;
  }

  .wcs-details.layout-row {
    margin-top: 0;
  }

  /* Days badge */
  .wcs-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* State Alerts */
  .wcs-item.due-today {
    background: rgba(var(--rgb-due-color, 244, 67, 54), 0.08);
    border-color: rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    animation: wcs-pulse-today 2s infinite ease-in-out;
  }
  
  .wcs-item.due-tomorrow {
    background: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.06);
    border-color: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.25);
  }

  .wcs-badge.today {
    background: rgb(var(--rgb-due-color, 244, 67, 54));
    color: #ffffff;
  }

  .wcs-badge.tomorrow {
    background: rgb(var(--rgb-due-1-color, 255, 152, 0));
    color: #ffffff;
  }

  .wcs-badge.upcoming {
    background: rgba(255, 255, 255, 0.08);
    color: var(--wcs-text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Animations */
  @keyframes wcs-pulse-today {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
  }

  /* Responsive tweaks */
  @media (max-width: 350px) {
    .wcs-container.layout-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
