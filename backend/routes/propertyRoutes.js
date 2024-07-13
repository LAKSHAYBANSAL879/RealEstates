const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  addProperty,
  getProperties,
  getPropertyById,
  editProperty,
  removeProperty,
} = require('../Controllers/propertyController');

const router = express.Router();

const uploadPath = path.join(__dirname, '../property-images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/addProperty', upload.array('photos', 10), addProperty);
router.get('/allProperties', getProperties);
router.get('/properties/:id', getPropertyById);
router.put('/editProperties/:id', upload.array('photos', 10), editProperty);
router.delete('/removeProperties/:id', removeProperty);
router.use('/uploadsss', express.static(uploadPath)); 

module.exports = router;
