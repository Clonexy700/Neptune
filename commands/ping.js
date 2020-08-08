const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

        const embed = new Discord.MessageEmbed()
        .setColor('#5b5ddf')
        .setDescription("Nep! Ping: ``" + Math.round(client.ws.ping) + "`` ms")
        msg.channel.send(embed)

}

module.exports.config = {
    command: "ping"
}