# basic http server - app.js
##### create a basic http server with get/post handling and cowsay.
[![Build Status](https://travis-ci.com/bgwest/07-http-server.svg?branch=master)](https://travis-ci.com/bgwest/07-http-server)
## Overview

For this assignment you will be building a HTTP server with a:
* Body Parser Module
* URL Parser Module
* Server Module

The server should export an object with start and stop methods. 

The start and stop methods should each return a promise that resolves on success and rejects on error.

##### GET /
- When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.

##### POST /api/cowsay

When a client makes a POST request to /api/cowsay it should send JSON that includes {"text": "<message>"}. 

The server should respond with a JSON body {"content": "<cowsay cow>"}.


### Prerequisites

See package.json for details on what is being installed.

#### How to run

Example:
```
npm run start-server
````

### Tests Performed with Jest
- Not required for this project but will be for future projects (also why travis build fails currently).

### Installing

To use this in your code:

- git clone repo 
- npm install 
- require('../src/lib/app.js')

## Built With

* es6
* Eslint
* jest

## Contributing

Please feel free to contribute. Master branch auto merge locked for approval for non-contributors.

## Versioning

*n/a*

## Authors

![CF](http://i.imgur.com/7v5ASc8.png) **Benjamin West** 

## License

*none*
