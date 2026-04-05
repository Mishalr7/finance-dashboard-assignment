# Finance Dashboard – Technical Documentation (Internship Assignment)
## Live Demo
https://finance-dashboard-assignment-six.vercel.app
## Overview

This project is a responsive **Finance Dashboard Web Application** built using React. It demonstrates core frontend engineering concepts including state management, component architecture, data visualization, and role-based access control.

The goal of this assignment is to showcase practical problem-solving ability, clean code structure, and UI/UX thinking suitable for real-world applications.

---

## Key Features

### 1. Dashboard Overview

* Displays Total Balance, Income, and Expenses
* Dynamic calculations based on transaction data

### 2. Data Visualization

* Time-based **Income vs Expense Trend (Line + Area Chart)**
* **Category-wise Spending (Bar Chart)**
* Built using Recharts for scalable and interactive visualization

### 3. Transactions Management

* View all transactions in tabular format
* Search functionality by category

#### Admin Capabilities

* Add new transactions (dynamic state update)
* Delete existing transactions

#### Viewer Capabilities

* Read-only access (no modification allowed)

### 4. Insights Module

Derived analytics from raw transaction data:

* Highest spending category
* Monthly income vs expense comparison
* Net savings calculation
* Most active financial month
* Expense-to-income ratio

### 5. Dark Mode

* Toggle between light and dark themes
* UI consistency maintained across all components

### 6. Local Storage Persistence

* Transactions stored in browser localStorage
* Ensures data persistence across page reloads

---

## Technical Architecture

### Component Structure

```
src/
 ├── components/
 │    ├── Sidebar.jsx
 │    ├── Header.jsx
 │    ├── DashboardCards.jsx
 │    ├── ChartsSection.jsx
 │    ├── TransactionsTable.jsx
 │    ├── Insights.jsx
 │
 ├── data/
 │    └── data.js
 │
 ├── App.jsx
 ├── main.jsx
```

### Design Approach

* **Modular Components** → Each feature isolated for scalability
* **Reusable UI Blocks** → Cards, tables, charts
* **Separation of Concerns** → UI vs logic handled cleanly

---

## State Management

### Global State (App Level)

Managed using React hooks:

* `transactions` → core data source
* `role` → controls access (admin/viewer)
* `dark` → theme state
* `active` → navigation state

### Data Flow

```
App → passes props → Components → user interaction → state update → re-render
```

---

## Data Processing Logic

### 1. Aggregation

* Group transactions by date for time-series charts
* Group by category for spending analysis

### 2. Derived Metrics

* Total Income = sum of all income transactions
* Total Expense = sum of all expense transactions
* Net Balance = Income - Expense

### 3. Monthly Analysis

* Extract `YYYY-MM` from date
* Aggregate income and expense per month

### 4. Insights Computation

* Max category spending
* Most active month (highest transaction volume)
* Expense ratio = (Expense / Income) * 100

---

## Role-Based Access Control (RBAC)

| Feature            | Viewer | Admin |
| ------------------ | ------ | ----- |
| View Data          | Yes    | Yes   |
| Add Transaction    | No     | Yes   |
| Delete Transaction | No     | Yes   |

Implemented via conditional rendering in components.

---

## UI/UX Considerations

* Responsive layout using Flexbox + Tailwind CSS
* Mobile-first sidebar behavior
* Scrollable content area for dashboard
* Consistent spacing and typography
* Visual hierarchy using cards and sections

---

## Styling

* Tailwind CSS for rapid UI development
* Conditional class rendering for dark mode
* Gradient-based dark theme for modern UI appearance

---

## Persistence Layer

* Browser localStorage used as lightweight storage
* Data saved on every state update
* Loaded on initial render

```js
localStorage.setItem("transactions", JSON.stringify(transactions));
```

---

## Performance Considerations

* Derived data computed efficiently using array iteration
* Avoided unnecessary re-renders by structured state updates
* Lightweight charts for smooth rendering

---

## Limitations

* No backend integration (frontend-only project)
* Input validation is minimal (basic prompt-based input)
* No authentication system (role simulated locally)

---

## Possible Improvements

* Replace prompt with form modal for better UX
* Add backend (Node.js / Firebase)
* Implement authentication
* Add pagination for transactions
* Advanced analytics (prediction, trends)

---

## Conclusion

This project demonstrates:

* Strong understanding of React fundamentals
* Ability to design modular and scalable UI
* Practical implementation of data-driven features
* Clean separation of logic and presentation

It reflects readiness to work on real-world frontend systems with structured thinking and attention to detail.
