import {FastifyRequest} from 'fastify';
import FormService from "@components/form/form.service";
import {CreateForm} from "@components/form/form.interface";
import {QuestionForm} from "@components/form/question/question.interface";
import {AnswerForm} from "@components/form/answer/answer.interface";

class FormController {
  public formService = new FormService();

  public createForm = async (req: FastifyRequest<{ Body: CreateForm }>) => {
    const {userId} = req.user;
    // console.log(req.body, req.user)
    const data = await this.formService.createForm(req.body, userId);

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

  public submitForm = async (req: FastifyRequest<{ Params: { formId: string },  Body: AnswerForm[]  }>) => {
    const {userId} = req.user;
    const {formId} = req.params;

    const data = await this.formService.submitForm(userId, formId, req.body);

    return { data, message: 'Form is submitted!'};
  };


  public getAnswersByFormQuestions = async (req: FastifyRequest<{ Params: { formId: string } }>) => {
    const {userId} = req.user;
    const {formId} = req.params;

    return {message: 'Question and answers'};
  };

  public findAllSubmittedAnswers = async (req: FastifyRequest<{ Params: { formId: string } }>) => {
    const {formId} = req.params;
    // fetch questions and all submitted answers
    return {message: 'Question and answers'};
  };

}

export default FormController;
