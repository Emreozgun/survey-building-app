import {FastifyRequest} from 'fastify';
import FormService from "@components/form/form.service";
import {CreateForm} from "@components/form/form.interface";
import {QuestionForm} from "@components/form/question/question.interface";

class FormController {
  public formService = new FormService();

  public createForm = async (req: FastifyRequest<{ Body: CreateForm }>) => {
    // console.log(req.body, req.user)
    const data = await this.formService.createForm(req.body, req.user?.userId);

    return { data, message: 'form created' };
  };

  public deleteForm = async (req: FastifyRequest<{ Params: { formId: string } }>) => {
    const { formId } = req.params;
    const data = await this.formService.deleteForm(formId);

    return { data, message: 'form deleted' };
  };

  public insertQuestion = async (req: FastifyRequest<{ Params: { formId: string }, Body: QuestionForm }>) => {
    const { formId } = req.params;

    const data = await this.formService.insertQuestion(formId, req.body);

    return { data, message: 'Question added to form!' };
  };

  public deleteQuestion = async (req: FastifyRequest<{ Params: { questionId: string } }>) => {
    const { questionId } = req.params;
    const data = await this.formService.deleteQuestion(questionId);

    return { data, message: 'Question deleted from form!'};
  };

  public submitForm = async (req: FastifyRequest) => {
    return { message: 'Form is submitted!'};
  };

}

export default FormController;
