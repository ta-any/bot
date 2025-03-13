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

module.exports = router;

// (req, res)=>{
//     res.json({
//         message: 'Секретная страница!'
//     })