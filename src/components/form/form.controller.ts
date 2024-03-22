import { FastifyRequest } from 'fastify';
import FormService from "@components/form/form.service";
import {CreateForm} from "@components/form/form.interface";

class FormController {
  public formService = new FormService();

  public createForm = async (req: FastifyRequest<{ Body: CreateForm }>) => {
    // const { NO_IMPLEMENTED } = req.body;

    // const data = await this.formService.createForm({ NO_IMPLEMENTED });

    // return { data, message: 'form created' };
  };
}

export default FormController;
