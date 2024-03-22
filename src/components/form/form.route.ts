import { Routes } from '@interfaces/routes.interface';
import { FastifyInstance, RouteOptions } from 'fastify';
import FormController from "@components/form/form.controller";
import {CreateFormSchema} from "@components/form/form.schema";

class FormRoute implements Routes {
  public path = '/form';

  public formController = new FormController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
    fastify.route({
      method: 'post',
      url: `${this.path}`,
      schema: CreateFormSchema,
      handler: this.formController.createForm
    });
    done();
  }
}

export default FormRoute;
