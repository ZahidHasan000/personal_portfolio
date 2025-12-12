// const express = require("express");
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const rateLimit = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');
// const cors = require('cors'); // Import cors package
// const helmet = require('helmet')

// const path = require('path');

// const projectRouter = require('./route/projectRoute.route');

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, Please try again in an hour!'
// });

// dotenv.config();
// const app = express();

// // app.use(cors({
// //   origin: 'https://portfolio-frontend-lurr.onrender.com' // Allow requests only from this origin
// //   // origin: 'http://localhost:5173' // Allow requests only from this origin
// // }));

// app.use(cors());


// // app.use(express.json({ limit: '10kb' }));
// app.use(express.json({ limit: '100kb' }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));
// app.use('/api', limiter);
// app.use(mongoSanitize());
// app.use('/api', projectRouter);

// // Set cache control headers to prevent caching
// // Set cache control headers to prevent caching
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//   res.setHeader('Expires', '0');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Surrogate-Control', 'no-store');
//   next();
// });

// app.use(
//   helmet.crossOriginResourcePolicy({
//     policy: "cross-origin",
//   })
// );

// // Development logging
// // if (process.env.NODE_ENV === 'development') {
// //   app.use(morgan('dev'));
// // };



// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.use(express.static('public'));

// app.use(express.static(
//   path.join(__dirname, '..', 'frontend', 'dist')
// ));

// app.use('/uploads', express.static(path.join(__dirname, 'public')));


// // ✅ Handle React routing
// app.get('*', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '..', 'frontend', 'dist', 'index.html')
//   );
// });

// //Serving static files
// // app.use(express.static(path.join(__dirname, '/frontend/dist')));
// // // app.use(express.static(path.join(__dirname, '/frontend/src')));

// // //render e-comerce-frontend for any path
// // app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/dist/index.html')))
// // app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/src/index.html')))



// const DB = process.env.DATABASE_PASSWORD;
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB connection successful!'));

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`Server Running on Port: http://localhost:${port}`);
// });

// process.on('unhandledRejection', err => {
//   console.log(err.name, err.message);
//   console.log('Unhandled Rejection!  Shutting down');

//   server.close(() => {
//     process.exit(1);
//   });
// });

const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const projectRouter = require('./route/projectRoute.route');

dotenv.config();
const app = express();

// ✅ CRITICAL: Set trust proxy FIRST
app.set('trust proxy', 1);

// ✅ CORS Configuration
const allowedOrigins = [
  // 'https://portfolio-frontend-lurr.onrender.com',
  'http://localhost:5173',
  'http://localhost:5000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Rate Limiter with proxy support
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true
});

// Middleware
app.use(express.json({ limit: '100kb' }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));
app.use(mongoSanitize());

// Cache control
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// API routes
app.use('/api', limiter);
app.use('/api', projectRouter);

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/frontend/dist')));

//render e-comerce-frontend for any path
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/dist/index.html')))

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Database connection
const DB = process.env.DATABASE_PASSWORD;
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down');
  server.close(() => {
    process.exit(1);
  });
});

