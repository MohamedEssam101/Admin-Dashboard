# Dashboard App

A modern, responsive dashboard application built with Angular.

**[🔗 Live Preview](https://admin-dashboard-orcin-pi-15.vercel.app/)** | **[💻 GitHub Repository](https://github.com/MohamedEssam101/Admin-Dashboard)**

## Features

- **Responsive Design**
  - Fully responsive layout optimized for all screen sizes
  - Adaptive components that transform based on viewport
  - Consistent experience across desktop, tablet, and mobile devices

- **Interactive Components**
  - Dynamic data visualization with real-time updates
  - Sidebar navigation with collapsible sections
  - Header with user information and notifications

- **Performance Optimizations**
  - Optimized asset loading
  - Lazy-loaded modules

- **Data Visualization**
  - Interactive charts using ng-apexcharts
  - Real-time analytics representation
  - Custom visualization components

## Technology Stack

- **Framework**: Angular (v16 or higher)
- **Language**: TypeScript
- **Styling**:
  - Angular Material
  - Tailwind CSS
- **Chart Library**: ng-apexcharts
- **State Management**: RxJS with Angular services
- **Package Manager**: npm

## Project Structure

```
├─ src/                  # Source code
│  ├─ app/               # Application code
│  │  ├─ components/     # Reusable UI components
│  │  ├─ containers/     # Page section containers
│  │  ├─ interfaces/     # TypeScript interfaces
│  │  ├─ services/       # Data services
│  ├─ index.html         # Main HTML entry point
│  ├─ main.ts            # Main entry point
│  └─ styles.css         # Global styles
```

## Implementation Notes

### Component Architecture

- Modular design with clear separation of concerns
- Services for data management and business logic
- Interfaces for strong typing across the application

### Data Visualization Strategy

- Implemented using ng-apexcharts for robust and interactive charts
- Real-time data updates via RxJS observables
- Customized themes and responsive design for all chart components

### UI Framework

- Angular Material for consistent UI elements and icons
- Tailwind CSS for utility-first styling approach
- Custom component library for application-specific UI requirements

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v9 or higher)
- Angular CLI (v16 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/dashboard-app.git
cd dashboard-app
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
ng serve
```

4. Access the application at `http://localhost:4200`

## Build for Production

```bash
ng build --prod
```

## Testing

```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e
```

## Key Services

- **Visits Report Service**: Provides visitor analytics data
- **Sales Report Service**: Manages sales data for visualizations
- **Analytics Service**: Handles core analytics functionality
- **Routes Service**: Manages application routing and navigation

## Design Decisions

- Selected ng-apexcharts for its extensive feature set and modern aesthetics
- Implemented RxJS BehaviorSubjects for reactive state management
- Used Angular's built-in dependency injection for service management
- Applied Tailwind CSS for rapid styling and consistent UI design

## Future Improvements

1. **Advanced Analytics**: Implement more sophisticated data analysis tools
2. **Dashboard Customization**: Allow users to create personalized dashboard layouts
3. **Expanded Visualization Options**: Add more chart types and visualization methods
4. **Performance Optimization**: Further optimize bundle size and initial load time
5. **Accessibility Enhancements**: Improve screen reader support and keyboard navigation


