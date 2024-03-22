import { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';
import { FastifyPluginOptions } from 'fastify';

import { Routes } from '@interfaces/routes.interface';

import AuthRoute from '@components/auth/auth.route';
import IndexRoute from '@components/default/index.route';
import UserRoute from '@components/user/user.route';
import FormRoute from "@components/form/form.route";
// TODO: create index.ts file to export all routes

export const initializeRoutes: FastifyPluginCallbackTypebox<FastifyPluginOptions> = (server, options, done) => {
  // add the new routes here
  const routes = [new IndexRoute(), new UserRoute(), new AuthRoute(), new FormRoute()];
  routes.forEach((route: Routes) => {
    server.register(route.initializeRoutes.bind(route));
  });
  done();
};
