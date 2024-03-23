import prisma from "../../../utils/prisma";
import {QuestionForm} from "@components/form/question/question.interface";
import {Question} from "@prisma/client";

class QuestionService {
    public db = prisma;

    public async create(formId: string, questionForm: QuestionForm) {
        try {
            const question: {id: string} = await this.db.question.create({
                data: {
                    content: questionForm.content,
                    label: questionForm.label || '',
                    formId: formId,
                },
                select: {
                    id: true
                }
            });
            return question.id;
        } catch (error) {
            console.log({error})
            throw new Error('Question creation failed.');
        }
    }

    public async getQuestionsByFormId(formId: string) {

        const questions = await this.db.question.findMany({
            where: {
                formId: formId
            }
        });
        return questions;
    }

    public async delete(questionId: string) {
        try {
            const deletedQuestion = await this.db.question.delete({
                where: {
                    id: questionId
                }
            });

            return deletedQuestion;
        } catch (error) {
            throw new Error('Question deletion failed.');
        }
    }
    public async insertMany(questionsData: QuestionForm[], formId: string) {

        const questionsWithFormId = questionsData.map(question => ({
            ...question,
            formId: formId
        }));

        console.log({questionsWithFormId});
        try {
            const questions = await this.db.question.createMany({ data: questionsWithFormId as Question[], skipDuplicates: true} );
        } catch (e) {
            console.log({e})
            throw Error(e as string);
        }

        // if(questions.count !== questionsData.length)

    }

}

export default QuestionService;
