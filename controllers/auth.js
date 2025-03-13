const verification = require('../services/verification');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await verification.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();