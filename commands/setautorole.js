const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send({embed:{title:"Permissions",description:`You are not administrator and can't use this command!`,color:'#fed9f3'}})
    if (!args.join(" ")) msg.channel.send({embed:{title:"No arguments",description:`Role name is required for this command`,color:'#fed9f3'}})
    let autoroledata = JSON.parse(fs.readFileSync('storage/autorole.json', 'utf8'));
    if (!autoroledata[msg.guild.id]) autoroledata[msg.guild.id] = {}
    if (!autoroledata[msg.guild.id].rolename) autoroledata[msg.guild.id].rolename = 'none';
    var role_name = args.join(" ");
    autoroledata[msg.guild.id] = {
        rolename: role_name
    }
    fs.writeFile('./storage/autorole.json', JSON.stringify(autoroledata), (err) => {
        if (err) console.error(err);
    });
    let role = msg.guild.roles.cache.find(role => role.name === role_name);
    msg.channel.send({embed:{
        title:"Autorole changed",
        description:`Autorole was changed to ${role}`,
        color:'#fed9f3'
    }})
}
    

module.exports.config = {
    command: "setautorole"
}