# TurfTec - Custom Lawn Care Solutions

TurfTec is a modern, high-performance web application designed for custom lawn care planning and product management. Built with the latest technologies including **Laravel 12**, **React 19**, and **Tailwind CSS 4**, it provides a seamless user experience for customers looking to optimize their lawn health.

## 🚀 Tech Stack

- **Backend:** [Laravel 12](https://laravel.com/) (PHP 8.2+)
- **Frontend:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **State Management & Routing:** [Inertia.js 2.0](https://inertiajs.com/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (shadcn/ui style)
- **Authentication:** [Laravel Fortify](https://laravel.com/docs/fortify)
- **Testing:** [Pest PHP](https://pestphp.com/)
- **Database:** SQLite (default) / MySQL

## ✨ Key Features

- **Custom Lawn Plans:** Personalized lawn care strategies based on user input.
- **Product Catalog:** Browse and view detailed information about specialized lawn care products.
- **Shopping Cart:** Integrated cart system for easy product purchasing.
- **Education Portal:** Blog and resource section for lawn maintenance tips.
- **User Dashboard:** Secure user accounts with profile and settings management.
- **Modern UI/UX:** Responsive design with dark mode support and interactive components.

## 🛠️ Installation & Setup

Follow these steps to get the project running locally:

### 1. Prerequisites

Ensure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js & NPM
- SQLite (or your preferred database engine)

### 2. Clone the Repository

```bash
git clone https://github.com/ahsan-ul-alam/pest-controll-gardening.git
cd pest-controll-gardening
```

### 3. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 4. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Setup

```bash
# Run migrations to set up the database schema
php artisan migrate
```

### 6. Start Development Server

You can use the built-in composer script to start both the Laravel server and Vite simultaneously:

```bash
composer run dev
```

Alternatively, run them separately:

```bash
# Terminal 1: Laravel Server
php artisan serve

# Terminal 2: Vite (Frontend)
npm run dev
```

## 📜 Available Scripts

- `composer run dev`: Starts all necessary services (Server, Vite, Queue, Pail).
- `npm run build`: Compiles assets for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `php artisan test`: Executes the test suite using Pest.
- `php artisan pint`: Automatically fixes PHP code style issues.

## 📁 Project Structure

- `app/`: Laravel core logic (Models, Controllers, Providers).
- `resources/js/`: React components, pages, hooks, and layouts.
- `resources/js/pages/`: Inertia page components.
- `resources/js/components/`: Reusable UI elements.
- `routes/web.php`: Web routing definitions.
- `database/migrations/`: Database schema definitions.
- `public/`: Static assets and entry point.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
