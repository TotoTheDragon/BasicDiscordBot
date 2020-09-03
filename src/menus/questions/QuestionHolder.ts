import { DMChannel, NewsChannel, TextChannel, Message, MessageCollector, User } from "discord.js";
import { Question } from "./Question";
import { QuestionAnswer } from "./QuestionAnswer";

export class QuestionHolder {

    questions: Question[];
    answers: Map<number, QuestionAnswer>;

    constructor() {
        this.questions = [];
        this.answers = new Map();
    }

    addQuestion(question: Question): QuestionHolder {
        this.questions.push(question);
        return this;
    }

    getAnswerByQuestion(question: Question): QuestionAnswer {
        return this.getAnswer(question.identifier);
    }

    getAnswer(identifier: number): QuestionAnswer {
        return this.answers.get(identifier);
    }

    ask(channel: TextChannel | NewsChannel | DMChannel, user: User, index: number): Promise<void> {
        return new Promise(async resolve => {
            const question = this.questions[index];
            const message: Message = await channel.send(question.getMessage());
            const collector: MessageCollector = channel.createMessageCollector((m: Message) => m.author.id === user.id, { max: 1, time: 60000 });
            collector.once("collect", (m: Message) => {
                this.answers.set(question.identifier, new QuestionAnswer(question, question.parse(m.content)));
                resolve();
            })
        });
    }

    execute(channel: TextChannel | NewsChannel | DMChannel, user: User): Promise<void> {
        return new Promise(async resolve => {
            for (let i = 0; i < this.questions.length; i++)
                await this.ask(channel, user, i);
            resolve();
        });
    }

}