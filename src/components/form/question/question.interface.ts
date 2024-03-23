import { Static } from '@fastify/type-provider-typebox';
import {CreateQuestionBody} from "@components/form/question/question.schema";

export type QuestionForm = Static<typeof CreateQuestionBody>;
