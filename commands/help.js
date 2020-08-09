const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    const embed = new Discord.MessageEmbed()
    .setDescription("**Help menu**\nNep nep! This is a list of my commands.\n :map: **Info**\n •``info`` •``ping`` •``avatar``\n :laughing: **Funny**\n •``alicard`` •``carrot``")
    .setColor('#5b5ddf')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "help"
}