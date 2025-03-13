const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('../repositories/bd');
const config = require('../config').secret();

class UserService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    return repo.createUser(username, hashedPassword);
  }
  async login(username, password) {
    const user = await repo.findByUsername(username);
    console.log("USER FROM BD: ", user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: '24h' })
    const id = user.id
    console.log("ID USER: ", id)
    const save = await repo.saveTocken(id, token)
    return token;
  }
  async replenishBalance(price, user){
    console.log(price, user)
    const record = await repo.replenishBalance(price, user);
  }
  async setOff(price, user){
    await repo.setOff(price, user);
  }
  async checkBalance(id){
    return await repo.checkBalance(id)
  }

  async requestModel(){

  }
}

module.exports = new UserService();