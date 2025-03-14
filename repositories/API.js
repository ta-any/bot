const unirest = require('unirest');

class API {
    async walkTo(url, token, msg){
        return new Promise((resolve, reject) => {
            unirest('GET', url)
                .headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }).send(JSON.stringify({
                "is_sync": false,
                "messages": [
                    {
                        "role": "user",
                        "content": `${msg}`
                    }
                ],
                "model": "deepseek-v3",
                "stream": false,
                "max_tokens": 4096,
                "temperature": 1,
                "top_p": 1
            })).end(function (response) {
                console.log(response.body);
                return resolve(response.body)
            })
        })
    }
}

module.exports = new API();





