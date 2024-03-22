import { Routes } from '@interfaces/routes.interface';
import { FastifyInstance, RouteOptions } from 'fastify';
import FormController from "@components/form/form.controller";
import {CreateFormSchema} from "@components/form/form.schema";


class FormRoute implements Routes {
  public path = '/form';

  public formController = new FormController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {

    // create form without questions is optional, supported question type short text or number
    fastify.route({
      method: 'post',
      url: `${this.path}`,
      schema: CreateFormSchema,

      preHandler: fastify.authenticateUser,
      handler: this.formController.createForm
    } as RouteOptions);

    // add question to form, only admin can add question
    // delete question to form, only admin can add question

    // route for delete form, all data should be deleted from db

    // get form by id with all questions and submissions for admin
    // Could be merged below and above desc.
    // get form by id with only questions for user

    // submit response to form, should be able to submit one time only


    done();
  }
}


export default FormRoute;
