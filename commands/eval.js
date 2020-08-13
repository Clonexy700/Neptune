const Discord = require('discord.js');
const beautify = require('beautify')
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    if(msg.author.id !== "314618320093577217") {
        return msg.channel.send("You do not have permission to run this command!")
        .then(m => m.delete({ timeout: 5000}));
    }

    if(!args[0]) {
        msg.channel.send("Please put code to evaluate!")
        .then(m => m.delete({ timeout: 5000}));
    }

    try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }

        const toEval = args.join(" ")
        const evaluated = eval(toEval)

        let embed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle("Eval")
            .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
            .addField("Evaluated:", evaluated)
            .addField("Type of:", typeof(evaluated));

        msg.channel.send(embed);
    } catch (e) {

        let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("\:x: Error!")
            .setDescription(e)
            .setFooter(client.user.username, client.user.displayAvatarURL())

        msg.channel.send(embed);
    }
}
    

module.exports.config = {
    command: "eval"
}