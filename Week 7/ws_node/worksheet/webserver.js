const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url, true);
        if(parsedUrl.pathname === '/add') {
            response.setHeader("Content-Type", "text/plain");
            let num1 = Number.parseFloat(parsedUrl.query.a);
            let num2= Number.parseFloat(parsedUrl.query.b);
            response.end(`$('a+b')`);
        } else {
            response.statusCode = 404;
            response.end('Not found!\n');
        }
    }
);
server.listen(8080);