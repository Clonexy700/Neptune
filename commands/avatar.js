const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    const user = msg.mentions.users.first();
    if (user === undefined) {
        const embed = new Discord.MessageEmbed()
        .addField('Nep nep!', `${msg.author.username}'s avatar`, false)
        .setImage(msg.author.displayAvatarURL())
        .setColor('#5b5ddf')
        msg.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .addField('Nep nep!', `${user.username}'s avatar`, false)
        .setImage(user.displayAvatarURL())
        .setColor('#5b5ddf')
        msg.channel.send(embed)
    }

}

module.exports.config = {
    command: "avatar"
}