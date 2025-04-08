# Dashboard App
A modern, responsive dashboard application built with Angular.

## Setup Instructions
### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
### Installation
1. Clone the repository
   ```
   git clone <repository-url>
   cd dashboard-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   ng serve
   ```

4. Access the application at `http://localhost:4200/`

## Project Architecture

### Core Structure
- **Components** - Reusable UI elements
- **Containers** - Page layouts that use components
- **Services** - Data fetching and business logic
- **interfaces** - TypeScript interfaces for data types

### Key Components
- **Sidebar** - Navigation menu with route buttons
- **Header** - Top app bar with user information and notifications
- **Analytics Components** - Various data visualization elements
- **Route Button** - Navigation item used in sidebar

### Services
- **Visits Report Service** - Provides sales data for charts
- **Sales Report Service** - Provides sales data for charts
- **Analytics Service** - Provides analytics data for dashboard
- **Routes Service** - Provides analytics data for dashboard

## Design Choices and Libraries

### UI Framework
- **Angular Material** - Used for icons and basic UI components
- **Tailwind CSS** - Used for styling and responsive design

### Chart Library
- **ng-apexcharts** - Used for all data visualizations
  - Selected for its extensive feature set, modern aesthetics, and excellent customization options
  - Provides responsive charts with animations and interactive tooltips
  - Better suited for complex dashboard visualizations compared to alternatives like ng2-charts or ngx-charts

### State Management
- Using Angular's built-in services with RxJS for state management
- BehaviorSubject for maintaining component state

### Routing
- Angular Router with lazy loading for better performance

## Trade-offs and Considerations

- **Performance vs. Features** - Used lazy loading to balance feature-rich components with fast initial load times
- **Chart Library** - Chose ng-apexcharts for its powerful features despite slightly larger bundle size compared to simpler alternatives
- **Styling Approach** - Selected Tailwind CSS for rapid development despite learning curve and larger initial CSS payload
- **Accessibility** - Implemented keyboard navigation and screen reader support throughout the application
- **Responsive Design** - Application is fully responsive across mobile, tablet and desktop devices

## Future Improvements

- Further componentization of UI elements for better reusability
- Implement more comprehensive unit tests
- Add end-to-end tests .
