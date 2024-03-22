import { Static } from '@fastify/type-provider-typebox';
import {CreateFormBody} from "@components/form/form.schema";

export type CreateForm = Static<typeof CreateFormBody>;
