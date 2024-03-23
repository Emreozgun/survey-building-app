import { Routes } from '@interfaces/routes.interface';
import { FastifyInstance, RouteOptions } from 'fastify';
import FormController from "@components/form/form.controller";
import {
  CreateFormSchema,
  DeleteFormSchema,
  FormQuestionsSchema,
  SubmissionsSchema,
  SubmitFormSchema
} from "@components/form/form.schema";
import {DeleteQuestionSchema, InsertQuestionSchema} from "@components/form/question/question.schema";


class FormRoute implements Routes {
  public path = '/form';

  public formController = new FormController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {

    // create form without questions is optional, supported question type short text or number
    fastify.route({
      method: 'post',
      url: `${this.path}`,
      schema: CreateFormSchema,
      config: {roles: ['admin']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.createForm
    } as RouteOptions);


    fastify.route({
      method: 'delete',
      url: `${this.path}/:formId`,
      schema: DeleteFormSchema,
      config: {roles: ['admin']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.deleteForm
    } as RouteOptions);

    // add question to form, only admin can add question
    fastify.route({
      method: 'post',
      url: `${this.path}/:formId/question`,
      schema: InsertQuestionSchema,
      config: {roles: ['admin']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.insertQuestion
    } as RouteOptions);

    // delete question to form, only admin can add question
    fastify.route({
      method: 'delete',
      url: `${this.path}/question/:questionId`,
      schema: DeleteQuestionSchema,
      config: {roles: ['admin']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.deleteQuestion
    } as RouteOptions);


    // submit response to form, should be able to submit one time only
    fastify.route({
      method: 'post',
      url: `${this.path}/:formId/submit`,
      schema: SubmitFormSchema,
      config: {roles: ['admin', 'user']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.submitForm
    } as RouteOptions);

    fastify.route({
      method: 'get',
      url: `${this.path}/:formId/question`,
      schema: FormQuestionsSchema,
      config: {roles: ['admin', 'user']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.getFormQuestions
    } as RouteOptions);

    fastify.route({
      method: 'get',
      url: `${this.path}/:formId/questions/submissions`,
      schema: SubmissionsSchema,
      config: {roles: ['admin']},
      preHandler: fastify.authenticateUser,
      handler: this.formController.findAllSubmissions
    } as RouteOptions);

    done();
  }
}


export default FormRoute;
