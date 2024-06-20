const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'PIII- test',
    description: 'Aplicacion inicial de backend',
  },
  host: 'localhost:' + process.env.PORT,
  schemes: ['http'],
  definitions: {
    User: {
      firstname: 'Juan',
      lastname: 'Perez',
      email: 'juanperez@ejemplo.com',
      domicilio: 'Calle 123',
      celular: '1234567890',
      documento: 'AB123456',
      rol: 'admin',
      area: 'desarrollo',
      tasks: ['60d0fe4f5311236168a109ca']
    },
    Task: {
      name: 'Task Name',
      description: 'Task Description',
      resume: 'Task Resume',
      domicilio: '123 Task St',
      user: '60d0fe4f5311236168a109ca'
    }
  }
};

const outputFile = '../../swagger-output.json';
const endpointsFiles = [
  'src/modules/user/user.routes.js',
  'src/modules/task/task.routes.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../../index.js'); // Your project's root file
});

//Swagger Sergio
/*
const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()
const doc = {
  
  info: {
    title: 'PIII- test',
    description: 'Aplicacion inicial de backend',
  },
   host: 'localhost:'+process.env.PORT
};

const outputFile = '../../swagger-output.json';
const routes = [
  

  "src/modules/user/user.routes.js",
  "src/modules/task/task.routes.js"
];

swaggerAutogen(outputFile, routes, doc);
*/