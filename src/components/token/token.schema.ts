import { Type } from '@fastify/type-provider-typebox';
import {envConfig} from "@/config/env";

export const TokenCreateData = Type.Object({
  userId: Type.String(),
  type: Type.String(),
  expiresIn: Type.Optional(Type.Number()),
});

// userId, expires, type, secret = config.jwt.secret,
