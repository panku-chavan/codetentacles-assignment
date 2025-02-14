# React Admin & Seller Dashboard

A full-stack application with token-based authentication, featuring separate dashboards for Admin and Seller roles. Built with React and integrated with a backend API.

## Features

### Admin Side
- **Token-Based Login Authentication**: Secure JWT token implementation.
- **User Management**:
  - **User Sidebar**: Navigation specific to user management.
  - **User Listing Table**: Fetches and displays users via API.
  - **Add User**: Stepper form with field validations; integrates with API.
  - **Delete User**: API-bound deletion with real-time table updates.

### Seller Side (User Side)
- **Token-Based Login Authentication**: Separate login flow for sellers.
- **Product Management**:
  - **Product Sidebar**: Navigation for product-related actions.
  - **Product Listing Table**: Displays products fetched via API.
  - **Add Product**: Form with validations; binds to API for data submission.

## API Integration
- **Backend URL**: `https://reactinterviewtask.codetentaclestechnologies.in/api/`
- All CRUD operations (GET, POST, DELETE) are bound to backend endpoints.
- Field validations implemented for forms (e.g., required fields, email format).

## Loader and toast 

- added loader.
- added toast notification.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/8hushancodetentacles/interview.git