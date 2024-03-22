import {Type} from '@fastify/type-provider-typebox';
import {FastifySchema} from 'fastify';
import {ERROR400, ERROR401, ERROR404, ERROR409, ERROR500, responseProperty} from '@constants/constants';

export const CreateFormBody = Type.Object({

});
// TODO: Check all error codes and messages
export const CreateFormSchema: FastifySchema = {
  description: 'Create form api',
  tags: ['form'],
  body: CreateFormBody,
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
  }
};
