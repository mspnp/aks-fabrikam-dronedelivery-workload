import path from 'path';
import  swaggerJSDoc from 'swagger-jsdoc';

// Create a __dirname equivalent
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
	  title: "fabrikam-drone-delivery-package-service",
	  description: "Fabrikam Drone Delivery Package Service",
	  version: "0.1.0",
	  termsOfService: ''
	},
    basePath: '/api',
    "schemes": [
      "http",
      "https"
    ],
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ]
  },
  apis: [path.join(__dirname, '../controllers/package-controllers.{ts,js}')],
};

export const PackageServiceSwaggerApi = swaggerJSDoc(options);
