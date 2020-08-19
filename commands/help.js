const Discord = require('discord.js');
const fs = require('fs');
const commandshelp = JSON.parse(fs.readFileSync('./storage/commands.json', 'utf8'));
module.exports.run = async(client, msg, args) => {
    
    let prefixes = JSON.parse(fs.readFileSync("storage/guildprefix.json", 'utf-8'));
    if (!prefixes[msg.guild.id]){
        prefixes[msg.guild.id] = {
            prefixes: process.env.prefix
        };
    }

    let prefix = prefixes[msg.guild.id].prefixes;
    if (msg.content === `${prefix}help`) { 


        let groups = '';

        for (var cmd in commandshelp) {
            if (!groups.includes(commandshelp[cmd].group)) {
                groups += `${commandshelp[cmd].group}\n`
            }
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#fed9f3')
        .setDescription(`**${groups}**`)
        .setTitle('Groups')
        .setFooter(`Currently showing groups. To view group commands or command do\n ${prefix}help [group / command]`)
        msg.channel.send(embed)


    } else if (args.join(" ").toLowerCase() === 'groups') {

      
        let groups = '';

        for (var cmd in commandshelp) {
            if (!groups.includes(commandshelp[cmd].group)) {
                groups += `${commandshelp[cmd].group}\n`
            }
        }
        
        const embed = new Discord.MessageEmbed()
        .setColor('#fed9f3')
        .setDescription(`**${groups}**`)
        .setTitle('Groups')
        .setFooter(`Currently showing groups. To view group commands or command do\n ${prefix}help [group / command]`)
        msg.channel.send(embed)

        return; 


    } else {

        let groupFound = '';

        for (var cmd in commandshelp) { 

            if (args.join(" ").trim().toLowerCase() === commandshelp[cmd].group.toLowerCase()) {
                groupFound = commandshelp[cmd].group.toLowerCase();
                break;
            }

        }

        if (groupFound != '') { 

           
            const embed = new Discord.MessageEmbed()
                .setColor('#fed9f3') 

         
            let commandsFound = 0;


            for (var cmd in commandshelp) {

               
                if (commandshelp[cmd].group.toLowerCase() === groupFound) {
                    
                    commandsFound++
                    
                    embed.addField(`${commandshelp[cmd].name}`, `**Description:**\`\`${commandshelp[cmd].desc}\`\`\n**Usage:**\`\`${prefix + commandshelp[cmd].usage}\`\``);
                }

            }

            embed.setFooter(`Currently showing ${groupFound} commands. To view another group do\n ${prefix}help [group / command]`)
            embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

            msg.channel.send({embed})


            return; 
        }


        let commandFound = '';
        let commandDesc = '';
        let commandUsage = '';
        let commandGroup = '';

        for (var cmd in commandshelp) { 

            if (args.join(" ").trim().toLowerCase() === commandshelp[cmd].name.toLowerCase()) {
                commandFound = commandshelp[cmd].name; 
                commandDesc = commandshelp[cmd].desc;
                commandUsage = commandshelp[cmd].usage;
                commandGroup = commandshelp[cmd].group;
                break;
            }

        }

        
        if (commandFound === '') {
            msg.channel.send({embed: {
                description:`**No group or command found titled \`${args.join(" ")}\`**`,
                color: '#fed9f3',
            }})

        }

        
        msg.channel.send({embed: {
            title:'<> means required, [] means optional',
            color: '#fed9f3',
            fields: [{
                name:commandFound,
                value:`**Description:**\`\`${commandDesc}\`\`\n**Usage:**\`\`${commandUsage}\`\`\n**Group:**\`\`${commandGroup}\`\``
            }]
        }})

        return; 

    }

}


module.exports.config = {
    command: "help"
}