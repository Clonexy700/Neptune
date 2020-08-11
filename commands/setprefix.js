const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send({embed:{title:"Permissions",description:`You are not administrator and can't use this command!`,color:'#fed9f3'}})
    let prefixes = JSON.parse(fs.readFileSync("./storage/guildprefix.json", "utf-8"));
    prefixes[msg.guild.id] = {
        prefixes: args[0]
    }
    fs.writeFile('./storage/guildprefix.json', JSON.stringify(prefixes), (err) => {
        if (err) console.error(err);
    });

    msg.channel.send({embed:{
        title:"Prefix changed",
        description:`Prefix was changed to ${args[0]}`,
        color:'#fed9f3'
    }})
}

module.exports.config = {
    command: "setprefix"
}