import { Static } from '@fastify/type-provider-typebox';
import {CreateAnswerBody} from "@components/form/answer/answer.schema";

export type AnswerForm = Static<typeof CreateAnswerBody>;
