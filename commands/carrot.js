const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    msg.delete();
    const embed = new Discord.MessageEmbed()
    .setColor('#fed9f3')
    .setFooter(msg.author.username, msg.author.displayAvatarURL())
    .setImage('https://cdn.discordapp.com/attachments/581531385639206935/740827197132242954/3099b51e40f0f8fd.gif')
    msg.channel.send(embed)

}

module.exports.config = {
    command: "carrot"
}