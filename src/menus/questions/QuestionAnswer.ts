import { Question } from "./Question";

export class QuestionAnswer {

    question: Question;
    answer: any;

    constructor(question: Question, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    getAnswer(): any {
        return this.answer;
    }

}