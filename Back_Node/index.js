const http = require('http');

const server = http.createServer((req, res)=>{
    res.end('we will do it ')
});

server.listen(3000);