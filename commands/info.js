const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    var finalString = '';
    var user = msg.author;
    var userCreated = user.createdAt.toString().split(' ');
    const embed = new Discord.MessageEmbed()
    .addField(`${user.username}'s information`, `${user.tag}`)
    .setThumbnail(`${msg.author.displayAvatarURL()}`)
    .addField(`Presence`, `${user.presence.status}`)
    .addField('Account created:\n ', `${userCreated[1]}, ${userCreated[2]}d  ${userCreated[3]}y, ${userCreated[4]}`)
    .setFooter(`ID: ${user.id}\n ｡^‿^｡`)
    .setTimestamp(msg.createdAt)
    .setColor('#fed9f3')
    msg.channel.send(embed)

}

module.exports.config = {
    command: "info"
}