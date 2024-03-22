import { FastifyInstance, RouteOptions } from 'fastify';

import { Routes } from '@interfaces/routes.interface';

import IndexController from '@components/default/index.controller';

class IndexRoute implements Routes {
  public path = '/';

  public indexController = new IndexController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
    fastify.route({
      method: 'GET',
      url: this.path,
      schema: {
        response: {
          200: {
            description: 'Successful response with date time as iso string',
            type: 'string',
            example: '2024-03-21T23:30:22.930Z'
          }
        }
      },
      handler: IndexController.index
    } as RouteOptions);
    done();
  }
}

export default IndexRoute;
