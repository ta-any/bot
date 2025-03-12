const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('../repositories/bd');
const config = require('../config');

class UserService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return repo.createUser(username, hashedPassword);
  }

  async login(username, password) {
    const user = await repo.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
  }
}

module.exports = new UserService();