# 📋 TaskFlow - Professional Task Management System

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Task%20Management-blueviolet?style=for-the-badge)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A modern, feature-rich task management system built with Laravel and React, designed to help individuals and teams organize their work efficiently.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Screenshots](#-screenshots) • [License](#-license)

</div>

---

## 📖 About TaskFlow

TaskFlow is a comprehensive task management application that combines powerful features with a beautiful, intuitive interface. Built with modern web technologies, it offers everything you need to organize tasks, track progress, and achieve your goals.

### Why TaskFlow?

- 🎨 **Beautiful UI** - Modern, glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Efficient** - Optimized performance with server-side rendering
- 🔒 **Secure** - Industry-standard authentication and authorization
- 🌓 **Dark Mode** - Full dark mode support throughout the application
- 📊 **Data Insights** - Comprehensive analytics and productivity tracking

---

## ✨ Features

### 📋 Task Management
- **Create & Organize Tasks** - Full CRUD operations with detailed task information
- **Priority Levels** - High, Medium, Low priority classification
- **Status Tracking** - Pending, In Progress, Completed statuses
- **Due Dates & Times** - Set deadlines with time specifications
- **Subtasks** - Break down complex tasks into manageable steps
- **Task Dependencies** - Link related tasks together
- **Recurring Tasks** - Daily, weekly, monthly task repetition
- **Task Notes** - Add detailed notes and context
- **Attachments** - Upload and manage task files

### 📅 Views & Organization
- **List View** - Traditional task list with filtering and search
- **Calendar View** - Visual monthly calendar with task display
- **Kanban Board** - Drag-and-drop workflow management with search
- **Goal Tracking** - Set and monitor annual goals with progress indicators

### 🏷️ Classification System
- **Categories** - Organize tasks with color-coded categories
- **Tags** - Flexible labeling system with multiple tags per task
- **Templates** - Create reusable task templates for common workflows

### 📊 Analytics & Insights
- **Dashboard** - Overview with key statistics and upcoming tasks
- **Analytics Page** - Detailed charts and productivity metrics
- **Completion Trends** - Track progress over time
- **Priority Distribution** - Visual breakdown of task priorities
- **Category Analytics** - Performance by category
- **Goal Progress** - Monitor achievement towards goals

### 👤 User Features
- **User Authentication** - Secure login and registration
- **Email Verification** - Verify user accounts via email
- **Password Reset** - Secure password recovery
- **Two-Factor Authentication** - Optional 2FA for enhanced security
- **Profile Management** - Update user information and settings
- **Appearance Settings** - Customize theme preferences

### 🎯 Additional Features
- **Search & Filter** - Powerful search across all tasks
- **Real-time Updates** - Instant UI updates without page refresh
- **Help & Guide** - Comprehensive in-app documentation
- **Professional Empty States** - Beautiful placeholders when no data exists
- **Responsive Design** - Optimized for all screen sizes

---

## 🛠 Tech Stack

### Backend
- **[Laravel 11](https://laravel.com/)** - PHP Framework
- **[Laravel Fortify](https://laravel.com/docs/fortify)** - Authentication
- **[Inertia.js](https://inertiajs.com/)** - Modern monolith architecture
- **MySQL** - Database
- **PHP 8.2+** - Programming Language

### Frontend
- **[React 18](https://react.dev/)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI Components
- **[Lucide React](https://lucide.dev/)** - Icons
- **[Recharts](https://recharts.org/)** - Charts & Analytics
- **[Vite](https://vitejs.dev/)** - Build Tool

### Additional Tools
- **[React DnD](https://react-dnd.github.io/react-dnd/)** - Drag and Drop
- **ESLint** - Code Linting
- **Prettier** - Code Formatting

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **PHP 8.2 or higher**
- **Composer** - [Download Composer](https://getcomposer.org/)
- **Node.js 18+ & npm** - [Download Node.js](https://nodejs.org/)
- **MySQL 8.0+** or **MariaDB 10.3+**
- **Git** - [Download Git](https://git-scm.com/)

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

#### 2. Install PHP Dependencies

```bash
composer install
```

#### 3. Install Node Dependencies

```bash
npm install
```

#### 4. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 5. Configure Database

Edit your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskflow
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### 6. Create Database

```bash
# Using MySQL command line
mysql -u root -p
CREATE DATABASE taskflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### 7. Run Migrations

```bash
php artisan migrate
```

#### 8. (Optional) Seed Demo Data

```bash
php artisan db:seed
```

#### 9. Link Storage

```bash
php artisan storage:link
```

#### 10. Build Frontend Assets

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
```

#### 11. Start Development Server

In a new terminal:
```bash
php artisan serve
```

The application will be available at: `http://127.0.0.1:8000`

---

## 🚀 Quick Start

### Create Your First User

1. Visit `http://127.0.0.1:8000`
2. Click "Get Started" or "Register"
3. Fill in your details and create an account
4. Verify your email (check your mail server configuration)
5. Log in and start managing your tasks!

### First Steps After Login

1. **Create a Category** - Go to Categories and create your first category
2. **Add Some Tags** - Visit Tags to create labels for your tasks
3. **Set a Goal** - Navigate to Goals and set an annual goal
4. **Create Your First Task** - Go to Tasks and create a new task
5. **Explore Views** - Try the Calendar and Kanban board views

---

## 🎨 Screenshots

### Landing Page
Beautiful, modern landing page with glassmorphism design and professional imagery.

### Dashboard
Comprehensive overview with statistics, upcoming tasks, and quick actions.

### Task Management
Full-featured task creation and management with categories, tags, and priorities.

### Kanban Board
Drag-and-drop workflow with real-time updates and search functionality.

### Analytics
Detailed charts showing productivity trends, priority distribution, and progress.

### Calendar View
Monthly calendar with color-coded tasks and easy navigation.

### Goals Tracking
Visual progress circles showing achievement towards annual goals.

---

## 📝 Usage Examples

### Creating a Task

```typescript
// Tasks are created through the UI with:
- Title (required)
- Description (optional)
- Priority (High/Medium/Low)
- Status (Pending/In Progress/Completed)
- Due Date & Time
- Category & Tags
- Goal Association
- Subtasks
- Recurring Settings
```

### Using the Kanban Board

1. Navigate to **Tasks → Kanban**
2. Use the search bar to filter tasks
3. Drag tasks between columns (Pending → In Progress → Completed)
4. Click on a task to view details or edit

### Tracking Goals

1. Go to **Goals**
2. Create a new goal with:
   - Title and description
   - Target number
   - Unit of measurement
   - Target date
3. Link tasks to the goal
4. Watch progress update automatically

---

## 🔒 Security

TaskFlow implements industry-standard security practices:

- ✅ **CSRF Protection** - All forms protected against cross-site request forgery
- ✅ **SQL Injection Prevention** - Using Eloquent ORM with parameterized queries
- ✅ **XSS Protection** - React auto-escaping and Content Security Policy
- ✅ **Password Hashing** - Bcrypt/Argon2 password hashing
- ✅ **Email Verification** - Required before account access
- ✅ **Authorization** - Role-based access control
- ✅ **Session Security** - Secure session management
- ✅ **2FA Support** - Optional two-factor authentication

### Before Production

Review `SECURITY_CHECKLIST.md` and `PRODUCTION_DEPLOYMENT.md` for production deployment guidelines.

---

## 📱 Mobile Support

TaskFlow is fully responsive and optimized for:

- ✅ **iOS** (Safari) - iPhone and iPad
- ✅ **Android** (Chrome) - Phones and tablets
- ✅ **All screen sizes** - From 320px to 2560px+
- ✅ **Touch gestures** - Drag and drop, swipe, pinch
- ✅ **Mobile keyboards** - Optimized input types

Mobile score: **9.6/10** (See `MOBILE_OPTIMIZATION.md` for details)

---

## 🔧 Configuration

### Email Configuration

Edit `.env` to configure your mail server:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@taskflow.com
MAIL_FROM_NAME="TaskFlow"
```

### Application Settings

```env
APP_NAME="TaskFlow"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
APP_TIMEZONE=UTC
```

---

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter TaskTest
```

---

## 🚀 Deployment

### Production Checklist

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Generate a new application key: `php artisan key:generate`
3. Configure production database
4. Set up SSL certificate (HTTPS)
5. Configure mail server
6. Optimize application:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm run build
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
7. Set proper file permissions
8. Configure web server (Apache/Nginx)
9. Set up automated backups
10. Configure monitoring and logging

Detailed deployment guide available in `PRODUCTION_DEPLOYMENT.md`

---

## 📚 Documentation

- `SECURITY_CHECKLIST.md` - Security audit and recommendations
- `MOBILE_OPTIMIZATION.md` - Mobile responsiveness details
- `PRODUCTION_DEPLOYMENT.md` - Deployment guide and best practices

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow PSR-12 for PHP code
- Use ESLint and Prettier for TypeScript/React code
- Write descriptive commit messages
- Add tests for new features

---

## 🐛 Bug Reports

If you discover a bug, please create an issue on GitHub with:

- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (OS, PHP version, browser)
- Screenshots if applicable

---

## 💡 Feature Requests

Have an idea for a new feature? Open an issue with:

- Feature description
- Use case / why it's needed
- Proposed implementation (if you have ideas)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The amazing PHP framework
- [React](https://react.dev/) - The library for web and native interfaces
- [Inertia.js](https://inertiajs.com/) - The modern monolith
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Beautiful free images

---

## 📞 Support

Need help? Here's how to get support:

- 📖 Check the **Help & Guide** page in the application
- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/taskflow/issues)
- 💬 Join our community discussions
- 📧 Email support: support@taskflow.com

---

## 🗺️ Roadmap

### Planned Features

- [ ] Team collaboration and task sharing
- [ ] Mobile native apps (iOS & Android)
- [ ] Integration with calendar apps (Google Calendar, Outlook)
- [ ] File attachments with cloud storage
- [ ] Task comments and discussions
- [ ] Email notifications for due tasks
- [ ] Time tracking functionality
- [ ] Export data (PDF, CSV, Excel)
- [ ] API for third-party integrations
- [ ] Webhooks for automation
- [ ] Advanced reporting
- [ ] Custom fields for tasks

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/taskflow?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/taskflow?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/taskflow)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/taskflow)

---

<div align="center">

**Built with ❤️ using Laravel and React**

⭐ **Star this repo if you find it helpful!** ⭐

[⬆ Back to Top](#-taskflow---professional-task-management-system)

</div>
