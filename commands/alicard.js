const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    const embed  = new Discord.MessageEmbed()
    .addField('Nep nep!', '``He is perv and lewding lolies >.<``', false)
    .setColor('#f53127')
    .setImage('https://cdn.discordapp.com/attachments/607250459622768640/740811878418219100/satan.png')
    msg.channel .send(embed)

}

module.exports.config = {
    command: "alicard"
}