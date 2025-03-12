const auth = require('../services/verification');

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      await auth.register(username, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await auth.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();