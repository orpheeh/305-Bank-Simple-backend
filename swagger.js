const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '305 Bank',
    description: 'A bank for secure mobile money epargne for african user'
  },
  host: 'localhost:4000'
};

const outputFile = './swagger-output.json';
const routes1 = ['./app/routes/index.js'];

swaggerAutogen(outputFile, routes1, doc);