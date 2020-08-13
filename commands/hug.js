const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ['https://media.tenor.com/images/b6d0903e0d54e05bb993f2eb78b39778/tenor.gif', 'https://media1.tenor.com/images/969f0f462e4b7350da543f0231ba94cb/tenor.gif?itemid=14246498', 
'https://media1.tenor.com/images/44b4b9d5e6b4d806b6bcde2fd28a75ff/tenor.gif?itemid=9383138', 'https://media1.tenor.com/images/63f37cdce7bdc233c7186c2b91e9810c/tenor.gif?itemid=16038267', 
'https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079', 'https://media.tenor.com/images/a42e5eeba7ef210839a96ce9251d1772/tenor.gif',
'https://data.whicdn.com/images/213476418/original.gif', 'https://data.whicdn.com/images/48893606/original.gif', 'https://media.tenor.com/images/f029c5ebf31f247eba1af1dc3a5f924e/tenor.gif']

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
    command: "hug"
}