const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/api/register', async (req, res) => {
    try {
        const { teamName, teamEmail, track, members } = req.body;

        // Save registration to database
        // ... database code here ...

        // Send confirmation email
        const mailOptions = {
            from: '"Gen AI Builders PH" <noreply@genaibuilders.ph>',
            to: teamEmail,
            subject: 'Welcome to Gen AI Builders PH Hackathon!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to Gen AI Builders PH Hackathon!</h2>
                    
                    <p>Dear ${teamName},</p>
                    
                    <p>Thank you for registering for the Gen AI Builders PH Hackathon! Your registration has been successfully received.</p>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3>Registration Details:</h3>
                        <p><strong>Team Name:</strong> ${teamName}</p>
                        <p><strong>Track:</strong> ${track}</p>
                        <p><strong>Number of Members:</strong> ${members.length}</p>
                    </div>

                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Join our Discord community</li>
                        <li>Complete your team profile</li>
                        <li>Review the hackathon guidelines</li>
                        <li>Start brainstorming your project</li>
                    </ol>

                    <p>Important dates and deadlines will be communicated through email and our Discord channel.</p>

                    <p>If you have any questions, please don't hesitate to reach out to our support team.</p>

                    <p>Best regards,<br>Gen AI Builders PH Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

module.exports = router; 