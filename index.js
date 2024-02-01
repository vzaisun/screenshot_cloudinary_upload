const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://screenshot-theta-ten.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;


cloudinary.config({
    cloud_name: 'dlk0f9csv',
    api_key: '883861739698231',
    api_secret: '1CmsS8eZzmJN1nJD5fjMqdgo0Vg',
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const result = await cloudinary.uploader.upload("data:image/jpeg;base64," + req.file.buffer.toString('base64'), { folder: 'images' });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
