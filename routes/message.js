const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { ensureAuthenticated } = require('../middleware/check-auth');
const { Op } = require('sequelize');

// Route for sending a message
router.post('/send', ensureAuthenticated, async (req, res) => {
    const { receiverId, houseId, content } = req.body;
    if (!receiverId || !houseId || !content) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const message = await Message.create({
            senderId: req.user.id,
            receiverId,
            houseId,
            content,
        });
        res.status(201).json({ message: 'Message sent', message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

// Route for fetching messages between landlord and renter
router.get('/conversation/:houseId', ensureAuthenticated, async (req, res) => {
    const { houseId } = req.params;

    if (!houseId || isNaN(parseInt(houseId, 10))) {
        return res.status(400).json({ error: 'Invalid houseId' });
      }

    try {
        const messages = await Message.findAll({
            where: {
                houseId,
                [Op.or]: [
                    { senderId: req.user.id },
                    { receiverId: req.user.id },
                ],
            },
            order: [['timestamp', 'ASC']],
        });
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

module.exports = router;