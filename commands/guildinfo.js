const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    var guildCreated = msg.guild.createdAt.toString().split(' ');
    const embed  = new Discord.MessageEmbed()
    .setDescription(`**${msg.guild.name}**`)
    .setThumbnail(`${msg.guild.iconURL()}`)
    .addField('Guild region:', `${msg.guild.region}`, true)
    .addField('Total Members:', `${msg.guild.memberCount}`, true)
    .addField('Guild created at:\n ', `${guildCreated[1]}, ${guildCreated[2]}d  ${guildCreated[3]}y, ${guildCreated[4]}`, true)
    .setFooter(`Guild ID: ${msg.guild.id}\n (✧ω✧)`)
    .setTimestamp(msg.createdAt)
    .setColor('#fed9f3')
    msg.channel.send(embed)

}

module.exports.config = {
    command: "guildinfo"
}