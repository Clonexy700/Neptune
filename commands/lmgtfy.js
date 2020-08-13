const Discord = require("discord.js");
const encode = require('strict-uri-encode')
module.exports.run = async(client, msg, args) => {
    let question = encode(args.join(" "));
    let link = `https://www.lmgtfy.com/?q=${question}`
    let embed = new Discord.MessageEmbed()
    .setColor('#fed9f3')
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTitle("lmgtfy, nep")
    .setDescription(`**<${link}>**`)
    msg.channel.send(embed);
}
module.exports.config = {
    command: "lmgtfy"
}