# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of HTML mockups for "Picket", a real estate investment analytics platform. The project contains static dashboard prototypes demonstrating various views for property investment strategy analysis, market intelligence, and portfolio management.

## Project Structure

- `picket-dashboard.html` - Main dashboard with multiple tabs:
  - Overview tab (placeholder)
  - Market tab - Real estate investment analytics and inventory management
  - Pipeline tab - Property acquisition pipeline tracking
  - Portfolio tab (placeholder)

## Key Features Demonstrated

The dashboard showcases:
- **Market Tab**: Investment opportunity analysis with strategy filtering, market metrics, and trends
- **Pipeline Tab**: Property acquisition tracking from initial analysis through closing
- Real estate investment analytics with cap rate calculations and market context
- Interactive Chart.js visualizations with metric-based chart switching
- Comprehensive tooltip system for explaining complex real estate concepts
- Responsive tab-based navigation with dynamic content loading

## Technology Stack

- Static HTML files with inline CSS and JavaScript
- Chart.js library for data visualization
- Modern CSS Grid and Flexbox layouts
- Responsive design using system fonts

## Development Notes

- Self-contained HTML document with inline CSS and JavaScript (no external dependencies except Chart.js CDN)
- Uses placeholder real estate data to simulate investment analysis workflows
- Color scheme: Primary indigo (#4f46e5, #7c3aed) with semantic status colors
- Typography: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- No build process required - open directly in browser
- Interactive features: tab switching, metric card selection, pipeline filtering, chart updates

## Architecture & Key Components

### JavaScript Functionality
- **Tab Management**: `nav-tab` event listeners handle content switching and chart initialization
- **Pipeline Filtering**: Click handlers on `.pipeline-card` elements filter table rows by category
- **Chart System**: Dynamic chart updates based on selected metrics using Chart.js
- **Tooltip System**: Centralized tooltip dictionary with active/inactive flags for progressive disclosure
- **Metric Cards**: Interactive selection updates both visual state and chart data

### Data Structure
- **Tooltip Dictionary**: `tooltips` object contains all explanatory text with activation flags
- **Trend Data**: `trendData` object defines chart datasets for different financial metrics
- **Pipeline States**: Tracks property progression through underwriting → offers → transactions

### CSS Architecture
- Component-based styling with logical groupings (header, filters, nav-tabs, main-content)
- Consistent color system using CSS custom properties equivalent
- Responsive grid layouts for metrics and insights
- Hover states and transitions for interactive elements