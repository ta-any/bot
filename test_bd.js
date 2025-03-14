// const test = require("./controllers/auth");
//
// // console.log(test.register('my_Name', 'oiuy1'))
// console.log(test.register({  "username": "john_doe",
//     "password": "password123"}))


const unirest = require('unirest');

function start(token){
    const req = unirest('GET', 'https://api.gen-api.ru/api/v1/networks/deepseek-r1')
        .headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        })
        .send(JSON.stringify({
            "callback_url": null,
            "messages": [
                {
                    "role": "user",
                    "content": "Подумай как мне увеличить свою производительность. Я backend разработчик."
                }
            ]
        })).end(function (response) {
            console.log(response.body);
        });
}

start('sk-bDLqM2N7OhsIAUM9r39JlMksNFlE8pbNL1RiYgbLZWwynVMCflDW9gc0dgvY')
