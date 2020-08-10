const Discord = require('discord.js');
const fs = require('fs');
function doMagic8BallVoodoo() {
    var rand = ['Nep nep!', 'Nep!'];

    return rand[Math.floor(Math.random()*rand.length)];
}

module.exports.run = async(client, msg, args) => {
    var finalString = '';
    var user = msg.author;
    var question = args.join(" ");
    if (question != "") {
        const embed = new Discord.MessageEmbed()
        .addField('Neptune\'s 8ball', `Your question is: \`\`${question}\`\`\n Neptune's answer is: **${doMagic8BallVoodoo()}**`)
        .setImage('https://static-cdn.jtvnw.net/emoticons/v1/188759/3.0')
        .setFooter(`°˖✧◝(⁰▿⁰)◜✧˖°`)
        .setColor('#5d5ddf')
        msg.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .addField('Error', `Define a question`)
        .setColor('#5d5ddf')
        msg.channel.send(embed)
    }
}

module.exports.config = {
    command: "8ball"
}