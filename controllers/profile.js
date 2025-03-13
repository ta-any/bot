const verification = require('../services/verification');
const models = require('../services/models')
const jwt = require("jsonwebtoken");
const config = require('../config').secret();

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username, password)
            await verification.register(username, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async replenishBalance(req, res){
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log('decoded: ', decoded)
            const { price } = req.body;
            const {userId} = decoded
            await verification.replenishBalance(price, userId)

            res.status(201).json({ message: 'User replenishBalance successfully' });
        } catch (ERROR) {
            res.status(400).json({ error: 'Invalid token.' });
        }
    }
    async checkBalance(req, res){
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log('decoded checkBalance: ', decoded)
            const {userId} = decoded

            const body = await verification.checkBalance(userId)
            res.status(201).json({
                message: 'User replenishBalance successfully',
                price: body[0].balance
            });
        } catch (ERROR){
            res.status(400).json({ error: 'In checkBalance.' });
        }
    }

    async requestModel(req, res){
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        console.log("start requestModel")
        try {
            if(req.body){
                const decoded = jwt.verify(token, config.jwtSecret);
                console.log('decoded checkBalance: ', decoded)
                const {model, body} = req.body
                const user = await verification.checkBalance(decoded.userId)
                const balance = user[0].balance

                if(balance <= 0){
                    res.status(400).json({ error: 'Баланс меньше нуля' });
                } else {
                    const priceModel = Number(await models.getPriceModel(model))
                    const txt = body.msg
                    console.log("Balance: ", balance)
                    console.log('priceModel: ', priceModel)

                    console.log("Text token: ", txt)
                    const cost = await models.calculatePrice(txt, model)

                    console.log("calculatePrice", cost)


                    if(balance < priceModel){
                        res.status(400).json({ error: 'Недостаточно средств.' });
                    } else {
                        console.log('Balance good')
                        // ToDo Запрос в API


                        await verification.setOff(cost, decoded.userId)
                        res.status(201).json({
                            message: 'User replenishBalance successfully'
                        });
                    }
                }
            } else {
                console.log("Body empty!")
                res.status(400).json({ error: 'Body empty!' });
            }

        } catch (ERROR){
            res.status(400).json({ error: 'In requestModel.' });
        }
    }

}

module.exports = new AuthController();