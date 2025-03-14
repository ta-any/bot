const pool = require('../config').pool();
const User = require('../domain/User');

class Repository {
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
  async saveTocken(id, tockenSTR, expiresInHours = 24){
    try {
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');
      const [result] = await pool.execute(
          "INSERT INTO password_tokens (user_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)",
          [id, tockenSTR, createdAt, expiresAt]
      );

      console.log("time save tocken: ", createdAt,'\n', expiresAt)
      return result
    } catch (ERROR) {
      console.log('ERROR: ')
    }
  }
  async getTocken(token){
    try {
      const [result] = await pool.execute(
          "SELECT * FROM password_tokens WHERE token = ?",
          [token]
      );
      return result
    } catch (ERROR) {
      console.log('ERROR getTocken: ')
    }
  }
  async setOff(price, user){
    try {
      console.log("FROM BD setOff: ")
      const [result] = await pool.execute(
          `UPDATE users SET balance = balance - ${price} WHERE id = ${user}`
      );
    } catch (ERROR){
      console.log("FROM BD setOff: ", ERROR)
    }
  }
  async replenishBalance(price, user){
    try {
      console.log("FROM BD replenishBalance: ")
      const [result] = await pool.execute(
          `UPDATE users SET balance = balance + ${price} WHERE id = ${user}`
      );
      return result
    } catch (ERROR) {
      console.log("FROM BD replenishBalance: ", ERROR)
    }
  }
  async checkBalance(id){
    try {
      console.log("FROM BD checkBalance: ")
      const [result] = await pool.execute(
          "SELECT * FROM users WHERE id = ?",
          [id]
      );
      return result
    } catch (ERROR) {
      console.log("FROM BD checkBalance: ", ERROR)
    }
  }
  async getModel(id){
    try {
      console.log("FROM BD getPriceModel: ", id)
      const [result] = await pool.execute(
          "SELECT * FROM models WHERE model_id = ?",
          [id]
      );
      return result
    } catch (ERROR) {
      console.log("FROM BD getPriceModel: ", ERROR)
    }
  }

  async createModel(data){
    try {
      const { model_id, name, price, description, config, token } = data
      const info = await pool.execute(`
        INSERT INTO models (model_id, name, price, description, config, token)
        VALUES (?, ?, ?, ?, ?, ?)`, [model_id, name, price, description, config, token], (error, results, fields) => {
        if (error) throw error;
        console.log('Данные успешно добавлены');
      })
    } catch (ERROR){
      console.log('from createModel: ', ERROR)
    }
  }
  async isModel(id){
    try {
      const info = await pool.execute(`SELECT * FROM models WHERE model_id = ?;`, [id], (error, results, fields) => {
        if (error) throw error;
        console.log('добавлены has');
      })
      console.log('from isModel info: ', info)
      return info[0].length !== 0

    } catch (ERROR){
      console.log('from isModel: ', ERROR)
    }
  }
  async findByIdAndDelete(id){
    try {
      const info = await pool.execute(`DELETE FROM models WHERE model_id = ?`, [id], (error, results, fields) => {
        if (error) throw error;
        console.log('добавлены DELETE');
      })
      console.log('from findByIdAndDelete info: ', info)
      return true

    } catch (ERROR){
      console.log('from isModel: ', ERROR)
    }
  }
  async updateModel(ID, data){
    try {
      const {id, model_id, name, price, description, config, token } = data
      const info = await pool.execute(`UPDATE models
                                          SET model_id = ?, name = ?, price = ?, description = ?, config = ?, token = ?
                                          WHERE id = ?;`, [model_id, name, price, description, config, token, id ],
          (error, results, fields) => {
        if (error) throw error;
        console.log('добавлены CHANGE');
      })
      console.log('from updateModel info: ', info)
      return true

    } catch (ERROR){
      console.log('from updateModel: ', ERROR)
    }
  }
  async getConfigModel(id){
    try {
      const [result] = await pool.execute(
          "SELECT * FROM models WHERE model_id = ?",
          [id], (error, results, fields) => {
            if (error) throw error;
          }
      );
      const obj = result[0]
      console.log('from getConfigModel result: ', obj)
      return [obj.config, obj.token]

    } catch (ERROR){
      console.log('from getConfigModel: ', ERROR)
    }
  }
}

module.exports = new Repository();