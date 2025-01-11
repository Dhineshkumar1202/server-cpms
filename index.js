const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


// Load environment variables
dotenv.config();


// Initialize the app
const app = express();



// Middleware for security
app.use(helmet());




// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);





// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// CORS configuration
const allowedOrigins = ['https://client-cpms.netlify.app'];
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

// File upload configuration
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});



const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only PDFs, PNGs, and JPEGs are allowed.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, 
});


// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        filePath: req.file.path,
        message: 'File uploaded successfully',
    });
});



// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));


// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import and use routes
const applicationRoutes = require('./routes/applicationRoute');
const interviewRoutes = require('./routes/interviewRoute');
const companyRoutes = require('./routes/companyRoute');
const placementDriveRoutes = require('./routes/placementDriveRoute');
const recruitmentStatusRoutes = require('./routes/recruitmentStatusRoute');
const academicRecordsRoutes = require('./routes/academicRecordRoute');
const authRoutes = require('./routes/authRoute');
const jobApplicationRoutes = require('./routes/jobApplicationRoute');
const jobRoutes = require("./routes/jobRoute");
const errorHandler = require("./middlewares/errorHandler");




app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placement-drives', placementDriveRoutes);
app.use('/api/recruitment-status', recruitmentStatusRoutes);
app.use('/api/academic-records', academicRecordsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);





// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
    process.exit(1); // Exit the process on failure
  });




// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

