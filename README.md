# URL Shortener - Frontend

A modern URL shortening service built with React, TypeScript, and Tailwind CSS, providing analytics and management for shortened URLs.


## Features

- ✂️ **URL Shortening**: Create shortened links instantly
- 📊 **Analytics Dashboard**: Track clicks, referrers, and user engagement
- 🌐 **Comprehensive Statistics**: View detailed data on link performance
- 🔒 **User Authentication**: Secure login with email or Google
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- 🛠️ **Custom Short Links**: Create branded, memorable URLs

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - API requests

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener/Frontend/URLsShortener
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Variables**

Create a `.env` file in the project root with the following variables:

```
VITE_BACKEND_URL=http://localhost:3001
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

5. **Build for production**

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Project Structure

```
URLsShortener/
├── public/             # Static assets
├── src/
│   ├── api/            # API connection and utilities
│   ├── components/     # Reusable UI components
│   │   ├── analytics/  # Analytics-specific components
│   │   └── ...
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions and utilities
│   ├── App.tsx         # Main App component with routes
│   ├── main.tsx        # Entry point
│   └── ...
├── .env                # Environment variables
└── ...
```

## Main Pages

- **Home** (`/`): Landing page with URL shortening feature
- **Dashboard** (`/dashboard`): Overview of your shortened URLs
- **URL Analytics** (`/dashboard/analytics/:id`): Detailed statistics for a specific URL
- **URL Management** (`/dashboard/urls`): Manage all your shortened URLs
- **Login/Register** (`/login`, `/register`): Authentication pages

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:3001` |

## Authentication

The application supports two authentication methods:
- Email/Password login
- Google OAuth integration

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` directory.

### Deployment Options

- **Netlify**: Connect your repository to Netlify for automatic deployments.
- **Vercel**: Deploy directly from GitHub with minimal configuration.
- **GitHub Pages**: Use GitHub Actions to build and deploy to Pages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

