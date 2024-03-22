import {Static} from '@fastify/type-provider-typebox';
import {TokenCreateData} from "@components/token/token.schema";


export type TokenData = Static<typeof TokenCreateData>;
