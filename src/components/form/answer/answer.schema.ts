import {Type} from '@fastify/type-provider-typebox';

export const CreateAnswerBody = Type.Object({
  content: Type.String(),
  userId: Type.String(),
  formId: Type.String(),
  questionId: Type.String(),
});
