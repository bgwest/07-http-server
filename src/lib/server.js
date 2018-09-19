'use strict';

const http = require('http');
const cowsay = require('cowsay');
const logger = require('./logger');
const requestHandler = require('./parser');

const app = http.createServer((req, res) => {
  logger.log(logger.INFO, 'Incoming new request.');
  logger.log(logger.INFO, `METHOD: ${req.method}`);
  logger.log(logger.INFO, `ROUTE: ${req.url}`);

  return requestHandler.parseAsync(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url === '/') {
        res.writeHead(200,
          {
            'Content-Type': 'text/html',
            'Path-Received': `${parsedRequest.url}`,
          });
        res.write(`<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>  
            </head>
            <body>
             <header></header>
             <main>
               <p>create a basic http server with get/post handling and cowsay.</p>
             </main>
               <nav><ul> <li><a href="/cowsay">cowsay</a></li></ul></nav>
            </body>
          </html>`);
        logger.log(logger.INFO, 'Responding back with 200 status code and a cowsay moooo.');
        res.end();
        return undefined;
      } if (parsedRequest.method === 'GET' && parsedRequest.url === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<!DOCTYPE html><head></head><body><span style="white-space: pre-line">${cowsay.say({ text: 'grazing in the browser' })}</span></body></html>`);
        console.log(cowsay.say({ text: 'grazing in the browser' }));
        logger.log(logger.INFO, 'Responding back with 200 status code and a cowsay moooo.');
        res.end();
        return undefined;
      } if (parsedRequest.method === 'POST' && parsedRequest.url === '/api/cowsay') {
        res.writeHead(200,
          {
            'Content-Type': 'application/json',
            'Path-Received': `${parsedRequest.url}`,
          });
        res.write(JSON.parse(JSON.stringify('{"content": "<cowsay cow>"}'), 'POST converted to JSON.'));
        // res.write(JSON.stringify({
        //   message: 'The response can be anything as long as we parse it as JSON',
        //   whoIsCute: 'Sir Gregor',
        // }));
        logger.log(logger.INFO, 'Responding back with 200 status code and a JSON document');
        res.end();
        return undefined;
      }
      // prevent server from hanging when it cannot find the sent route
      logger.log(logger.INFO, 'Responding with a 404 Status code : NOT FOUND');
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Not Found');
      res.end();
      return undefined;
    })
    .catch(() => {
      logger.log(logger.INFO, 'Responding back with 400 status code');
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return undefined;
    });
});

const server = module.exports = {};

/**
 * For JSDocs base for future implementation - bgw 09/18/18
 * @param port port where we want to start the server
 * @returns the result of app.listen
 */

server.start = (port) => {
  return app.listen(port, () => {
    logger.log(logger.INFO, `Server is on at PORT: ${port}`);
  });
};

server.stop = () => {
  console.log('stopping server');
  return process.exit(1);
};
