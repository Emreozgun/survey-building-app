import prisma from "../../../utils/prisma";
import {AnswerForm} from "@components/form/answer/answer.interface";
import {Answer} from "@prisma/client";

class AnswerService {
    public db = prisma;
    public async insertMany(userId: string, formId: string, answersData: AnswerForm[]) {
        const userSubmittedAnswers = await this.db.answer.findMany({
            where: {
                userId: userId,
                formId: formId
            }
        });

        if (userSubmittedAnswers.length > 0) {
            throw new Error('User already submitted answers for this form');
        }

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
