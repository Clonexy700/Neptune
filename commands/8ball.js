const Discord = require('discord.js');
const fs = require('fs');
function doMagic8BallVoodoo() {
    var rand = ['Nep nep!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nepu, nepu!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'NEP NEP NEP NEP NEP', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'Nep nep!','Nep nep!', 'Nep!', 'Nep!', 'Nep nep!', 'Oh my how lewd!'];
    return rand[Math.floor(Math.random()*rand.length)];
}

function doMagicTrickyNeptunesImages() {
    var rand = ['https://static-cdn.jtvnw.net/emoticons/v1/188759/3.0', 'https://static-cdn.jtvnw.net/emoticons/v1/180950/3.0', 'https://static-cdn.jtvnw.net/emoticons/v1/180949/3.0', 'https://static-cdn.jtvnw.net/emoticons/v1/180945/3.0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSINAGdLhnlcU4mNRlR0kbmiNYq7tINZQT05g&usqp=CAU', 'https://emoji.gg/assets/emoji/NepOkay.png'];

    return rand[Math.floor(Math.random()*rand.length)];
}

module.exports.run = async(client, msg, args) => {
    var finalString = '';
    var user = msg.author;
    var question = args.join(" ");
    var easter_egg = '';
    if (question.indexOf("Clonexy700") !== -1) {
        var easter_egg = 'Clonexy700 is baka!';
    }
    if (question != "") {
        const embed = new Discord.MessageEmbed()
        .addField('Neptune\'s 8ball', `Your question is: \`\`${question}\`\`\n Neptune's answer is: **${doMagic8BallVoodoo()}** ${easter_egg}`)
        .setImage(doMagicTrickyNeptunesImages())
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