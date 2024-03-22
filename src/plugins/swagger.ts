import { FastifyInstance } from 'fastify';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { fastifyPlugin } from 'fastify-plugin';

export const initSwagger = fastifyPlugin((fastify: FastifyInstance, _: unknown, done: () => void) => {
  const opts: FastifyDynamicSwaggerOptions = {
    swagger: {
      info: {
        title: 'Survey Building API Documentation',
        description: 'Survey Building API Documentation',
        version: '1.0.0'
      },
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'auth', description: 'Authentication end-points' },
        { name: 'form', description: 'Form end-points' },
      ],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      schemes: ['http'],
      security: []
    }
  };

  fastify.register(fastifySwagger, opts);

  const uiOpts: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    staticCSP: true,
    transformStaticCSP: (header) => header,
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  };

  fastify.register(fastifySwaggerUi, uiOpts);
  done();
});
