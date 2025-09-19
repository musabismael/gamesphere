# 🌐 GameSphere - Global Gaming Platform

A **next-generation global gaming platform** where developers can easily upload their games and players can enjoy them from anywhere. Built with modern web technologies and designed to be more advanced, engaging, and flexible than existing platforms.

## ✨ Features

### 🎮 For Players
- **Discover Games**: Browse thousands of games across multiple genres and engines
- **AI Recommendations**: Personalized game suggestions based on your preferences
- **Achievement System**: Earn coins, unlock achievements, and level up
- **Community Features**: Reviews, comments, ratings, and social interaction
- **Cross-Platform**: Play on any device with seamless PWA support
- **Kids Safe**: Advanced content moderation and age-appropriate filtering
- **Wallet System**: Manage coins and in-game currency
- **Real-time Notifications**: Stay updated with game updates and achievements
- **Two-Factor Authentication**: Enhanced security for your account

### 🛠️ For Developers
- **Multi-Engine Support**: Upload games from HTML5, WebGL, Unity, Godot, Phaser, and more
- **Advanced Analytics**: Real-time insights into player behavior and revenue
- **Monetization Tools**: Built-in advertising and in-game purchase systems
- **Developer Dashboard**: Comprehensive management tools for your games
- **Revenue Sharing**: Earn from your games with transparent revenue sharing
- **Payment Integration**: Stripe integration for secure payments
- **Game Management**: Full CRUD operations for games and content

### 🔐 Security & Administration
- **Two-Factor Authentication (2FA)**: TOTP and backup codes support
- **Rate Limiting**: Protection against abuse and DDoS attacks
- **CSRF Protection**: Cross-site request forgery prevention
- **Audit Logging**: Complete activity tracking and monitoring
- **Admin Dashboard**: Comprehensive administrative controls
- **User Management**: Full user lifecycle management
- **Role-Based Access Control**: Granular permissions system
- **Data Backup**: Automated backup and restore system

### 🌍 Global Platform
- **Multi-Language Support**: Reach players worldwide
- **CDN Delivery**: Fast loading times globally
- **Mobile-First**: Optimized for all devices
- **SEO Optimized**: Maximum discoverability
- **Real-time Notifications**: Push notifications and in-app alerts
- **Payment Processing**: Global payment support with Stripe

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system
- **Redis** - Caching and sessions
- **Stripe** - Payment processing
- **Speakeasy** - Two-factor authentication
- **bcryptjs** - Password hashing

### Infrastructure
- **Vercel** - Hosting and deployment
- **CDN** - Global content delivery
- **Docker** - Containerization
- **Kubernetes** - Orchestration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gamesphere.git
   cd gamesphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gamesphere"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The platform uses a comprehensive database schema with the following main entities:

- **Users** - Players and developers with roles, coins, levels
- **Games** - Game metadata, files, ratings, analytics
- **Reviews** - Player reviews and ratings
- **Achievements** - Unlockable achievements and rewards
- **Communities** - Genre-based player communities
- **Analytics** - Detailed game performance metrics
- **Monetization** - Revenue tracking and sharing

## 🎯 Key Features Implementation

### Game Upload System
- Support for multiple game engines (HTML5, WebGL, Unity, Godot, etc.)
- File validation and optimization
- Thumbnail and banner image handling
- Metadata management

### Game Player
- WebGL and WebAssembly support
- Fullscreen mode
- Game controls and settings
- Progress tracking

### Analytics Dashboard
- Real-time game performance metrics
- Player demographics and behavior
- Revenue tracking and reporting
- Custom date ranges and filters

### Community Features
- Game reviews and ratings
- Comments and discussions
- Achievement system
- Social interactions

## 🔐 Security Features

### Authentication & Authorization
- **Multi-Provider Auth**: Google, GitHub, Discord, and email/password
- **Two-Factor Authentication**: TOTP with backup codes
- **Role-Based Access Control**: Player, Developer, Admin, Moderator roles
- **Session Management**: Secure JWT-based sessions
- **Password Security**: bcrypt hashing with salt rounds

### API Security
- **Rate Limiting**: Configurable limits per endpoint type
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: Content Security Policy headers

### Data Protection
- **Audit Logging**: Complete activity tracking
- **Data Encryption**: Sensitive data encryption at rest
- **Backup System**: Automated database backups
- **Privacy Controls**: GDPR-compliant data handling
- **Secure Headers**: Security headers implementation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── developer/         # Developer dashboard
│   ├── game/              # Game pages
│   └── games/             # Games listing
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── game/             # Game-specific components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Prisma](https://www.prisma.io/) - Database toolkit
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

- 📧 Email: support@gamesphere.com
- 💬 Discord: [Join our community](https://discord.gg/gamesphere)
- 📖 Documentation: [docs.gamesphere.com](https://docs.gamesphere.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/gamesphere/issues)

## 🎮 Try GameSphere

Ready to experience the future of gaming? Visit [GameSphere](https://gamesphere.com) and start playing amazing games from developers around the world!

---

**Built with ❤️ by the GameSphere Team**