
# E-Commerce App

A modern e-commerce application built with **React** and **Redux Toolkit**, designed to provide a seamless shopping experience. The app includes features like product browsing, cart management, wishlist, user authentication, and more. It uses **Supabase** as the backend for data storage and authentication, and **Redux Toolkit** with `createAsyncThunk` for state management and async operations.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features
- Browse products and view detailed product information.
- Add products to cart and manage cart items.
- Add/remove products to/from wishlist.
- User authentication (Sign Up, Sign In) using Supabase.
- Categories to filter products.
- Toast notifications for user feedback.
- Loading states for async operations.
- Responsive design for mobile and desktop.

## Tech Stack
- **Frontend**: React, Redux Toolkit (`createAsyncThunk` for async operations)
- **Backend**: Supabase (for authentication and database)
- **Styling**: Tailwind CSS (with `index.css` )
- **State Management**: Redux Toolkit
- **Routing**: React Router (assumed, based on typical e-commerce apps)
- **API**: Fetch API (via Supabase client)

## Project Structure
ecommerce-app/
├── public/                 # Static files (index.html, favicon, etc.)
├── src/                    # Source code
│   ├── api/                # API logic
│   │   └── supabaseClient.js  # Supabase client configuration
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Reusable React components
│   │   ├── AddToCartButton.jsx
│   │   ├── CartIconButton.jsx
│   │   ├── Container.jsx
│   │   ├── Icon.jsx
│   │   ├── Pagination.jsx
│   │   ├── QuantitySelector.jsx
│   │   └── WishlistButton.jsx
│   ├── layout/             # Layout components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── ui/                 # UI-specific components
│   │   ├── NewsSignup.jsx
│   │   └── ScrollToTop.jsx
│   ├── features/           # Redux Toolkit slices
│   │   ├── auth/           # Authentication slice
│   │   ├── cart/           # Cart slice
│   │   ├── categories/     # Categories slice
│   │   ├── home/           # Home page slice
│   │   ├── loading/        # Loading state slice
│   │   ├── productDetails/ # Product details slice
│   │   ├── products/       # Products slice
│   │   ├── toast/          # Toast notifications slice
│   │   └── wishlist/       # Wishlist slice
│   ├── store/              # Redux store configuration
│   │   └── store.js
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── App.css             # App-specific styles
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
git clone https://github.com/fatmaindex/eccomerce_react_app.git
cd ecommerce-app

2. **Install dependencies**:
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
npm install

3. **Set up Supabase**:
- Create a Supabase project at [supabase.com](https://supabase.com).
- Copy your Supabase URL and API Key.
- Create a `.env` file in the root directory and add the following:
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_KEY=your-supabase-key

4. **Run the app**:
npm start

The app will run on `http://localhost:3000`.

## Usage
- **Home Page**: Browse featured products and categories.
- **Product Details**: Click on a product to view its details and add it to cart or wishlist.
- **Cart**: View and manage items in your cart.
- **Wishlist**: Add/remove products to/from your wishlist.
- **Authentication**: Sign up or sign in to access user-specific features.

## App Routes
The application includes the following main routes:

Path	Component	Description
/	Home	Main landing page with featured products
/cart	Cart	Shopping cart page
/signUp	SignUp	User registration page
/signIn	SignIn	User login page
/wishlist	Wishlist	Wishlist page (requires authentication)
/search	SearchResults	Displays filtered search results
/product/:productID	ProductDetails	Shows details for a specific product

🔐 Note: Access to /wishlist is restricted to authenticated users.


## Available Scripts
In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production to the `build` folder.
- `npm test`: (Not implemented yet) Runs the test suite.
- `npm eject`: Ejects the app from Create React App (use with caution).

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding style and includes appropriate tests (once tests are added).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
