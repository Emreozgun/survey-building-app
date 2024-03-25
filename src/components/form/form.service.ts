import prisma from '@utils/prisma';
import {CreateForm} from "@components/form/form.interface";
import AnswerService from "@components/form/answer/answer.service";
import QuestionService from "@components/form/question/question.service";
import {Question} from "@prisma/client";
import {QuestionForm} from "@components/form/question/question.interface";
import {AnswerForm} from "@components/form/answer/answer.interface";

class FormService {
  public db = prisma;

  public answerService = new AnswerService()
  public questionService = new QuestionService()

  public async createForm(createForm: CreateForm, creatorId: string) {
    console.log({id: creatorId, createForm: createForm})
    try {
      // TODO: make it transaction
      const form = await this.db.form.create({
        data: {
          title: createForm.title,
          description: createForm.description,
          creatorId: creatorId,
          // TODO: Above defination could not be true. Check it
          // creatorId: creatorId,
        },
        select: {
          id: true
        }
      });

      if(!form.id)
        throw Error('Form is not created successfully!');

      await this.questionService.insertMany(createForm.questions as QuestionForm[], form.id);

      return form;

    } catch (e) {
      throw Error(e as string);
    }
  }

  public async deleteForm(formId: string) {
    try {
      const [questions, form ] = await this.db.$transaction([
        this.db.question.deleteMany({
          where: { formId },
        }),
        this.db.form.delete({
          where: { id: formId },
        }),
      ]);
    } catch (e) {
      console.log({e});
      throw Error(e as string);
    }

  }

  public async insertQuestion(formId: string, questionForm: QuestionForm) {
      return await this.questionService.create(formId, questionForm);
  }

  public async deleteQuestion(questionId: string) {
    try {
      await this.questionService.delete(questionId)
    } catch (e) {
      console.log({e});
    }

  }

  public async submitForm(userId: string, formId: string, answers: AnswerForm[]) {
    try {

      const questionIds= answers.map((answer) => answer.questionId);

      const questions= await this.questionService.getQuestionsByFormId(formId);
      const formQuestionIds = questions.map((question) => question.id);
      const missingQuestionIds = formQuestionIds.filter(questionId => !questionIds.includes(questionId));

      if (missingQuestionIds.length > 0) {
        throw new Error('User did not answer all questions in the form');
      }

      await this.answerService.insertMany(userId, formId, answers);
    } catch (e) {
      console.log({e});
    }

  }

  public async getFormQuestions(formId: string) {
    return this.questionService.getQuestionsByFormId(formId);
  }

  public async getSubmissionsWithQuestions(formId: string) {

    const formWithQuestionsAndSubmissions = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        questions: true,
        answers: true,
      },
    });
    return formWithQuestionsAndSubmissions;
  }

}

export default FormService;
