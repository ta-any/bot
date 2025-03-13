const models = require('../services/models')
const repo = require('../repositories/bd')

class Model {
    async createModel(req, res) {
        try {
            if(req.body){
                const info = req.body
                console.log('createModel info for record: ', info)
                if(await models.checkData(info)){
                    res.status(201).json({ message: 'Create Nmodel successfully' });
                } else {
                    res.status(400).json({ msg: "No correct data!", error: error.message });
                }
            } else {
                res.status(400).json({ msg: "Not data" });
            }

        } catch (error) {
            res.status(400).json({  msg: "Error" });
        }
    }
    async delete(req, res){
        try {
            if(req.body.id){
                console.log('delete: ', req.body.id)
                if(!await repo.isModel(req.body.id)){
                    return res.status(400).json({ message: 'Некорректный ID' });
                }

                const deleted = await repo.findByIdAndDelete(req.body.id);
                if(!deleted) res.status(404).json({ message: 'Элемент не найден' });
                console.log(111)

            } else {
                return res.status(404).json({ message: 'Элемент не найден' });
            }

            res.status(200).json({ message: 'Элемент успешно удален'});
        } catch (error) {
            console.error('Ошибка при удалении элемента:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async changeModel(req, res){
        try {
            const itemId = req.params.id;
            const updateData = req.body;
            if(itemId && updateData){
                console.log('update : ',updateData)
                if(!await repo.isModel(itemId)){
                    return res.status(400).json({ message: 'Некорректный ID' });
                }


                res.status(200).json({ message: 'Элемент успешно change'});
            } else {
                return res.status(404).json({ message: 'Элемент не найден' });
            }


        } catch (error) {
            console.error('Ошибка при change элемента:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new Model();