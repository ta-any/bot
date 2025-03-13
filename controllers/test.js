const repo = require('../repositories/bd');
const config = require('../config').secret();
const jwt = require("jsonwebtoken");

class NModule {
    async testTocken(req, res){
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log(decoded)

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Invalid token.' });
        }
    }
}

module.exports = new NModule();