const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const moment = require('moment');
const weather = require('weather-js')
const random = require('random')
const userdata = JSON.parse(fs.readFileSync('storage/userdata.json', 'utf8'));
const moneydata = JSON.parse(fs.readFileSync('storage/moneydata.json', 'utf8'));

client.commands = new Discord.Collection();

function loadCmds() {
fs.readdir('./commands/', (err, files) => {
    if(err) console.error(err);
    
    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {return console.log('No commands found, Nep')}
    else {console.log(jsfiles.length + 'commands found')}

    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        var cmds = require(`./commands/${f}`);
        console.log(`Command ${f} loading...`)
        client.commands.set(cmds.config.command, cmds);

    })
})

}

let token = process.env.token

const actvs = [
    "nep help",
    "with the developers console | nep help",
    "with Clonexy700 | nep help",
    "with Discord.js | nep help"
];

client.on('ready', () => {
    console.log(`Nep nep nep! I logged as ${client.user.tag}!`);
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    }, 10000);
});

client.on('guildMemberAdd', member => {
    let roledata = JSON.parse(fs.readFileSync('storage/autorole.json', 'utf8'));
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`Nep, nep! Welcome to the server, ${member}`)
    .setColor('#fed9f3')
    channel.send(embed)
    if (roledata[member.guild.id] === undefined) {
        roledata[member.guild.id] = {
            rolename: 'none'
        }
        fs.writeFile('storage/autorole.json', JSON.stringify(roledata), (err) => {
            if (err) console.error(err);
        });
    }
    let role_name = roledata[member.guild.id].rolename;
    if (role_name !== 'none'){
        var role = member.guild.roles.cache.find(role => role.name === role_name);
        member.roles.add(role);
    }

  });

  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'left-log');
    if (!channel) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`${member} left the "**${member.guild.name}**" server`)
    .setColor('#fed9f3')
    channel.send(embed)
  });

  client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    //Your other stuff like adding to guildArray
})

loadCmds()

const stats = JSON.parse(fs.readFileSync('stats.json', 'utf8'));

client.on('message', (msg) => {

    function casino() {
        var rand = ['1', '2', '3', '4', '5', '6', '7', '8']
        return rand[Math.floor(Math.random()*rand.length)];
    }

    function coin() {
        var rand = ['heads', 'tails']
        return rand[Math.floor(Math.random()*rand.length)];
    }

    let prefixes = JSON.parse(fs.readFileSync("storage/guildprefix.json", 'utf-8'));
    if (!prefixes[msg.guild.id]){
        prefixes[msg.guild.id] = {
            prefixes: process.env.prefix
        };
    }

    let prefix = prefixes[msg.guild.id].prefixes;

    if (!msg.guild) return;
    if (msg.author.id == client.user.id) return;

    if (!stats[msg.guild.id]) stats[msg.guild.id] = {};
    const guildStats = stats[msg.guild.id];
    if (!guildStats[msg.author.id]) guildStats[msg.author.id] = {
        xp: 0,
        level: 0,
        last_message: 0
    }

    const userStats = guildStats[msg.author.id];
    if (Date.now() - userStats.last_message > 10000) {
        userStats.xp += random.int(5, 25);
        userStats.last_message = Date.now();
    
        const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100
        if (userStats.xp >= xpToNextLevel) {
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLevel
            msg.channel.send(`${msg.author.username} has reached ${userStats.level}`)
        }
        fs.writeFileSync('stats.json', JSON.stringify(stats), (err) => {
            if (err) console.error(err);
        });
    
        console.log(`${msg.author.username} now has ${userStats.xp}`)
        console.log(`${xpToNextLevel} XP needed for next level`)
    }


    var cont = msg.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);

    if (!userdata[msg.author.id]) userdata[msg.author.id] = {}
    if (!userdata[msg.author.id].msgsent) userdata[msg.author.id].msgsent = 0;
    if (!moneydata[msg.author.id]) moneydata[msg.author.id] = {}
    if (!moneydata[msg.author.id].money) moneydata[msg.author.id].money = 1000;
    if (!moneydata[msg.author.id].lastDaily) moneydata[msg.author.id].lastDaily = 'Not Collected';
    if (!moneydata[msg.author.id].username) moneydata[msg.author.id].username = msg.author.username;


    userdata[msg.author.id].msgsent++;

    fs.writeFile('storage/userdata.json', JSON.stringify(userdata), (err) => {
        if (err) console.error(err);
    });

    fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
        if (err) console.error(err);
    });

    if (!msg.content.startsWith(prefix)) return;

    var cmd = client.commands.get(cont[0])
    if (cmd) cmd.run(client, msg, args);
    
    if (msg.content === (prefix + 'reload')) {
        loadCmds()
        const embed = new Discord.MessageEmbed()
        .setColor('#fed9f3')
        .setDescription('``All commands are reloaded``')
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'daily')) {
        const credit_emoji = client.emojis.cache.get("741939356003991562")
        if (moneydata[msg.author.id].lastDaily != moment().format('L')) {
            moneydata[msg.author.id].lastDaily = moment().format('L')
            moneydata[msg.author.id].money += Number(500);
            msg.channel.send({embed:{
                title:"Daily reward",
                description:`+500 ${credit_emoji} added to your account!`,
                color:'#fed9f3'
            }})

        } else {
            msg.channel.send({embed:{
                title:"Daily reward",
                description:`You already collected your daily reward ${credit_emoji}!You can collect your next reward ` + moment().endOf('day').fromNow() + '.',
                color:'#fed9f3'
            }})
        }
        fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
            if (err) console.error(err);
        });
    }

    if (msg.content.startsWith (prefix + 'money')) {
        let user = msg.mentions.users.first();
        if (user === undefined) {
            const user = msg.author
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const embed = new Discord.MessageEmbed()
            .setTitle('Nep nep!')
            .addField('Account:', `${user}`, true)
            .addField('Balance:', `${moneydata[user.id].money} ${credit_emoji}`, true)
            .setFooter('∩˙▿˙∩')
            .setThumbnail('https://cdn.discordapp.com/attachments/621005423335702528/676802134875832350/doesnt_need_money_mokou.png')
            .setTimestamp(msg.createdAt)
            .setColor('#fed9f3')
            msg.channel.send(embed)
        }  else {
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const embed = new Discord.MessageEmbed()
            .setTitle('Nep nep!')
            .addField('Account:', `${user}`, true)
            .addField('Balance:', `${moneydata[user.id].money} ${credit_emoji}`, true)
            .setFooter('∩˙▿˙∩')
            .setThumbnail('https://cdn.discordapp.com/attachments/621005423335702528/676802134875832350/doesnt_need_money_mokou.png')
            .setTimestamp(msg.createdAt)
            .setColor('#fed9f3')
            msg.channel.send(embed)
        }
    }

    if (msg.content === (prefix + 'topmoney')) {
        const credit_emoji = client.emojis.cache.get("741939356003991562");
        const shock_nep = client.emojis.cache.get("741945536202145852")
        var globalmoney = 0;
        var globalusers = 0;
        var globalrichest = '';
        var globalrichestcred = 0;
        
        for (var i in moneydata) {
            globalmoney += moneydata[i].money;
            globalusers += 1;
            if (moneydata[i].money > globalrichestcred) {
                globalrichestcred = moneydata[i].money;
                globalrichest = moneydata[i].username;
            }
        }

        msg.channel.send({embed:{
            title:"Nep nep",
            color:'#fed9f3',
            fields:[{
                name: "Accounts",
                value:globalusers,
                inline:true
            },
            {
                name: "Total Money",
                value: `${globalmoney} ${credit_emoji}`,
                inline: true
            },
            {
                name: "Richest account",
                value:`${globalrichest} ${shock_nep} with ${globalrichestcred} ${credit_emoji}`
            }]
        }})
    }

    if (msg.content.startsWith(prefix + 'give')) {
        const checker = moneydata[msg.author.id].money;
        let user = msg.mentions.users.first();
        if (user === undefined) {
            msg.channel.send({embed:{
                title:"error",
                description:`You must define person who you send money!`,
                color:'#ff0000'
            }})
        }
        const credit_emoji = client.emojis.cache.get("741939356003991562")
         
        if (!args[1]) {
            msg.channel.send({embed:{
                title:"error",
                description:`You must define amount of ${credit_emoji}!`,
                color:'#ff0000'
            }})
        }

        if (isNaN(Number(args[1]))) {
            msg.channel.send({embed:{
                title:"error",
                description:`Your amount of ${credit_emoji} must be number!`,
                color:'#ff0000'
            }})
        }
        if (!isNaN(Number(args[1])))  {
            if ((Number(args[1])) > 99) {
                const checker_final = (checker - Number(args[1]));
                if (checker_final > 0) {
                    moneydata[msg.author.id].money -= Number(args[1]);
                    moneydata[user.id].money += Number(args[1]);
                    msg.channel.send({embed:{
                        title:"Money operation, nep",
                        description:`${msg.author.username} sent ${args[1]} ${credit_emoji} to ${user.username}`,
                        color:'#fed9f3'
                    }})
                    fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                        if (err) console.error(err);
                    });
            } 
            } else {
                msg.channel.send({embed:{
                    title:"error",
                    description:`Not enough amount of ${credit_emoji}!\n your balance can't be 0 or numbers below\n minimum amount to send is 100 ${credit_emoji} `,
                    color:'#ff0000'
                }})
            }

        }

    }
        if (msg.content.startsWith(prefix + 'wheel')) {
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const checker = moneydata[msg.author.id].money;
            var bet = args [0];
            if (!args[0]) {
                msg.channel.send({embed:{
                    title:"error",
                    description:`You must define amount of your bet in ${credit_emoji}!`,
                    color:'#ff0000'
                }})
            }
    
            if (isNaN(Number(args[0]))) {
                msg.channel.send({embed:{
                    title:"error",
                    description:`Your bet amount of ${credit_emoji} must be number!`,
                    color:'#ff0000'
                }})
            }
            if (!isNaN(Number(args[0])))  {
                if ((Number(args[0])) > 49) {
                    const checker_final = (checker - Number(args[0]));
                    if (checker_final > 0) {
                        moneydata[msg.author.id].money -= Number(args[0]);
                        var arrow = '↖️';
                        var casino_value = casino();
                        if (casino_value === '1'){
                            var arrow = '↖️'
                            var bet = bet / 2
                        }
                        if (casino_value === '2'){
                            arrow = '⬆️️'
                            var bet = bet / 10
                        }
                        if (casino_value === '3'){
                            arrow = '↗️'
                            var bet = Math.round(bet / 3)
                        }
                        if (casino_value === '4'){
                            arrow = '➡️️'
                            var bet = bet * 1.2
                        }
                        if (casino_value === '5'){
                            arrow = '↘️️'
                            var bet = bet * 1.5
                        }
                        if (casino_value === '6'){
                            arrow = '⬇️️'
                            var bet = bet * 1.8
                        }
                        if (casino_value === '7'){
                            arrow = '↙️️'
                            var bet = bet * 2.5
                        }
                        if (casino_value === '8'){
                            arrow = '⬅️️'
                            var bet = bet / 5
                        }
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`**Wheel**\n${msg.author} get ${bet} ${credit_emoji}\n\n\n**♫|0.5  ♩|0.1  ♪|0.3**\n\n\n**♬|0.2  ${arrow}  ♙|1.2**\n\n\n**♜|2.5  ♝|1.8  ♞|1.5**`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setColor('#fed9f3')
                        msg.channel.send(embed)
                        moneydata[msg.author.id].money += Number(bet);
                        fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                            if (err) console.error(err);
                        });
                } 
                } else {
                    msg.channel.send({embed:{
                        title:"error",
                        description:`Not enough amount of ${credit_emoji}!\n your balance can't be 0 or numbers below\n minimum amount of bet is 50 ${credit_emoji} `,
                        color:'#ff0000'
                    }})
                }
    
            }
        }
        if (msg.content.startsWith(prefix + 'coin')) {
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const checker = moneydata[msg.author.id].money;
            var bet = args [0];
            if (!args[0]) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`You must define amount of your bet in ${credit_emoji}!`,
                    color:'#ff0000'
                }})
            }

            if (!args[1]) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`You must define side of coin with heads/tails or h/t!`,
                    color:'#ff0000'
                }})
            }
    
            if (isNaN(Number(args[0]))) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`Your bet amount of ${credit_emoji} must be number!`,
                    color:'#ff0000'
                }})
            }
            if (!args[1].startsWith('h')) {
                if (!args[1].startsWith('t')) {
                    return msg.channel.send({embed:{
                        title:"error",
                        description:`You must define side of coin with heads/tails or h/t!`,
                        color:'#ff0000'
                    }})
                }
            }
            if (!isNaN(Number(args[0])))  {
                if ((Number(args[0])) > 49) {
                    const checker_final = (checker - Number(args[0]));
                    if (checker_final > 0) {
                        moneydata[msg.author.id].money -= Number(args[0]);
                        var casino_value = coin();
                        if (args[1].startsWith('h')) {
                            if (casino_value === 'heads'){
                                var bet = bet * 2
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`**Coin**\nThe coin side was **heads**!\n${msg.author} win ${bet} ${credit_emoji}`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed)
                                moneydata[msg.author.id].money += Number(bet);
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                            if (casino_value === 'tails'){
                                var bet = 0
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`**Coin**\nThe coin side was **tails**!\n${msg.author} loose ${credit_emoji}`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed)
                                moneydata[msg.author.id].money += Number(bet);
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                        }
                        if (args[1].startsWith('t')) {
                            if (casino_value === 'heads'){
                                var bet = 0
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`**Coin**\nThe coin side was **heads**!\n${msg.author} loose ${credit_emoji}`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed)
                                moneydata[msg.author.id].money += Number(bet);
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                            if (casino_value === 'tails'){
                                var bet = bet * 2
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`**Coin**\nThe coin side was **tails**!\n${msg.author} win ${bet} ${credit_emoji}`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed)
                                moneydata[msg.author.id].money += Number(bet);
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                        }
                    }
                } 
            } else {
                msg.channel.send({embed:{
                    title:"error",
                    description:`Not enough amount of ${credit_emoji}!\n your balance can't be 0 or numbers below\n minimum amount of bet is 50 ${credit_emoji} `,
                    color:'#ff0000'
                }})
            }
    
        }

        if (msg.content.startsWith(prefix + 'guessnum')) {
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const checker = moneydata[msg.author.id].money;
            var bet = args [0];
            if (!args[0]) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`You must define amount of your bet in ${credit_emoji}!`,
                    color:'#ff0000'
                }})
            }
    
            if (isNaN(Number(args[0]))) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`Your bet amount of ${credit_emoji} must be number!`,
                    color:'#ff0000'
                }})
            }
            if (!isNaN(Number(args[0])))  {
                if ((Number(args[0])) > 49) {
                    const checker_final = (checker - Number(args[0]));
                    if (checker_final > 0) {
                        moneydata[msg.author.id].money -= Number(args[0]);
                        var random_guess_number = Math.floor(Math.random() * 100) + 1
                        var random_guess_number = random_guess_number.toString();
                        var tries = 0
                        const embed = new Discord.MessageEmbed()
                        .setDescription("Try to guess number between 1 and 100... Will expire in 20 seconds")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setColor('#fed9f3')
                        msg.channel.send(embed).then(r => r.delete({timeout: 20000}));
                        const filter = m => m.author.id === msg.author.id;
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 20000
                        }).then(collected => {
                            if(collected.first().content === 'cancel'){
                                return msg.reply('Canceled')
                            }
                            if(isNaN(collected.first().content)){
                                return msg.reply('Canceled because you must define numbers')
                            }
                            var number = Math.floor(collected.first().content)
                            var add_msg_in = ''
                            if (number > random_guess_number){
                                var tries = 1
                                var add_msg_in = 'Your number is too \`\`big\`\`'
                            }
                            if (number < random_guess_number){
                                var tries = 1
                                var add_msg_in = 'Your number is too \`\`low\`\`'
                            }
                            if (number == random_guess_number){
                                var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * 2} \`\` ${credit_emoji}`
                                var tries = 0
                            }
                            const embed_first = new Discord.MessageEmbed()
                            .setDescription(`Your guess is - \`\`${number}\`\`.\n ${add_msg_in}\nAttempt: \`\`${tries}\`\``)
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setColor('#fed9f3')
                            msg.channel.send(embed_first)
                            if (tries === 0) {
                                moneydata[msg.author.id].money += Number((args[0]*2));
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                            if (tries === 1) {
                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 20000
                                }).then(collected => {
                                    if(collected.first().content === 'cancel'){
                                        return msg.reply('Canceled')
                                    }
                                    if(isNaN(collected.first().content)){
                                        return msg.reply('Canceled because you must define numbers')
                                    }
                                    var number = Math.floor(collected.first().content)
                                    var add_msg_in = ''
                                    if (number > random_guess_number){
                                        var tries = 2
                                        var add_msg_in = 'Your number is too \`\`big\`\`'
                                    }
                                    if (number < random_guess_number){
                                        var tries = 2
                                        var add_msg_in = 'Your number is too \`\`low\`\`'
                                    }
                                    if (number == random_guess_number){
                                        var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * 2} \`\` ${credit_emoji}`
                                        var tries = 1
                                    }
                                    const embed_first = new Discord.MessageEmbed()
                                    .setDescription(`Your guess is - \`\`${number}\`\`.\n ${add_msg_in}\nAttempt: \`\`${tries}\`\``)
                                    .setTimestamp()
                                    .setFooter(client.user.username, client.user.displayAvatarURL())
                                    .setColor('#fed9f3')
                                    msg.channel.send(embed_first)
                                    if (tries === 2) {
                                        msg.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 20000
                                        }).then(collected => {
                                            if(collected.first().content === 'cancel'){
                                                return msg.reply('Canceled')
                                            }
                                            if(isNaN(collected.first().content)){
                                                return msg.reply('Canceled because you must define numbers')
                                            }
                                            var number = Math.floor(collected.first().content)
                                            var add_msg_in = ''
                                            if (number > random_guess_number){
                                                var tries = 3
                                                var add_msg_in = 'Your number is too \`\`big\`\`'
                                            }
                                            if (number < random_guess_number){
                                                var tries = 3
                                                var add_msg_in = 'Your number is too \`\`low\`\`'
                                            }
                                            if (number == random_guess_number){
                                                var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * 2}\`\` ${credit_emoji}`
                                                var tries = 2
                                            }
                                            const embed_first = new Discord.MessageEmbed()
                                            .setDescription(`Your guess is - \`\`${number}\`\`.\n ${add_msg_in}\nAttempt: \`\`${tries}\`\``)
                                            .setTimestamp()
                                            .setFooter(client.user.username, client.user.displayAvatarURL())
                                            .setColor('#fed9f3')
                                            msg.channel.send(embed_first)
                                            if (tries === 3) {
                                                msg.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 20000
                                                }).then(collected => {
                                                    if(collected.first().content === 'cancel'){
                                                        return msg.reply('Canceled')
                                                    }
                                                    if(isNaN(collected.first().content)){
                                                        return msg.reply('Canceled because you must define numbers')
                                                    }
                                                    var number = Math.floor(collected.first().content)
                                                    var add_msg_in = ''
                                                    if (number > random_guess_number){
                                                        var tries = 4
                                                        var add_msg_in = 'Your number is too \`\`big\`\`'
                                                    }
                                                    if (number < random_guess_number){
                                                        var tries = 4
                                                        var add_msg_in = 'Your number is too \`\`low\`\`'
                                                    }
                                                    if (number == random_guess_number){
                                                        var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * 2} \`\` ${credit_emoji}`
                                                        var tries = 3
                                                    }
                                                    const embed_first = new Discord.MessageEmbed()
                                                    .setDescription(`Your guess is - \`\`${number}\`\`.\n ${add_msg_in}\nAttempt: \`\`${tries}\`\``)
                                                    .setTimestamp()
                                                    .setFooter(client.user.username, client.user.displayAvatarURL())
                                                    .setColor('#fed9f3')
                                                    msg.channel.send(embed_first)
                                                    if (tries === 4) {
                                                        msg.channel.awaitMessages(filter, {
                                                            max: 1,
                                                            time: 20000
                                                        }).then(collected => {
                                                            if(collected.first().content === 'cancel'){
                                                                return msg.reply('Canceled')
                                                            }
                                                            if(isNaN(collected.first().content)){
                                                                return msg.reply('Canceled because you must define numbers')
                                                            }
                                                            var number = Math.floor(collected.first().content)
                                                            var add_msg_in = ''
                                                            if (number > random_guess_number){
                                                                var tries = 5
                                                                var add_msg_in = 'Your number is too \`\`big\`\`'
                                                            }
                                                            if (number < random_guess_number){
                                                                var tries = 5
                                                                var add_msg_in = 'Your number is too \`\`low\`\`'
                                                            }
                                                            if (number == random_guess_number){
                                                                var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * 2} \`\` ${credit_emoji}`
                                                                var tries = 4
                                                            }
                                                            const embed_first = new Discord.MessageEmbed()
                                                            .setDescription(`Your guess is - ${number}.\n ${add_msg_in}\nAttempt: \`\`${tries}\`\``)
                                                            .setTimestamp()
                                                            .setFooter(client.user.username, client.user.displayAvatarURL())
                                                            .setColor('#fed9f3')
                                                            msg.channel.send(embed_first)
                                                            if (tries === 5) {
                                                                const embed_first = new Discord.MessageEmbed()
                                                                .setDescription(`You loose!\n Guessed number was\`\` ${random_guess_number} \`\``)
                                                                .setTimestamp()
                                                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                                                .setColor('#fed9f3')
                                                                msg.channel.send(embed_first)

                                                            }
                                                        })
                                                    } else {
                                                        moneydata[msg.author.id].money += Number((args[0]*2));
                                                        fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                                            if (err) console.error(err);
                                                        });
                                                    }
                                                })
                                            } else {
                                                moneydata[msg.author.id].money += Number((args[0]*2));
                                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                                    if (err) console.error(err);
                                                });
                                            }
                                        })
                                    } else {
                                        moneydata[msg.author.id].money += Number((args[0]*2));
                                        fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                            if (err) console.error(err);
                                        });
                                    }
                                })
                            } else {
                                moneydata[msg.author.id].money += Number((args[0]*2));
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            }
                        })    
                        
                    }

                } else {
                    msg.channel.send({embed:{
                        title:"error",
                        description:`Not enough amount of ${credit_emoji}!\n your balance can't be 0 or numbers below\n minimum amount of bet is 50 ${credit_emoji} `,
                        color:'#ff0000'
                    }})
                }
    
            }
        }

        if (msg.content.startsWith(prefix + 'cups')) {
            const credit_emoji = client.emojis.cache.get("741939356003991562")
            const checker = moneydata[msg.author.id].money;
            var bet = args [0];
            var cups = args[1];
            if (!args[0]) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`You must define amount of your bet in ${credit_emoji}!`,
                    color:'#ff0000'
                }})
            }
            
            if (!args[1]) {
                var cups = 3
            }
            if (args[1] < 3) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`At least 3 cups for playing!`,
                    color:'#ff0000'
                }})
            }
    
            if (isNaN(Number(args[0]))) {
                return msg.channel.send({embed:{
                    title:"error",
                    description:`Your bet amount of ${credit_emoji} must be number!`,
                    color:'#ff0000'
                }})
            }
            if (!isNaN(Number(args[0])))  {
                if ((Number(args[0])) > 49) {
                    const checker_final = (checker - Number(args[0]));
                    if (checker_final > 0) {
                        moneydata[msg.author.id].money -= Number(args[0]);
                        var cup_to_choose = (Math.floor(Math.random() * cups) + 1)
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`Try to guess cup between 1 and ${cups}... Will expire in 20 seconds`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setColor('#fed9f3')
                        msg.channel.send(embed).then(r => r.delete({timeout: 20000}));
                        const filter = m => m.author.id === msg.author.id;
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 20000
                        }).then(collected => {
                            if(collected.first().content === 'cancel'){
                                return msg.reply('Canceled')
                            }
                            if(isNaN(collected.first().content)){
                                return msg.reply('Canceled because you must define numbers')
                            }
                            var cup = Math.floor(collected.first().content)
                            if (cup == cup_to_choose){
                                var add_msg_in = `You guesed right. You win! ${msg.author} get \`\` ${bet * cups} \`\` ${credit_emoji}`
                                const embed_first = new Discord.MessageEmbed()
                                .setDescription(`Right cup is - \`\`${cup_to_choose}\`\`.\n ${add_msg_in}\n`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed_first)
                                moneydata[msg.author.id].money += Number((args[0]*Number(cups)));
                                fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
                                    if (err) console.error(err);
                                });
                            } else {
                                var add_msg_in = `You loose, your choice was - \`\`${cup}\`\``
                                const embed_first = new Discord.MessageEmbed()
                                .setDescription(`Right cup is - \`\`${cup_to_choose}\`\`.\n ${add_msg_in}\n`)
                                .setTimestamp()
                                .setFooter(client.user.username, client.user.displayAvatarURL())
                                .setColor('#fed9f3')
                                msg.channel.send(embed_first)
                            }
                        })
                    }
                } 
            } else {
                msg.channel.send({embed:{
                    title:"error",
                    description:`Not enough amount of ${credit_emoji}!\n your balance can't be 0 or numbers below\n minimum amount of bet is 50 ${credit_emoji} `,
                    color:'#ff0000'
                }})
            }
        }
    
        
});

client.login(token);
