const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    const embed = new Discord.MessageEmbed()
    .setColor('#5b5ddf')
    .setImage('https://cdn.discordapp.com/attachments/581531385639206935/740827197132242954/3099b51e40f0f8fd.gif')
    msg.channel.send(embed)

}

module.exports.config = {
    command: "carrot"
}