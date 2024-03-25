import Fastify, { FastifyError, FastifyInstance } from 'fastify';
import ajvErrors from 'ajv-errors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';

import { initializeRoutes } from '@plugins/initializeRoute';
import { authentication } from '@plugins/authentication';
import { initSwagger } from '@plugins/swagger';

import { schemaErrorFormatter } from '@utils/schemaErrorFormatter';

import { schema } from '@utils/validateEnv';
import * as process from "process";

class App {
  public app: FastifyInstance;

  public env: string;

  public port: number;

  constructor() {
    this.app = Fastify({
      schemaErrorFormatter,
      ajv: {
        customOptions: {
          coerceTypes: false,
          allErrors: true
        },
        plugins: [ajvErrors]
      },
      logger: true
    }).withTypeProvider<TypeBoxTypeProvider>();

    this.env = process.env.NODE_ENV ?? 'development';
    this.port = Number(process.env.PORT) ?? 3001;

    this.init();
  }

  public async listen() {
    try {
      await this.app.listen({ port: this.port });
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  public getServer() {
    return this.app;
  }

  private init() {
    this.initializePlugins();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializePlugins() {
    this.app.register(fastifyEnv, { dotenv: true, schema });
    this.app.register(fastifyCors, { origin: process.env.ORIGIN, credentials: process.env.CREDENTIALS === 'true' });
    this.app.register(fastifyHelmet);
    this.app.register(fastifyCompress);
    this.app.register(fastifyJwt, { secret: process.env.JWT_SECRET ?? '' });
    this.app.register(authentication);
    this.app.register(initSwagger);
  }

  private initializeRoutes() {
    this.app.register(initializeRoutes, { prefix: `api/${process.env.API_VERSION}` });
  }

  private initializeErrorHandling() {
    this.app.setErrorHandler((error: FastifyError, request, reply) => {
      const status: number = error.statusCode ?? 500;
      const message: string = status === 500 ? 'Something went wrong' : error.message ?? 'Something went wrong';

      this.app.log.error(`[${request.method}] ${request.url} >> StatusCode:: ${status}, Message:: ${message}`);

      return reply.status(status).send({ error: true, message });
    });
  }
}

export default App;
