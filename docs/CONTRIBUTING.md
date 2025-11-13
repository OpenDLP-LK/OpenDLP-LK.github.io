# Contributing to OpenDLP-LK

Thank you for your interest in contributing to OpenDLP-LK! We welcome contributions from developers, security professionals, compliance experts, and anyone passionate about data protection in Sri Lanka.

Whether you're fixing a typo, adding a new data pattern, or proposing a major enhancement, your contributions help make enterprise-grade Data Loss Prevention accessible to all Sri Lankan organizations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Ways to Contribute

### 1. Code Contributions

Fix bugs, add features, or improve the performance of our tools and libraries:

- **Bug Fixes**: Fix identified issues in the codebase
- **New Features**: Implement new functionality or enhancements
- **Performance Improvements**: Optimize existing code for better performance
- **Security Enhancements**: Strengthen security measures and implementations

### 2. Documentation

Improve guides, add examples, or translate content:

- **Write Tutorials**: Create step-by-step guides for implementing DLP
- **Fix Typos**: Correct spelling and grammar errors
- **Add Examples**: Provide real-world usage examples
- **Translations**: Translate documentation to Sinhala or Tamil
- **API Documentation**: Document code interfaces and functions

### 3. Data Patterns

Create or improve regex patterns for Sri Lankan data formats:

- **NIC Patterns**: Old and new NIC number formats
- **Bank Account Formats**: Local bank account number patterns
- **Phone Numbers**: Sri Lankan mobile and landline formats
- **Passport Numbers**: Sri Lankan passport formats
- **Tax Identification**: TIN and other tax-related patterns
- **Healthcare Data**: Patient ID and medical record formats

### 4. Policy Templates

Share DLP policy templates and governance frameworks:

- **DLP Policies**: Data classification and handling policies
- **Incident Response Plans**: Data breach response procedures
- **Training Materials**: Employee awareness and training content
- **Compliance Checklists**: PDPA compliance verification lists
- **Risk Assessment Templates**: DLP risk evaluation frameworks

### 5. Issue Reporting

Report bugs, request features, or suggest improvements:

- **Bug Reports**: Document issues with clear reproduction steps
- **Feature Requests**: Propose new features with use cases
- **Improvement Ideas**: Suggest enhancements to existing features

### 6. Community Support

Help others by answering questions and sharing knowledge:

- **Answer Questions**: Help community members in discussions
- **Share Experiences**: Document your DLP implementation journey
- **Mentor Newcomers**: Guide new contributors
- **Review Pull Requests**: Provide constructive feedback on PRs

## Getting Started

### Prerequisites

- Git installed on your system
- A GitHub account
- Basic knowledge of HTML/CSS for website contributions
- Understanding of DLP concepts (helpful but not required)

### Fork and Clone

1. **Fork the Repository**

   Visit [OpenDLP-LK GitHub](https://github.com/OpenDLP-LK/OpenDLP-LK.github.io) and click the "Fork" button.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/OpenDLP-LK.github.io.git
   cd OpenDLP-LK.github.io
   ```

3. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/OpenDLP-LK/OpenDLP-LK.github.io.git
   ```

4. **Keep Your Fork Updated**

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

## Development Setup

This is a static website built with HTML, CSS, and JavaScript. No complex build process is required.

### Local Development

1. **Navigate to the Project Directory**

   ```bash
   cd OpenDLP-LK.github.io
   ```

2. **Start a Local Server**

   You can use any static file server. Here are some options:

   **Using Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js (with http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **View the Website**

   Open your browser and navigate to `http://localhost:8000`

### Project Structure

```
OpenDLP-LK.github.io/
├── assets/              # CSS, JavaScript, and images
│   ├── css/
│   ├── js/
│   └── img/
├── community/           # Community pages
│   ├── contribute.html
│   ├── discussions.html
│   └── events.html
├── docs/                # Documentation files
│   ├── CONTRIBUTING.md
│   ├── CODE_OF_CONDUCT.md
│   └── LICENSE.md
├── implementation/      # Implementation guides
├── resources/           # Templates and resources
├── index.html           # Homepage
└── sitemap.xml          # Site map
```

## Contribution Guidelines

### Code Quality

- **Follow Existing Style**: Maintain consistency with the current codebase
- **Clean Code**: Write readable, maintainable code
- **Comments**: Add comments for complex logic or non-obvious implementations
- **Semantic HTML**: Use appropriate HTML5 semantic elements
- **Accessibility**: Ensure content is accessible (ARIA labels, alt text, etc.)
- **Responsive Design**: Test on multiple screen sizes and devices
- **Browser Compatibility**: Test on major browsers (Chrome, Firefox, Safari, Edge)

### Documentation Standards

- **Clear and Concise**: Write in simple, understandable language
- **Practical Examples**: Include real-world examples where applicable
- **PDPA Alignment**: Ensure compliance-related content aligns with PDPA No. 9 of 2022
- **Formatting**: Use proper Markdown formatting
- **Links**: Verify all links are working and point to correct resources
- **Screenshots**: Include screenshots for UI changes or complex procedures

### Testing

Before submitting your contribution:

1. **Visual Testing**: Check the website on different screen sizes
2. **Link Testing**: Verify all internal and external links work
3. **Accessibility Testing**: Use tools like WAVE or Lighthouse
4. **Content Review**: Proofread for spelling and grammar errors
5. **Cross-browser Testing**: Test on at least 2 different browsers

### Sitemap Updates

If you add new pages, update the `sitemap.xml` file:

```xml
<url>
    <loc>https://opendlp-lk.github.io/your-new-page.html</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

## Pull Request Process

### Before Submitting

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Use descriptive branch names:
   - `feature/add-nic-pattern`
   - `fix/typo-in-getting-started`
   - `docs/update-installation-guide`
   - `enhancement/improve-navigation`

2. **Make Your Changes**

   - Write clean, well-documented code
   - Follow the contribution guidelines
   - Test your changes thoroughly

3. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add descriptive commit message"
   ```

   See [Commit Message Guidelines](#commit-message-guidelines) below.

4. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting a Pull Request

1. **Create the PR**

   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template completely

2. **PR Template Checklist**

   Ensure you complete all relevant items in the PR template:
   - [ ] Describe the changes made
   - [ ] Link to related issues
   - [ ] Select the type of change
   - [ ] Add screenshots for UI changes
   - [ ] Verify all links work
   - [ ] Test on multiple screen sizes
   - [ ] Update sitemap.xml if needed
   - [ ] Ensure PDPA alignment for compliance content

3. **Review Process**

   - Maintainers will review your PR
   - Address any requested changes promptly
   - Be open to feedback and suggestions
   - Once approved, your PR will be merged

4. **After Merge**

   - Delete your feature branch
   - Update your local main branch
   - Celebrate your contribution! 🎉

## Commit Message Guidelines

Write clear, meaningful commit messages that describe what changed and why.

### Format

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

### Examples

**Good:**
```
feat: add NIC validation pattern for new format

Implemented regex pattern to validate new NIC numbers (12 digits)
following the format introduced in 2016. Pattern validates both
the structure and checksum digit.

Closes #123
```

**Good:**
```
fix: correct responsive layout on mobile devices

Fixed navbar overflow issue on screens smaller than 768px.
Menu items now properly stack vertically.
```

**Good:**
```
docs: update PDPA compliance checklist

Added missing items related to data retention policies
and cross-border data transfer requirements.
```

**Avoid:**
```
Update files
Fixed stuff
Changes
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 50 characters
- Capitalize the subject line
- Don't end the subject line with a period
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Explain what and why, not how

## Community

### Communication Channels

- **GitHub Discussions**: For questions, ideas, and general discussions
- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code review and collaboration

### Getting Help

If you need help or have questions:

1. Check existing documentation and guides
2. Search for similar issues or discussions
3. Ask in GitHub Discussions
4. Reach out to maintainers

### Recognition

All contributors are recognized in our project. Your contributions, big or small, make a difference!

- Contributors are listed in the project
- Significant contributions may be highlighted in release notes
- Active contributors may be invited to become maintainers

## License

By contributing to OpenDLP-LK, you agree that your contributions will be licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## Questions?

If you have any questions about contributing, please:

1. Check this guide thoroughly
2. Review our [Code of Conduct](CODE_OF_CONDUCT.md)
3. Open a discussion on GitHub
4. Contact the maintainers

---

Thank you for contributing to OpenDLP-LK and helping make data protection accessible to Sri Lankan organizations! 🇱🇰 🛡️
