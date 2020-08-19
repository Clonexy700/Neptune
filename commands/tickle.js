const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ["https://media1.tenor.com/images/16662667791fc3275c25db595fdf89f8/tenor.gif?itemid=12374065",
    "https://media1.tenor.com/images/d38554c6e23b86c81f8d4a3764b38912/tenor.gif?itemid=11379131",
    "https://media1.tenor.com/images/fea79fed0168efcaf1ddfb14d8af1a6d/tenor.gif?itemid=7283507",
    "https://media1.tenor.com/images/fcbded4ce66ab01317ee009a1aa44404/tenor.gif?itemid=11920137",
    "https://media1.tenor.com/images/f43da23b4ed0938ce362b0374b88e42c/tenor.gif?itemid=8054679"]

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    var user = msg.mentions.users.first();
    if (user === undefined) {
        var user = 'you';
    }
    var message = args.slice(1, args.length).join(" ");
    const embed = new Discord.MessageEmbed()
    .addField('Tickling', `${msg.author} ✧ ${user} | ${message}`)
    .setImage(randomgif())
    .setFooter('(￣ω￣)')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "tickle"
}