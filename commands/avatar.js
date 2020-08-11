const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    let user = msg.mentions.users.first();
    if (user === undefined) {
        const embed = new Discord.MessageEmbed()
        .addField('Nep nep!', `${msg.author.username}'s avatar`, false)
        .setImage(msg.author.displayAvatarURL())
        .setColor('#fed9f3')
        msg.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .addField('Nep nep!', `${user.username}'s avatar`, false)
        .setImage(user.displayAvatarURL())
        .setColor('#fed9f3')
        msg.channel.send(embed)
    }

}

module.exports.config = {
    command: "avatar"
}