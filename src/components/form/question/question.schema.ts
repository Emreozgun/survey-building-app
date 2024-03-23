import {Type} from '@fastify/type-provider-typebox';
import {FastifySchema} from "fastify";
import {ERROR400, ERROR401, ERROR409, ERROR500} from "@constants/constants";

export const CreateQuestionBody = Type.Object({
  content: Type.String(),
  label: Type.Optional(Type.String()),
});

export const InsertQuestionSchema: FastifySchema = {
  description: 'Insert question API',
  tags: ['form'],
  body: CreateQuestionBody,
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      formId: { type: 'string', description: 'ID of the form to be deleted' }
    },
    required: ['formId']
  },
  response: {
    201: {
      description: 'Successful insert response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    },
    400: ERROR400,
    401: ERROR401,
    500: ERROR500
  }
};


export const DeleteQuestionSchema: FastifySchema = {
  description: 'Delete question API',
  tags: ['form'],
  params: {
    type: 'object',
    required: ['questionId'],
    properties: {
      questionId: { type: 'string', description: 'ID of the question to be deleted' }
    }
  },
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: 'Successful delete response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    },
    400: ERROR400,
    401: ERROR401,
    500: ERROR500
  }
};
