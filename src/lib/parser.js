'use strict';

const url = require('url');
const queryString = require('querystring');
const logger = require('./logger');

const requestParser = module.exports = {};

/**
 * Request parser WILL parse the bodies of POST and PUT requests.
 * @param request
 * @returns {Promise<any>}
 */

requestParser.parseAsync = (request) => {
  //! development note: This request will be a RAW NODE HTTP Request
  //!   this function returns a new promise so that I can do
  //!   parse(...).then() in a different file.
  return new Promise((resolve, reject) => {
    logger.log(logger.INFO, `Original URL: ${request.url}`);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request); //! Vinicio - resolving the promise
    }
    let completeBody = '';
    request.on('data', (buffer) => {
      completeBody += buffer.toString();
    });
    request.on('end', () => {
      try {
        //! development note: for now, we are going to assume the body is ALWAYS going to be JSON.
        request.body = JSON.parse(completeBody);

        console.log(request);
        return resolve(request);
      } catch (error) {
        //! development note: we reject here because when we return a new promise,
        //!   we MUST to to call EITHER reject or resolve.
        return reject(error);
      }
    });
    return undefined;
  });
};
