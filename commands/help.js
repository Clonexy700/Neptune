const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    const credit_emoji = client.emojis.cache.get("741939356003991562")
    const embed = new Discord.MessageEmbed()
    .setDescription("**Help menu**\nNep nep! This is a list of my commands.\n :map: **Info**\n •``info`` •``ping`` •``avatar``\n :laughing: **Funny**\n •``alicard`` •``carrot``\n :moneybag: **Economics**\n •``money`` •``daily`` •``topmoney``")
    .setColor('#5b5ddf')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "help"
}