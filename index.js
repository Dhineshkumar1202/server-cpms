const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

const allowedOrigins = [
    'https://6761bea3d3a76308452c436a--voluble-sawine-cb37ed.netlify.app',
    'http://localhost:5173', // For local development
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    })
  );
  

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directory for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

// Import routes
const applicationRoutes = require('./routes/applicationRoute');
const interviewRoutes = require('./routes/interviewRoute');
const jobRoutes = require('./routes/jobRoute');
const companyRoutes = require('./routes/companyRoute');
const placementDriveRoutes = require('./routes/placementDriveRoute');
const recruitmentRoutes = require('./routes/recruitmentRoute');
const academicRecordRoutes = require('./routes/academyRecordRoute');
const authRoutes = require('./routes/authRoute');

// API Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file,
        });
    } else {
        res.status(400).json({
            message: 'No file uploaded',
        });
    }
});

// Static folder for uploaded files
app.use('/uploads', express.static(uploadDir));

// Use routes
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placement-drives', placementDriveRoutes);
app.use('/api/recruitments', recruitmentRoutes);
app.use('/api/academic-records', academicRecordRoutes);
app.use('/api/auth',authRoutes);




// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
