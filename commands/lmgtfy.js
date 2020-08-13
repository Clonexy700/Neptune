const Discord = require("discord.js");
const encode = require('strict-uri-encode')
module.exports.run = async(client, msg, args) => {
    let question = encode(args.join(" "));
    let link = `https://www.lmgtfy.com/?q=${question}`
    msg.channel.send(`**<${link}>`)
}
module.exports.config = {
    command: "lmgtfy"
}