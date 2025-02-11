# Customer Management System

A full-stack web application for managing customer information and their purchase history. Built with React (Vite), Node.js, Express, and MySQL.

## 🚀 Features

- View, add, edit, and delete customer information
- Track customer purchase history
- Responsive design for desktop and mobile devices
- RESTful API architecture
- Real-time data updates

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/SurabSebait/InewTech-Project.git
cd filename
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following configuration:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= YOUR_PASSWORD
DB_NAME=customerdb
```

4. Set up the database:
```sql
CREATE DATABASE customerdb;

USE customerdb;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(15) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_person VARCHAR(255),
    whatsapp VARCHAR(15),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pin_code VARCHAR(10),
    gst_no VARCHAR(20),
    pan_no VARCHAR(10)
); 

CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(255),
    amount DECIMAL(10,2),
    date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
); 
```

5. Set up the frontend:
```bash
cd frontend
npm install
```

## 🚦 Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The server will start on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The application will be available on http://localhost:5173

## 📝 API Endpoints

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Purchases

- `GET /api/purchases/:id` - Get purchases by customer ID
- `DELETE /api/purchases/:id` - Delete purchase

## 💻 Technology Stack

- **Frontend:**
  - React (Vite)
  - React Router
  - Axios for API calls
  - TailwindCSS (optional)

- **Backend:**
  - Node.js
  - Express.js
  - MySQL2 for database operations

- **Database:**
  - MySQL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


