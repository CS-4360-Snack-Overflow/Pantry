const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  const image = new Image ({
    name: originalname,
    data: buffer,
    contentType: mimetype
  });

  await image.save();

  res.send('Image uploaded');
});

module.exports = router;
