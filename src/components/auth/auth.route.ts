import { FastifyInstance, RouteOptions } from 'fastify';

import { Routes } from '@interfaces/routes.interface';

import AuthController from '@components/auth/auth.controller';

import { CreateUserSchema } from '@components/user/user.schema';
import { LoginUserSchema } from '@components/auth/auth.schema';

class AuthRoute implements Routes {
  public path = '/auth';

  public authController = new AuthController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
    // TODO: move register from user route, wrong in swagger doc
    fastify.route({
      method: 'post',
      url: `${this.path}/register`,
      schema: CreateUserSchema,
      handler: this.authController.register
    });

    fastify.route({
      method: 'post',
      url: `${this.path}/login`,
      schema: LoginUserSchema,
      handler: this.authController.login
    });
    done();
  }
}

export default AuthRoute;
