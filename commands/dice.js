
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {
    if (args[0] === undefined) {
        msg.channel.send({embed:{
            description:`**Dice** :game_die:\n ${msg.author.username} rolled \`\`${(Math.floor(Math.random() * 6) + 1)}\`\`\n dice had \`\`6\`\` sides!\n✧୭.°✧`,
            color:'#fed9f3'
        }})
    } else {
        if (!isNaN(Number(args[0])))  {
            var dice_num = (Math.floor(Math.random() * Number(args[0])) + 1)
            msg.channel.send({embed:{
                description:`**Dice** :game_die:\n ${msg.author.username} rolled \`\`${dice_num}\`\`\n Dice had \`\`${args[0]}\`\` sides!\n✧୭.°✧`,
                color:'#fed9f3'
            }})
        }
    }

}
module.exports.config = {
    command: "dice"
}