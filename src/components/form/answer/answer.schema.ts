import {Type} from '@fastify/type-provider-typebox';

export const CreateAnswerBody = Type.Object({
  content: Type.String(),
  questionId: Type.String(),
});
