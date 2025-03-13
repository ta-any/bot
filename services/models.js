const repo = require('../repositories/bd');
const config = require('../config').secret();

class NModule{
    async getPriceModel(id){
        console.log(id)
        const result = await repo.getPriceModel(id);
        console.log(result)
        return result[0].price

    }
}
module.exports = new NModule();