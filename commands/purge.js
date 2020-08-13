const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    if (msg.deletable) {
        msg.delete();
    }
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send({embed:{title:"Permissions",description:`You are don't have permission "manage_messages" and can't use this command!`,color:'#fed9f3'}})
    if(isNaN(args[0]) || parseInt(args[0]) <= 0) return msg.channel.send({embed:{title:"No numerical args",description:`No numerical value or zero`,color:'#fed9f3'}})
    if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send({embed:{title:"Not enough permission for Neptune",description:`I can't delete messages. Lack of "manage_messages" permission`,color:'#fed9f3'}})
    let deleteAmount;
    if(parseInt(args[0]) > 100) {
        deleteAmount = 100
    } else {
        deleteAmount = parseInt(args[0]);
    }
    msg.channel.bulkDelete(deleteAmount, true)
    .then(deleted => msg.channel.send({embed:{title:"Purge",description:`Neptune deleted \`\` ${deleted.size} \`\` messages`,color:'#fed9f3'}}))
    .catch(err => msg.channel.send({embed:{title:"Purge",description:`Something went wrong... \n \`\`${err}\`\``,color:'#fed9f3'}}))
}

module.exports.config = {
    command: "purge"
}