import { DMChannel, NewsChannel, TextChannel, Message, MessageCollector, User, Collection } from "discord.js";
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

    askQuestion(channel: TextChannel | NewsChannel | DMChannel, user: User, question: Question): Promise<void> {
        return new Promise(async resolve => {
            const message: Message = await channel.send(question.getMessage());
            const collector: MessageCollector = channel.createMessageCollector((m: Message) => m.author.id === user.id, { max: 1, time: 60000 });
            collector.once("end", (msges: Collection<string, Message>) => {
                const m = msges.first();
                if (m === undefined) return;
                const answer = question.args && question.args.length > 0 ? question.parse(m.content, ...question.args) : question.parse(m.content);
                if (answer === undefined) {
                    const temp = question;
                    temp.style.setColor("#ff0000");
                    temp.style.setTitle(`Try again: ${temp.style.title}`)
                    resolve(this.askQuestion(channel, user, temp));
                } else {
                    this.answers.set(question.identifier, new QuestionAnswer(question, answer));
                    resolve();
                }

            })
        });
    }

    ask(channel: TextChannel | NewsChannel | DMChannel, user: User, index: number): Promise<void> {
        return new Promise(resolve => resolve(this.askQuestion(channel, user, this.questions[index])));
    }

    execute(channel: TextChannel | NewsChannel | DMChannel, user: User): Promise<void> {
        return new Promise(async resolve => {
            for (let i = 0; i < this.questions.length; i++)
                await this.ask(channel, user, i);
            resolve();
        });
    }

}