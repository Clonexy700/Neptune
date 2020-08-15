const urban = require('relevant-urban')
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    let res = await urban(args.join(' ')).catch(e => {
        return msg.channel.send({embed:{
            title:"error",
            description:`Sorry that word was not found`,
            color:'#fed9f3'
        }})
    });

    const embed = new Discord.MessageEmbed()
    .setDescription(`**Definition**\n*${res.definition}*\n\n**Example:**${res.example}**`)
    .addField('Author', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes ${res.thumbsDown}\``, true)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "urban"
}