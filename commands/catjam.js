const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    msg.delete();
    const embed = new Discord.MessageEmbed()
    .setColor('#fed9f3')
    .setFooter(msg.author.username, msg.author.displayAvatarURL())
    .setImage('https://media.discordapp.net/attachments/543131278464253952/741742966871425085/catjam.gif')
    msg.channel.send(embed)

}

module.exports.config = {
    command: "catjam"
}