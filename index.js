import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRoutes from './src/routes/auth.route.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT_SERVER || 3000;

const app = express();
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication Server',
      version: '1.0.0',
      description: 'Dokumentasi API Authentication Server SchoolTech Indonesia',
    },
    servers: [
      {
        url: 'http://localhost:'.concat(PORT),
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path file dengan komentar JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

export default app ;
