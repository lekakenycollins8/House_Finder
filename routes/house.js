const express = require('express');
const router = express.Router();
const House = require('../models/House');
const User = require('../models/User');
const upload = require('../config/uploads');

//Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };

// Middleware to ensure user is authenticated and is a landlord

const ensureLandlord = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'landlord') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden: Only landlords can create listings' });
};

// Route for creating a new house listing

router.post('/create-house', ensureAuthenticated, ensureLandlord, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    const { title, description, location, price, availableFrom } = req.body;

    const images = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : [];
    const video = req.files['video'] 
    ? `/uploads/${req.files['video'][0].filename}` 
    : '';

    if (!title || !description || !location || !price || !availableFrom) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const house = await House.create({
            title,
            description,
            location,
            price,
            imageUrls: images,
            videoUrl: video,
            availableFrom,
            ownerId: req.user.id,
        });
        res.status(201).json({
            message: 'House listing created successfully',
            house,
        });
    } catch (error) {
        console.error('Error creating house listing:', error);
        res.status(500).json({ message: 'Error creating house listing' });
    }
});

// Route for landlord to view their houses

router.get('/my-houses', ensureAuthenticated, ensureLandlord, async (req, res) => {
    try {
        const houses = await House.findAll({
            where: { ownerId: req.user.id },
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({ houses });
    } catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({ message: 'Error fetching houses' });
    }
});

// Route for renter to view all houses

router.get('/house-listings', ensureAuthenticated, async (req, res) => {
    try {
        const houses = await House.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({ houses });
    } catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({ message: 'Error fetching houses' });
    }
});

// Route for renter to view a single house

router.get('/house/:id', ensureAuthenticated, async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.status(200).json({ house });
    } catch (error) {
        console.error('Error fetching house:', error);
        res.status(500).json({ message: 'Error fetching house' });
    }
});

module.exports = router;