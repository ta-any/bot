const repo = require('../repositories/bd');
const NModel = require('../domain/NModel.js')

class NModule{
    async getPriceModel(id){
        console.log(id)
        const result = await repo.getModel(id);
        console.log(result)
        return result[0].price
    }

    /**
     * Рассчитать стоимость за конкретную длину строки, которая разбивается на токены.
     * @return number */
    async calculatePrice(str, id){
        console.log("calculatePrice from: ", id)
        const result = await repo.getModel(id)
        console.log("Before new class NModel: ", result)
        const currentModel = new NModel(result[0]);
        console.log("currentModel: ", currentModel)

        return currentModel.calculatePrice(str, 100)
    }

    async checkData(data){
        console.log("checkData from: ", )

        if(this._checkParam(data)){
            await repo.createModel(data)
            return true
        } else {
            console.log("No correct data!")
            return false
        }
    }

    async collectData(itemId, data){
        const result = await repo.getModel(itemId)
        const current = result[0]
        console.log("current model: ", current)

        for(const key of Object.keys(data)){
            current[key] = data[key]
        }
        console.log("New collect: ", current)

        if(this._checkParam(current)){
            return current
        } else {
            return null
        }


    }
    _checkParam(data){
        for (const key of Object.keys(data)) {
            if (key === 'description') continue;
            const value = data[key];

            if (typeof value !== 'string' && typeof value !== 'number') {
                return false
            }

            if (value === '' || value === null || value === undefined) {
                return false;
            }
        }
        return true
    }
}
module.exports = new NModule();