const http = require('http');
const app = require("./app");

app.set('port',process.env.PORT || 3000)
const server = http.createServer((req, res)=>{
    res.end('we will do it ')
});

server.listen(3000);