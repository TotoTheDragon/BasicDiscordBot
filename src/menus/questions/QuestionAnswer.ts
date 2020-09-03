import { Question } from "./Question";

export class QuestionAnswer {

    question: Question;
    answer: any;

    constructor(question: Question, message: string) {
        this.question = question;
        this.answer = question.parse(message);
    }

    getAnswer(): any {
        return this.answer;
    }

}