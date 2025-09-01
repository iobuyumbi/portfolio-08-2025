# Portfolio Website 2025

A modern, responsive portfolio website for **Innocent Obuyumbi Nyongesa**, an IT Specialist and Network Engineer with 6+ years of experience. Built with clean, modular architecture following industry best practices.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistence across sessions
- **Modern UI**: Inspired by Megapari's color scheme with smooth animations
- **Contact Form**: Functional contact form with email notifications
- **Project Showcase**: Dynamic project filtering and sorting
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Security**: Helmet.js protection and rate limiting
- **Performance**: Optimized assets and efficient loading

## 🏗️ Project Structure

```
portfolio-2025/
├── frontend/                    # Frontend application
│   ├── assets/                  # Static assets
│   │   ├── images/              # Images and photos
│   │   └── icons/               # Icons and favicons
│   ├── css/                     # Modular CSS system
│   │   ├── variables.css        # CSS custom properties
│   │   ├── base.css             # Reset and base styles
│   │   ├── layout.css           # Layout utilities
│   │   ├── components.css       # Component styles
│   │   ├── themes.css           # Theme system
│   │   └── styles.css           # Main CSS file
│   ├── js/                      # Modular JavaScript
│   │   ├── main.js              # Main application logic
│   │   ├── theme.js             # Theme toggle functionality
│   │   ├── navigation.js        # Navigation and mobile menu
│   │   ├── form.js              # Form handling and validation
│   │   └── projects.js          # Project filtering and sorting
│   ├── pages/                   # HTML pages
│   │   ├── home.html            # Homepage
│   │   ├── about.html           # About page
│   │   ├── projects.html        # Projects portfolio
│   │   ├── contact.html         # Contact page
│   │   └── 404.html             # Error page
│   └── partials/                # Reusable components
│       ├── header.html          # Header with navigation
│       └── footer.html          # Footer component
├── backend/                     # Node.js backend
│   ├── controllers/             # Request handlers
│   │   ├── contactController.js # Contact form logic
│   │   └── projectController.js # Projects API
│   ├── routes/                  # API routes
│   │   ├── contact.js           # Contact endpoints
│   │   └── projects.js          # Project endpoints

│   ├── views/                   # Templates (if needed)
│   └── server.js                # Express server setup
├── index.html                   # Main entry point
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## 🛠️ Technologies Used

### Frontend

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern CSS with custom properties and Grid/Flexbox
- **JavaScript ES6+**: Modular, clean JavaScript with async/await
- **Font Awesome**: Icons and visual elements

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **Nodemailer**: Email functionality for contact form
- **Helmet.js**: Security middleware
- **Express Rate Limit**: API rate limiting

### Development

- **Nodemon**: Development server with hot reload
- **PNPM**: Fast, efficient package manager

## 📦 Installation & Setup

### Prerequisites

- Node.js 16+ installed
- PNPM package manager (recommended) or npm

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-2025
```

### 2. Install Dependencies

```bash
# Using PNPM (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your email configuration
```

Example `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=iobuyumbi@gmail.com
EMAIL_PASSWORD=your-app-password
FROM_NAME=Innocent Obuyumbi Portfolio
FROM_EMAIL=iobuyumbi@gmail.com

# Security
CORS_ORIGIN=http://localhost:3000
```

### 4. Start Development Server

```bash
# Start with hot reload
pnpm dev

# Or using npm
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:3000`

## 🚀 Production Deployment

### Build for Production

```bash
pnpm run build
```

### Start Production Server

```bash
pnpm start
```

### Environment Variables for Production

Make sure to set the following environment variables:

- `NODE_ENV=production`
- `PORT=80` (or your preferred port)
- Email configuration variables
- `CORS_ORIGIN=https://yourdomain.com`

## 📧 Email Configuration

The contact form uses Nodemailer to send emails. For Gmail:

1. Enable 2-factor authentication on your Google account
2. Generate an App Password for the application
3. Use the App Password in the `EMAIL_PASS` environment variable

## 🎨 Customization

### Colors

Edit `frontend/css/variables.css` to customize the color scheme:

```css
:root {
  --primary: #d62723; /* Megapari Red */
  --background: #111111; /* Dark background */
  --surface: #1a1a1a; /* Card backgrounds */
  --text: #ffffff; /* Text color */
  --muted: #a1a1a1; /* Muted text */
  --border: #303030; /* Borders */
}
```

### Content

- Update project data in `backend/controllers/projectController.js`
- Modify personal information in the HTML pages

## 📱 API Endpoints

### Contact Form

- **POST** `/api/contact` - Submit contact form
- Rate limited to 5 submissions per hour per IP

### Projects

- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/:id` - Get specific project
- Query parameters: `category`, `featured`

### Health Check

- **GET** `/api/health` - Server health status

## 🔒 Security Features

- **Helmet.js**: Security headers and CSP
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Server-side validation and sanitization
- **CORS**: Configured for specific origins
- **Error Handling**: Comprehensive error management

## 🎯 Performance

- **Modular CSS**: Separate files for maintainability
- **Efficient Loading**: Async JavaScript modules
- **Optimized Images**: Responsive images with proper sizing
- **Minimal Dependencies**: Lightweight and fast

## 📝 Development Notes

### Adding New Pages

1. Create HTML file in `frontend/pages/`
2. Add route in `backend/server.js`
3. Update navigation in `frontend/partials/header.html`

### Adding New Projects

Update the projects array in `backend/controllers/projectController.js`

### Styling Guidelines

- Use CSS custom properties for consistency
- Follow the existing naming conventions
- Add responsive breakpoints for mobile-first design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Contact

**Innocent Obuyumbi Nyongesa**

- Email: iobuyumbi@gmail.com
- Phone: +254717168108
- Location: Kisumu, Kenya
- LinkedIn: [linkedin.com/in/iobuyumbi](https://linkedin.com/in/iobuyumbi)
- GitHub: [github.com/iobuyumbi](https://github.com/iobuyumbi)

---

Built with ❤️ using modern web technologies
