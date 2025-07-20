# MailToWP v2 🚀

**Desktop application for converting emails to WordPress articles with AI assistance**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-28.3.3-green.svg)](https://www.electronjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange.svg)](https://pnpm.io/)
[![Status: In Development](https://img.shields.io/badge/Status-In%20Development-orange.svg)](https://github.com/mbatorowicz/MailToWP)

## 📋 Overview

MailToWP v2 is a powerful desktop application that helps you convert emails into WordPress articles with AI assistance. It features Gmail integration, AI content analysis, image processing, and direct WordPress publishing.

## ✨ Features

- **📧 Gmail Integration** - Connect to Gmail and fetch emails
- **🤖 AI Analysis** - Analyze email content with OpenAI/Anthropic
- **📝 Article Management** - Create and edit WordPress articles
- **🖼️ Image Processing** - Process and optimize images with Sharp
- **🌐 WordPress Publishing** - Direct publishing to WordPress sites
- **💾 Local Storage** - Save credentials and settings locally
- **🎨 Modern UI** - Beautiful interface with Material-UI

## 🏗️ Architecture

```
📁 MailToWP-v2/
├── 📁 apps/
│   ├── 🖥️ main/ (Electron - Desktop App)
│   ├── 🎨 renderer/ (React - Frontend)
│   └── 🔌 api/ (Express - Backend)
├── 📁 shared/ (TypeScript Types & Constants)
└── 📁 docs/ (Documentation)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 8+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/mbatorowicz/MailToWP.git
cd MailToWP

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development

```bash
# Start all services (Frontend + Backend)
pnpm dev

# Start individual services
pnpm --filter renderer dev  # Frontend (http://localhost:3000)
pnpm --filter api dev       # Backend (http://localhost:3002)

# Build for production
pnpm build

# Run tests (coming soon)
pnpm test
```

## 📱 Usage

1. **Start the application** - `pnpm dev`
2. **Open browser** - http://localhost:3000
3. **Connect Gmail** - OAuth2 authentication
4. **Select emails** - Choose emails to convert
5. **AI Analysis** - Let AI analyze content
6. **Edit article** - Modify content as needed
7. **Publish** - Send to WordPress

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI, Vite
- **Backend**: Node.js, Express, TypeScript
- **Desktop**: Electron 28
- **Package Manager**: pnpm (workspaces)
- **State Management**: Zustand
- **Build Tools**: Vite, TypeScript
- **Image Processing**: Sharp
- **AI**: OpenAI/Anthropic APIs

## 📋 Development Status

### ✅ Completed (Phase 1)
- [x] Project setup with pnpm workspaces
- [x] TypeScript configuration
- [x] Basic UI with Material-UI
- [x] Express backend with health check
- [x] Vite development server
- [x] Proxy configuration
- [x] Shared types and constants

### 🚧 In Progress (Phase 2)
- [ ] Gmail OAuth2 integration
- [ ] Email fetching and parsing
- [ ] Email list UI component
- [ ] Error handling and loading states

### 📅 Planned
- [ ] AI integration (Phase 3)
- [ ] Article management (Phase 4)
- [ ] WordPress integration (Phase 5)
- [ ] Image processing (Phase 6)
- [ ] Electron desktop app (Phase 7)
- [ ] Testing and optimization (Phase 8)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone
git clone https://github.com/your-username/MailToWP.git
cd MailToWP

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build
pnpm build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Material-UI](https://mui.com/) - Component library
- [Electron](https://www.electronjs.org/) - Desktop framework
- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/mbatorowicz/MailToWP/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mbatorowicz/MailToWP/discussions)
- **Email**: [Contact via GitHub](https://github.com/mbatorowicz)

---

**Made with ❤️ for the WordPress community** 