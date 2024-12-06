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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());


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
const studentRoutes = require('./routes/studentRoute');

// Middleware for authentication
const { protect } = require('./middlewares/authMiddleware');

// API Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


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


app.use('/uploads', express.static(uploadDir));

// Use routes
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', protect, jobRoutes); 
app.use('/api/company', companyRoutes);
app.use('/api/placement-drives', placementDriveRoutes);
app.use('/api/recruitments', recruitmentRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); 
app.use('/api/academic-records', academicRecordRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

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
