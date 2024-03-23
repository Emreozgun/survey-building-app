import {Type} from '@fastify/type-provider-typebox';
import {FastifySchema} from 'fastify';
import {ERROR400, ERROR404, ERROR409, ERROR500, responseProperty} from '@constants/constants';
import {CreateQuestionBody} from "@components/form/question/question.schema";
import {CreateAnswerBody} from "@components/form/answer/answer.schema";

export const CreateFormBody = Type.Object({
  title: Type.String(),
  description: Type.String(),
  questions: Type.Optional(Type.Array(CreateQuestionBody, {minItems: 1})),
});
// TODO: Check all error codes and messages
export const CreateFormSchema: FastifySchema = {
  description: 'Create form api',
  tags: ['form'],
  body: CreateFormBody,
  security: [{ bearerAuth: [] }],
  response: {
    201: {
      description: 'Successful create response',
      type: 'object',
      properties: {
        ...responseProperty,
        data: { type: 'object', properties: { email: { type: 'string' } } }
      }
    },
    400: ERROR400,
    409: ERROR409,
    500: ERROR500
  },
};


export const DeleteFormSchema: FastifySchema = {
  description: 'Delete form API',
  tags: ['form'],
  params: {
    type: 'object',
    properties: {
      formId: { type: 'string', description: 'ID of the form to be deleted' }
    },
    required: ['formId']
  },
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: 'Successful delete response',
      type: 'object',
      properties: {
        ...responseProperty,
        message: { type: 'string', description: 'Message indicating successful deletion' }
      }
    },
    404: ERROR404,
    500: ERROR500
  },
};


export const SubmitFormSchema: FastifySchema = {
  description: 'Submit form answers API',
  tags: ['form'],
  params: {
    type: 'object',
    properties: {
      formId: { type: 'string', description: 'ID of the form to be deleted' }
    },
    required: ['formId']
  },
  body: {
    type: 'array',
    items: CreateAnswerBody,
  },
  security: [{ bearerAuth: [] }],
  response: {
    201: {
      description: 'Successful submission response',
      type: 'object',
      properties: {
        ...responseProperty,
        data: { type: 'object', properties: { } }
      }
    },
    400: ERROR400,
    409: ERROR409,
    500: ERROR500
  },
};


