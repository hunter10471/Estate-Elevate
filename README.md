# Estate Elevate 🏠

A modern real estate platform built with Next.js 14, featuring property listings, user authentication, real-time chat, and interactive maps.

## 🌟 Features

### Core Features
- **Property Listings**: Browse and search properties with advanced filtering
- **User Authentication**: Secure login/signup with Google OAuth and email/password
- **Real-time Chat**: Instant messaging between users with Pusher integration
- **Interactive Maps**: Property location visualization with Leaflet
- **Property Management**: List, edit, and manage your properties
- **Favorites System**: Like and save properties to your favorites
- **Notifications**: Real-time notifications for chat requests and property likes
- **Responsive Design**: Mobile-first design with Tailwind CSS

### User Features
- **Property Search**: Advanced search with filters (price, location, type, etc.)
- **Property Details**: Comprehensive property information with image galleries
- **User Profiles**: Manage personal information and preferences
- **Chat System**: Connect with property owners and other users
- **Favorites**: Save and manage liked properties
- **Property Listings**: List your own properties for sale or rent

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Leaflet** - Interactive maps
- **React Select** - Advanced select components
- **Formik + Zod** - Form handling and validation
- **React Toastify** - Toast notifications

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and real-time features
- **NextAuth.js** - Authentication system
- **Pusher** - Real-time messaging
- **bcrypt** - Password hashing

### External Services
- **Cloudinary** - Image upload and management
- **Google OAuth** - Social authentication
- **Upstash Redis** - Redis hosting

## 📁 Project Structure

```
estate_elevate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── chat/              # Chat functionality
│   │   ├── properties/        # Property pages
│   │   └── profile/           # User profile
│   ├── components/            # React components
│   │   ├── large/            # Large components
│   │   ├── medium/           # Medium components
│   │   └── small/            # Small components
│   ├── context/              # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utility libraries
│   ├── store/                # State management
│   └── types/                # TypeScript types
├── prisma/                   # Database schema
├── public/                   # Static assets
└── utils/                    # Utility functions
```

## 🔌 API Routes

### Authentication Routes

#### `POST /api/auth/signup`
- **Description**: User registration
- **Body**: `{ name, email, password, confirmPassword, phone?, bio?, city?, state?, country? }`
- **Response**: `{ message, user }`

#### `GET/POST /api/auth/[...nextauth]`
- **Description**: NextAuth.js authentication endpoints
- **Providers**: Google OAuth, Credentials
- **Features**: JWT sessions, password hashing

### Property Routes

#### `POST /api/property`
- **Description**: Create new property listing
- **Body**: `{ title, description, price, type, status, address, city, state, country, latlng, bedrooms, bathrooms, area, yearBuilt?, images, facilities, negotiable, listedById }`
- **Response**: `{ message, property }`

### Chat Routes

#### `POST /api/chat/add`
- **Description**: Send chat request to user
- **Body**: `{ id: string }` (target user ID)
- **Features**: Real-time notifications via Pusher

#### `POST /api/chat/accept`
- **Description**: Accept incoming chat request
- **Body**: `{ chatPartner: SafeUser }`
- **Features**: Creates chat session, real-time updates

#### `POST /api/chat/deny`
- **Description**: Deny incoming chat request
- **Body**: `{ id: string }` (sender user ID)

#### `POST /api/chat/send`
- **Description**: Send message in chat
- **Body**: `{ text, chatId, chatPartner, existingMessage? }`
- **Features**: Real-time messaging, message persistence

### Notification Routes

#### `POST /api/notification`
- **Description**: Send notification to user
- **Body**: `{ receiverId, senderId, propertyId?, type }`
- **Types**: `LIKE_PROPERTY`, `CHAT_REQUEST`
- **Features**: Real-time notifications via Pusher

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  phone         String?
  bio           String?
  city          String?
  state         String?
  country       String?
  userType      UserType  @default(USER)
  lastLogin     DateTime?
  isActive      Boolean   @default(true)
  // Relations
  accounts      Account[]
  sessions      Session[]
  likedProperties LikedProperty[]
  listings      Property[]
}
```

### Property Model
```prisma
model Property {
  id          String        @id @default(cuid())
  title       String
  description String
  price       Float
  type        PropertyType
  status      ListingStatus
  address     String?
  city        String
  state       String
  country     String
  latlng      Int[]
  bedrooms    Int
  bathrooms   Int
  area        Float
  yearBuilt   Int?
  images      String[]
  facilities  String[]
  negotiable  Boolean
  // Relations
  listedBy    User          @relation(fields: [listedById], references: [id])
  likedBy     LikedProperty[]
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis instance
- Google OAuth credentials
- Cloudinary account
- Pusher account

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Database
POSTGRES_PRISMA_URL="your_postgresql_url"
POSTGRES_URL_NON_POOLING="your_postgresql_direct_url"

# Authentication
NEXTAUTH_SECRET="your_nextauth_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Redis
UPSTASH_REDIS_REST_URL="your_redis_url"
UPSTASH_REDIS_REST_TOKEN="your_redis_token"

# Pusher
PUSHER_APP_ID="your_pusher_app_id"
PUSHER_KEY="your_pusher_key"
PUSHER_SECRET="your_pusher_secret"
PUSHER_CLUSTER="your_pusher_cluster"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# App
NEXTAUTH_URL="http://localhost:3000"
VERCEL_URL="http://localhost:3000"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd estate_elevate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Key Pages

### Public Pages
- **Home** (`/`) - Landing page with property search
- **Properties** (`/properties`) - Browse all properties
- **Property Details** (`/properties/[id]`) - Individual property view
- **Contact** (`/contact`) - Contact form
- **Login** (`/auth/login`) - User authentication
- **Signup** (`/auth/signup`) - User registration

### Protected Pages
- **Profile** (`/profile`) - User profile management
- **My Listings** (`/properties/mine/listed`) - User's property listings
- **My Favorites** (`/properties/mine/liked`) - User's liked properties
- **Chat** (`/chat`) - Real-time messaging
- **Chat Room** (`/chat/[id]`) - Individual chat conversations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Component Architecture

The project follows a modular component architecture:

- **Large Components**: Complex page sections (Navbar, Footer, ChatWindow)
- **Medium Components**: Reusable UI blocks (Card, SearchBar, Map)
- **Small Components**: Basic UI elements (Button, Input, Logo)

## 🔐 Authentication & Authorization

- **NextAuth.js** handles authentication with multiple providers
- **JWT sessions** for secure user sessions
- **Middleware** protects routes based on authentication status
- **User types** (USER, ADMIN) for role-based access control

## 💬 Real-time Features

- **Pusher integration** for real-time chat and notifications
- **Redis** for caching and session management
- **WebSocket connections** for instant messaging
- **Live notifications** for user interactions

## 🗺️ Map Integration

- **Leaflet.js** for interactive maps
- **Geocoding** for address-to-coordinates conversion
- **Property markers** with custom popups
- **Location-based search** functionality

## 📸 Image Management

- **Cloudinary** for image upload and optimization
- **Multiple image support** for property galleries
- **Responsive images** with Next.js Image component
- **Avatar management** for user profiles

## 🧪 Testing & Validation

- **Zod schemas** for form validation
- **TypeScript** for type safety
- **ESLint** for code quality
- **Formik** for form state management

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Estate Elevate** - Connecting you to beautiful homes and the best real estate deals, all in one place. 🏡✨
