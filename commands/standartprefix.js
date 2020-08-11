const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send({embed:{title:"Permissions",description:`You are not administrator and can't use this command!`,color:'#fed9f3'}})
    let prefixes = JSON.parse(fs.readFileSync("./storage/guildprefix.json", "utf-8"));
    let configuration = require('../config.json');
    let default_prefix = configuration.prefix
    prefixes[msg.guild.id] = {
        prefixes: default_prefix
    }
    fs.writeFile('./storage/guildprefix.json', JSON.stringify(prefixes), (err) => {
        if (err) console.error(err);
    });

    msg.channel.send({embed:{
        title:"Prefix changed",
        description:`Prefix was changed to default ${default_prefix}`,
        color:'#fed9f3'
    }})
}

module.exports.config = {
    command: "defaultprefix"
}