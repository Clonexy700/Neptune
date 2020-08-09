const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    const moneydata = JSON.parse(fs.readFileSync('./storage/moneydata.json', 'utf8'));
        const embed = new Discord.MessageEmbed()
        .setTitle('Nep nep!')
        .addField('Account:', `${msg.author}`, true)
        .addField('Balance:', `${moneydata[msg.author.id].money}`, true)
        .setFooter('∩˙▿˙∩')
        .setThumbnail('https://cdn.discordapp.com/attachments/621005423335702528/676802134875832350/doesnt_need_money_mokou.png')
        .setTimestamp(msg.createdAt)
        .setColor('#5b5ddf')
        msg.channel.send(embed)


}

module.exports.config = {
    command: "money"
}