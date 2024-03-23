import { Type } from '@fastify/type-provider-typebox';

export const TokenCreateData = Type.Object({
  userId: Type.String(),
  type: Type.String(),
  role: Type.String(),
  expiresIn: Type.Optional(Type.Number()),
});
