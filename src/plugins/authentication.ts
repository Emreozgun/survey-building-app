import {FastifyInstance, FastifyRequest} from 'fastify';
import {fastifyPlugin} from 'fastify-plugin';
import {Unauthorized} from '@exceptions/error';
import jwt from "jsonwebtoken";
import {TokenData} from "@components/token/token.interface";

export const authentication = fastifyPlugin((fastify: FastifyInstance, _: unknown, done: () => void) => {
  const authPreHandler = async (request: FastifyRequest) => {
    // TODO: resolve typescript error
    const routeRoles = request.routeConfig?.roles;

    const authorization = request.headers.authorization || '';
    console.log({Authorization: authorization});
    const payload = jwt.verify(authorization, process.env.JWT_SECRET as string) as TokenData;
    console.log(!payload.userId);
    console.log(!routeRoles.includes(payload.role));
    if(!payload.userId)
      throw new Unauthorized('Unauthorized access');
    else if(!routeRoles.includes(payload.role))
      throw new Unauthorized('You do not have permission to access this resource');
  };
  fastify.decorate('authenticateUser', authPreHandler);
  done();
});
