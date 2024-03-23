import prisma from "../../../utils/prisma";
import {AnswerForm} from "@components/form/answer/answer.interface";
import {Answer} from "@prisma/client";

class AnswerService {
    public db = prisma;

    public async getAnswersByForm(formId: string) {
        const answers = await this.db.answer.findMany({
            where: {
                formId: formId
            }
        });
        return answers;
    }

    public async getAnswersByUserId(formId: string, userId: string) {
        const answers = await this.db.answer.findMany({
            where: {
                userId: userId,
                formId: formId,
            }
        });
        return answers;
    }

    public async insertMany(userId: string, formId: string, answersData: AnswerForm[]) {

        const dbAnswers= answersData.map(answer => ({
            ...answer,
            formId: formId,
            userId: userId,
        }));

        const insertedAnswers = await this.db.answer.createMany({
            data: dbAnswers as Answer[]
        });
        return insertedAnswers;
    }
}

export default AnswerService;
