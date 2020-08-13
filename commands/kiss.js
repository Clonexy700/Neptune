const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ['https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865', 'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif', 
'https://media.tenor.com/images/02b3ad0fb1d6aa77daeee0ace21d5774/tenor.gif', 'https://media.tenor.com/images/d2fa4d8a14db8b1301efe79146cd64eb/tenor.gif', 'https://media.tenor.com/images/deef386e0d7a367cf3808c3cddc7a3c7/tenor.gif',
'https://media1.tenor.com/images/c263375bf2b35ed931edf05c8694910d/tenor.gif?itemid=15111557', 'https://media.tenor.com/images/ffef2582b705f1e2a5a655393bce6397/tenor.gif', 'https://media.tenor.com/images/8e75574d9a85f2e550ccbef62f291544/tenor.gif',
'https://media1.tenor.com/images/bc5e143ab33084961904240f431ca0b1/tenor.gif?itemid=9838409', 'https://media1.tenor.com/images/2f23c53755a5c3494a7f54bbcf04d1cc/tenor.gif?itemid=13970544', 
'https://media1.tenor.com/images/503bb007a3c84b569153dcfaaf9df46a/tenor.gif?itemid=17382412', 'https://media1.tenor.com/images/22d2ae068b33e3933ff09a1a826af03c/tenor.gif?itemid=10358834']

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    var user = msg.mentions.users.first();
    if (user === undefined) {
        var user = 'you';
    }
    var message = args.slice(1, args.length).join(" ");
    const embed = new Discord.MessageEmbed()
    .addField('Hugging', `${msg.author} ✧ ${user} | ${message}`)
    .setImage(randomgif())
    .setFooter('(ᴖ◡ᴖ)♪')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "kiss"
}