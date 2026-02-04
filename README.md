# 🏡 Wanderlust

**Wanderlust** is a full-stack web application inspired by Airbnb that allows users to explore, list, and review vacation rentals around the world. Built with modern web technologies, it provides a seamless experience for property owners and travelers alike.

![Node.js](https://img.shields.io/badge/Node.js-22.17.1-green)
![Express](https://img.shields.io/badge/Express-4.22.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🌐 Live Demo

**Try the live application:** [https://wanderlust-4c1x.onrender.com/listings](https://wanderlust-4c1x.onrender.com/listings)

> 🚀 The application is deployed on Render and ready to use!

---

## ✨ Features

### 🏠 Listing Management
- **Create Listings**: Users can create property listings with images, descriptions, pricing, and location details
- **Edit & Delete**: Full CRUD operations for property owners to manage their listings
- **Image Upload**: Seamless image uploads powered by Cloudinary with automatic optimization
- **Location Mapping**: Integration with Mapbox for visual location representation

### 👥 User Authentication
- **Secure Registration & Login**: Built with Passport.js for robust authentication
- **Session Management**: Persistent sessions using MongoDB store
- **Authorization**: Role-based access control ensuring users can only edit/delete their own listings

### ⭐ Reviews & Ratings
- **Review System**: Users can leave detailed reviews and ratings for properties they've experienced
- **Review Management**: Users can delete their own reviews
- **Average Ratings**: Dynamic rating calculations for each listing

### 🔍 Search & Discovery
- **Search Functionality**: Find properties by location, title, or country
- **Browse All Listings**: Explore all available vacation rentals
- **Detailed Property Views**: Comprehensive property information including images, amenities, and reviews

### 🎨 User Experience
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Flash Messages**: Real-time feedback for user actions (success, error, delete confirmations)
- **Error Handling**: Comprehensive error handling with user-friendly error pages
- **Form Validation**: Server-side validation using Joi to ensure data integrity

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.17.1) - Runtime environment
- **Express.js** (v4.22.1) - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** (v7.8.8) - MongoDB object modeling

### Authentication & Security
- **Passport.js** - Authentication middleware
- **Passport Local** - Local authentication strategy
- **Passport Local Mongoose** - Mongoose plugin for user authentication
- **Express Session** - Session middleware with MongoDB store
- **Connect Flash** - Flash messaging

### File Uploads & Media
- **Cloudinary** - Cloud-based image storage and optimization
- **Multer** - Multipart form data handling for file uploads
- **Multer Storage Cloudinary** - Cloudinary storage engine for Multer

### Mapping & Geolocation
- **Mapbox SDK** - Maps and geolocation services

### Templating & Views
- **EJS** - Embedded JavaScript templating
- **EJS Mate** - Layout, partial, and block support for EJS

### Validation & Utilities
- **Joi** - Schema description and data validation
- **Method Override** - HTTP verb support (PUT, DELETE) in forms
- **dotenv** - Environment variable management

---

## 📦 Installation

### Prerequisites
- **Node.js** (v22.17.1 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)
- **Mapbox Account** (for maps integration)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # MongoDB Connection
   MONGO_URL=your_mongodb_connection_string
   
   # Session Secret (use a strong random string)
   SECRET=your_session_secret_key
   
   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   
   # Mapbox Configuration
   MAP_TOKEN=your_mapbox_access_token
   
   # Environment
   NODE_ENV=development
   ```

4. **Initialize the database (Optional)**
   
   If you want to populate the database with sample data:
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   node app.js
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## 🗂️ Project Structure

```
wanderlust/
│
├── models/              # Mongoose models
│   ├── listing.js       # Property listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
│
├── controllers/         # Route controllers
│   ├── listings.js      # Listing controller logic
│   ├── review.js        # Review controller logic
│   └── user.js          # User authentication logic
│
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User routes
│
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── includes/        # Reusable partials (navbar, footer, flash)
│   ├── listings/        # Listing views (index, show, new, edit)
│   ├── users/           # User views (signup, login)
│   └── error.ejs        # Error page
│
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
│
├── utils/               # Utility files
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error handler wrapper
│
├── init/                # Database initialization
│   └── index.js         # Seed data script
│
├── cloudConfig.js       # Cloudinary configuration
├── schema.js            # Joi validation schemas
├── middleware.js        # Custom middleware functions
├── app.js               # Main application file
├── package.json         # Project dependencies
└── .env                 # Environment variables (not tracked)
```

---

## 🚀 Usage

### For Travelers

1. **Sign Up / Log In**
   - Create an account or log in to access full features
   - Browse listings without authentication

2. **Explore Listings**
   - Use the search feature to find properties by location
   - View detailed information about each property
   - Read reviews from other travelers

3. **Leave Reviews**
   - Share your experience by leaving reviews and ratings
   - Help other travelers make informed decisions

### For Property Owners

1. **Create a Listing**
   - Click "Create New Listing"
   - Fill in property details (title, description, price, location, country)
   - Upload high-quality images
   - Submit to make your property live

2. **Manage Your Listings**
   - Edit property details anytime
   - Update pricing and availability
   - Delete listings when needed

3. **Respond to Reviews**
   - View all reviews for your properties
   - Build trust with potential guests

---

## 🔒 Environment Variables

> [!IMPORTANT]
> Make sure to set up all required environment variables before running the application.

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/wanderlust` |
| `SECRET` | Session secret key | `mysupersecretkey123!` |
| `CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUD_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `MAP_TOKEN` | Mapbox access token | `pk.eyJ1Ijoi...` |
| `NODE_ENV` | Environment mode | `development` or `production` |

---

## 🧪 Testing

Currently, the project uses manual testing. To test the application:

1. Start the server: `node app.js`
2. Navigate to `http://localhost:8080`
3. Test all CRUD operations:
   - Create a new listing
   - View listing details
   - Edit an existing listing
   - Delete a listing
   - Add reviews
   - Delete reviews

---

## 🐛 Common Issues & Troubleshooting

### `.gitignore` Not Working

If your `.gitignore` file isn't working and sensitive files (like `.env` or `node_modules`) were already committed:

```bash
# Remove cached files from git
git rm -r --cached .
git add .
git commit -m "Fixed .gitignore"
```

### Image Upload Issues

- Verify Cloudinary credentials in `.env`
- Check that `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET` are correct
- Ensure file size is under Cloudinary's limit

### MongoDB Connection Errors

- Verify `MONGO_URL` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for development)
- Ensure MongoDB service is running (for local installations)

### Session Issues

- Clear browser cookies
- Verify `SECRET` is set in `.env`
- Check MongoDB session store connection

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Sanesh Kumar**

- GitHub: [@Sanesh764](https://github.com/Sanesh764)

---

## 🙏 Acknowledgments

- Inspired by **Airbnb** for the user experience and design
- Built as part of the **Apna College** Web Development course
- Special thanks to all contributors and the open-source community

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Common Issues](#-common-issues--troubleshooting) section
2. Open an issue on GitHub
3. Contact the author

---

## 🔮 Future Enhancements

- [ ] Advanced search filters (price range, amenities, guest capacity)
- [ ] Booking system with calendar integration
- [ ] Payment gateway integration
- [ ] Email notifications for bookings and reviews
- [ ] User profiles with avatar uploads
- [ ] Wishlist/favorites functionality
- [ ] Admin dashboard for site management
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

**Made with ❤️ by Sanesh Kumar**

</div>
