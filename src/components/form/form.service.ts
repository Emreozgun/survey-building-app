import prisma from '@utils/prisma';
import {CreateForm} from "@components/form/form.interface";

class FormService {
  public db = prisma;

  public async createForm(createForm: CreateForm) {
    // const form = await this.db.user.create({
    //   data: {
    //     // NO_IMPLEMENTED
    //   },
    //   select: {
    //     // NO_IMPLEMENTED
    //   }
    // });
    //
    // return form;
  }
}

export default FormService;
