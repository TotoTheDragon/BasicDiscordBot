import { WrappedClient } from "../client";
import { Question } from "../menus/questions/Question";
import { QuestionHolder } from "../menus/questions/QuestionHolder";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { EmbedStyle } from "../objects/EmbedStyle";
import { getInfoEmbed } from "../util/EmbedUtil";
import { KeywordArgument } from "../objects/commands/arguments/KeywordArgument";
import { ChannelArgument } from "../objects/commands/arguments/ChannelArgument";
import { UserArgument } from "../objects/commands/arguments/UserArgument";
import { RoleArgument } from "../objects/commands/arguments/RoleArgument";

export class Test extends Command {
    label = "test";
    description = "A test command for developers";
    category = "Developer";
    defaultLevel = 100;
    allowInDM = true;

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const question1 = new Question(
            1,
            "What database would you like to use?",
            new KeywordArgument().addKeyword("MySQL").addKeyword("SQLite").addKeyword("MongoDB", "mongo").setMatchCase(false).parse,
            new EmbedStyle().setColor("#444444").setTitle("Question 1").setDescription("%question%\nPossible options: MySQL, SQLite, MongoDB")
        );

        const question2 = new Question(
            2,
            "What channel would you like to have used for logs?",
            new ChannelArgument().parseToTag,
            new EmbedStyle().setColor("#444444").setTitle("Question 2").setDescription("%question%\n"),
            undefined,
            info.guild.id
        );

        const question3 = new Question(
            3,
            "Who would you like to be an administrator?",
            new UserArgument().parseToTag,
            new EmbedStyle().setColor("#444444").setTitle("Question 3").setDescription("%question%\n")
        );

        const question4 = new Question(
            4,
            "What role would you like to have all permissions?",
            new RoleArgument().parseToTag,
            new EmbedStyle().setColor("#444444").setTitle("Question 4").setDescription("%question%\n"),
            undefined,
            info.guild.id
        );

        const holder = new QuestionHolder();

        holder.addQuestion(question1).addQuestion(question2).addQuestion(question3).addQuestion(question4);

        await holder.execute(info.channel, info.user);

        const answers: EmbedStyle = getInfoEmbed()
            .setTitle("Your answers");

        holder.questions.forEach(question => answers.addField(question.question, holder.getAnswerByQuestion(question).getAnswer()));

        info.channel.send(answers.getAsEmbed());
    }
}