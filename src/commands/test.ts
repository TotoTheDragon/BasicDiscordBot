import { WrappedClient } from "../client";
import { Question } from "../menus/questions/Question";
import { QuestionHolder } from "../menus/questions/QuestionHolder";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { EmbedStyle } from "../objects/EmbedStyle";
import { getInfoEmbed } from "../util/EmbedUtil";

export class Test extends Command {
    label = "test";
    description = "A test command for developers";
    category = "Developer";
    defaultLevel = 100;
    allowInDM = true;

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const question1 = new Question(1, "What is 1+1", (string) => string, new EmbedStyle().setColor("#444444").setTitle("Question 1").setDescription("%question%"));
        const question2 = new Question(2, "What is 2+2", (string) => string, new EmbedStyle().setColor("#444444").setTitle("Question 2").setDescription("%question%"));
        const question3 = new Question(3, "What is 3+3", (string) => string, new EmbedStyle().setColor("#444444").setTitle("Question 3").setDescription("%question%"));

        const holder = new QuestionHolder();

        holder.addQuestion(question1).addQuestion(question2).addQuestion(question3);

        await holder.execute(info.channel, info.user);

        const answers: EmbedStyle = getInfoEmbed()
            .setTitle("Your answers");

        holder.questions.forEach(question => answers.addField(question.question, holder.getAnswerByQuestion(question).getAnswer()));

        info.channel.send(answers.getAsEmbed());
    }
}