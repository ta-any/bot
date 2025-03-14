const express = require('express');
const router = express.Router()
const auth = require('./controllers/auth.js');
const middleware = require('./middlewares/middlewares.js');
const tst = require('./controllers/test.js');
const profile = require('./controllers/profile.js')
const model = require('./controllers/models')

router.post('/register', profile.register);
router.post('/login', auth.login);
router.get('/secret', tst.testTocken);
router.get('/appendPrice', profile.replenishBalance)
router.get('/checkPrice', profile.checkBalance)
router.post('/requestModel', profile.requestModel)
router.post('/createModel', model.createModel)
router.delete('/deleteModel', model.delete)
router.put('/change/:id', model.changeModel)


router.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const { model, input } = req.query;
    console.log(model)

    // if (!models[model]) {
        res.write('data: Модель не найдена\n\n');
        return res.end();
    // }
    //
    // // Логика генерации данных и отправки их в рамках прошедшего времени
    // const mockGeneratedData = models[model].process(input);
    // res.write(`data: ${mockGeneratedData}\n\n`);
    //
    // // Предполагается, что будут отправляться множественные данные
    // const interval = setInterval(() => {
    //     // Отправка дополнительных данных
    //     res.write(`data: Дополнительный фрагмент ответа\n\n`);
    // }, 3000);
    //
    // // При завершении соединения очистите интервал
    // req.on('close', () => {
    //     clearInterval(interval);
    //     res.end();
    // });
});

module.exports = router;
