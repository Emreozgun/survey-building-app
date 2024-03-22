import { FastifyInstance, RouteOptions } from 'fastify';

/**
 * Interface representing routes.
 * @interface
 */
export interface Routes {
  path: string;

  /**
   * Initializes the routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {RouteOptions} opts - Route options.
   * @param {Function} done - Callback function to signal completion.
   * @returns {void}
   */
  initializeRoutes: (fastify: FastifyInstance, opts: RouteOptions, done: () => void) => void;
}
