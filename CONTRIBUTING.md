# Contributing to MailToWP v2 🤝

Thank you for your interest in contributing to MailToWP v2! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub first, then clone your fork
   git clone https://github.com/your-username/MailToWP.git
   cd MailToWP
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development servers**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Frontend: http://localhost:3000
   - API: http://localhost:3002

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start frontend + backend
pnpm dev:all          # Start all services including Electron

# Building
pnpm build            # Build all workspaces
pnpm --filter renderer build  # Build frontend only
pnpm --filter api build       # Build backend only

# Testing
pnpm test             # Run all tests
pnpm test:coverage    # Run tests with coverage

# Code Quality
pnpm lint             # Run linting
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking

# Security
pnpm audit            # Security audit
pnpm audit:fix        # Fix security issues
```

### Project Structure

```
📁 MailToWP-v2/
├── 📁 apps/
│   ├── 🖥️ main/ (Electron - Desktop App)
│   ├── 🎨 renderer/ (React - Frontend)
│   └── 🔌 api/ (Express - Backend)
├── 📁 shared/ (TypeScript Types & Constants)
├── 📁 docs/ (Documentation)
└── 📁 .github/ (GitHub Actions)
```

## 📝 Contributing Guidelines

### Before You Start

1. **Check existing issues** - Search for existing issues before creating new ones
2. **Check the roadmap** - See what's planned in the [README.md](README.md)
3. **Join discussions** - Participate in [GitHub Discussions](https://github.com/mbatorowicz/MailToWP/discussions)

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes** - Fix issues and improve stability
- ✨ **New features** - Add new functionality
- 📚 **Documentation** - Improve docs and guides
- 🧪 **Tests** - Add or improve test coverage
- 🎨 **UI/UX** - Improve user interface and experience
- 🔧 **Infrastructure** - Improve build tools and CI/CD
- 🌐 **Translations** - Add language support

### Development Phases

Current development follows these phases:

1. **Phase 1** ✅ - Setup and basic UI (COMPLETED)
2. **Phase 2** 🚧 - Gmail Integration (IN PROGRESS)
3. **Phase 3** 📅 - AI Integration (PLANNED)
4. **Phase 4** 📅 - Article Management (PLANNED)
5. **Phase 5** 📅 - WordPress Integration (PLANNED)
6. **Phase 6** 📅 - Image Processing (PLANNED)
7. **Phase 7** 📅 - Electron Desktop App (PLANNED)
8. **Phase 8** 📅 - Testing and Optimization (PLANNED)

## 🔄 Pull Request Process

### Creating a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use the PR template
   - Describe your changes clearly
   - Link related issues

### Pull Request Guidelines

- **Title**: Use conventional commits format (e.g., `feat: add Gmail integration`)
- **Description**: Explain what and why, not how
- **Tests**: Include tests for new functionality
- **Documentation**: Update docs if needed
- **Screenshots**: Include screenshots for UI changes

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

## 🐛 Issue Guidelines

### Creating Issues

1. **Use the issue templates**
2. **Provide clear description**
3. **Include reproduction steps**
4. **Add screenshots if relevant**
5. **Specify environment details**

### Issue Types

- 🐛 **Bug Report** - Something isn't working
- ✨ **Feature Request** - Suggest a new feature
- 📚 **Documentation** - Improve documentation
- 🎨 **UI/UX** - Interface improvements
- 🔧 **Infrastructure** - Build/tooling improvements

## 🎨 Code Style

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow strict TypeScript configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Use TypeScript interfaces for props
- Follow Material-UI patterns
- Keep components small and focused

### File Naming

- Use kebab-case for files: `email-list.tsx`
- Use PascalCase for components: `EmailList`
- Use camelCase for functions: `getEmailData`

### Import/Export

```typescript
// Good
import { EmailList } from './components/email-list';
import type { Email } from '@/types/email';

// Bad
import EmailList from './components/EmailList';
```

## 🧪 Testing

### Test Guidelines

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

## 📞 Getting Help

- **GitHub Issues**: [Create an issue](https://github.com/mbatorowicz/MailToWP/issues)
- **GitHub Discussions**: [Join discussions](https://github.com/mbatorowicz/MailToWP/discussions)
- **Documentation**: Check the [docs/](docs/) folder

## 🙏 Recognition

Contributors will be recognized in:
- [README.md](README.md) contributors section
- GitHub repository contributors
- Release notes

Thank you for contributing to MailToWP v2! 🚀 