# MailToWP v2 🚀

**Desktop application for converting emails to WordPress articles with AI assistance**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-28.3.3-green.svg)](https://www.electronjs.org/)

## 📋 Overview

MailToWP v2 is a powerful desktop application that helps you convert emails into WordPress articles with AI assistance. It features Gmail integration, AI content analysis, image processing, and direct WordPress publishing.

## ✨ Features

- **📧 Gmail Integration** - Connect to Gmail and fetch emails
- **🤖 AI Analysis** - Analyze email content with OpenAI/Claude
- **🖼️ Image Processing** - Process and optimize images with Sharp
- **📝 Article Management** - Create and edit articles
- **🌐 WordPress Integration** - Direct publishing to WordPress
- **🎨 Modern UI** - Beautiful Material-UI interface
- **⚡ Performance** - Fast and responsive desktop app

## 🏗️ Architecture

```
MailToWP-v2/
├── apps/
│   ├── main/          # Electron main process
│   ├── renderer/      # React frontend
│   └── api/           # Express backend
├── shared/            # Shared types and utilities
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mailtowp-v2.git
   cd mailtowp-v2
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3002

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all services (frontend + backend)
pnpm dev:all          # Start all services including Electron

# Build
pnpm build            # Build all workspaces
pnpm --filter renderer build  # Build frontend only
pnpm --filter api build       # Build backend only
pnpm --filter main build      # Build Electron only

# Clean
pnpm clean            # Clean all build outputs
```

### Project Structure

```
├── apps/
│   ├── main/                 # Electron main process
│   │   ├── src/
│   │   │   └── main.ts      # Main process entry
│   │   └── package.json
│   ├── renderer/             # React frontend
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── App.tsx       # Main app component
│   │   │   └── main.tsx      # Frontend entry
│   │   └── package.json
│   └── api/                  # Express backend
│       ├── src/
│       │   └── server.ts     # API server
│       └── package.json
├── shared/                   # Shared code
│   ├── types/               # TypeScript type definitions
│   ├── constants/           # Shared constants
│   └── utils/               # Utility functions
└── docs/                    # Documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
PORT=3002

# Gmail OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3002/auth/google/callback

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# WordPress
WORDPRESS_URL=your_wordpress_site_url
WORDPRESS_USERNAME=your_username
WORDPRESS_APPLICATION_PASSWORD=your_app_password
```

## 📚 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- [API Documentation](docs/API.md)
- [Development Guide](docs/DEVELOPMENT.md)

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📦 Build for Production

```bash
# Build all workspaces
pnpm build

# Create Electron app
pnpm --filter main build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Search [existing issues](https://github.com/yourusername/mailtowp-v2/issues)
3. Create a [new issue](https://github.com/yourusername/mailtowp-v2/issues/new)

## 🗺️ Roadmap

- [x] **Phase 1**: Setup and basic UI
- [ ] **Phase 2**: Gmail Integration
- [ ] **Phase 3**: AI Integration
- [ ] **Phase 4**: Image Processing
- [ ] **Phase 5**: Article Management
- [ ] **Phase 6**: WordPress Integration
- [ ] **Phase 7**: Polish and Testing

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Material-UI](https://mui.com/) - Component library
- [Electron](https://www.electronjs.org/) - Desktop framework
- [Express](https://expressjs.com/) - Backend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [OpenAI](https://openai.com/) - AI capabilities

---

**Made with ❤️ for the WordPress community** 