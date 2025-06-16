const Url = require('../models/Url');
const { nanoid } = require('nanoid');

// POST /api/url - create short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Generate a unique shortId
    const shortId = nanoid(8);

    // Save to DB
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.status(201).json({ shortId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/url/:shortId - redirect to original URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Redirect with status 302 to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
