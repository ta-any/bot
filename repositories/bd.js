const pool = require('../config/mysql');
const User = require('../domain/User');

class UserRepository {
  async findByUsername(username) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  async createUser(username, password, role = 'user') {
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    return new User({ id: result.insertId, username, password, role });
  }
}

module.exports = new UserRepository();