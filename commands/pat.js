const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ['https://media.tenor.com/images/ad8357e58d35c1d63b570ab7e587f212/tenor.gif', 'https://media.tenor.com/images/a671268253717ff877474fd019ef73e9/tenor.gif', 'https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936',
'https://media.tenor.com/images/50b500c0fc0ad01a974af8b58b5e0c9b/tenor.gif', 'https://media.tenor.com/images/40f454db8d7ee7ccad8998479fbabe69/tenor.gif', 'https://media1.tenor.com/images/70960e87fb9454df6a1d15c96c9ad955/tenor.gif?itemid=10092582',
'https://media1.tenor.com/images/d7c326bd43776f1e0df6f63956230eb4/tenor.gif?itemid=17187002', 'https://media1.tenor.com/images/be736bf683255c145a4804e3c2366f4f/tenor.gif?itemid=17057940', 'https://media1.tenor.com/images/01827ac93db8966ee97e63308ba79965/tenor.gif?itemid=9394441',
'https://media.tenor.com/images/8237d7da8cbd7227d67d735d437612cf/tenor.gif', 'https://media.tenor.com/images/3b3a1e4e29f27631baeb3a4316972b28/tenor.gif', 'https://media1.tenor.com/images/c50c9478d193cbc4f8938072427ad092/tenor.gif?itemid=13327143',
'https://media1.tenor.com/images/6151c42c94df654b1c7de2fdebaa6bd1/tenor.gif?itemid=16456868', 'https://media1.tenor.com/images/1a8e560e8873ce2a48b3dfbbaa7805ec/tenor.gif?itemid=11118254', 'https://i.pinimg.com/originals/2e/27/d5/2e27d5d124bc2a62ddeb5dc9e7a73dd8.gif']

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
    command: "pat"
}