const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const moment = require('moment');

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

let configuration = require('./config.json'); 

let token = configuration.token; 
let prefix = configuration.prefix;

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
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`Welcome to the server, ${member}`)
    .setColor('#5b5ddf')
    channel.send(embed)

    var role = member.guild.roles.cache.find(role => role.name === "ムーン");
    member.roles.add(role);

  });

  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'left-log');
    if (!channel) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`${member} left the "**${member.guild.name}**" server`)
    .setColor('#5b5ddf')
    channel.send(embed)
  });

loadCmds()

client.on('message', (msg) => {

    var cont = msg.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);

    if (!msg.guild) return;
    if (msg.author.bot) return;

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
        .setColor('#5b5ddf')
        .setDescription('``All commands are reloaded``')
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'daily')) {
        const credit_emoji = client.emojis.cache.get("741939356003991562")
        if (moneydata[msg.author.id].lastDaily != moment().format('L')) {
            moneydata[msg.author.id].lastDaily = moment().format('L')
            moneydata[msg.author.id].money += 500;
            msg.channel.send({embed:{
                title:"Daily reward",
                description:`+500 ${credit_emoji} added to your account!`,
                color:'#5b5ddf'
            }})

        } else {
            msg.channel.send({embed:{
                title:"Daily reward",
                description:`You already collected your daily reward ${credit_emoji}!You can collect your next reward ` + moment().endOf('day').fromNow() + '.',
                color:'#5b5ddf'
            }})
        }
        fs.writeFile('storage/moneydata.json', JSON.stringify(moneydata), (err) => {
            if (err) console.error(err);
        });
    }

    if (msg.content === (prefix + 'money')) {
        const credit_emoji = client.emojis.cache.get("741939356003991562")
        const embed = new Discord.MessageEmbed()
        .setTitle('Nep nep!')
        .addField('Account:', `${msg.author}`, true)
        .addField('Balance:', `${moneydata[msg.author.id].money} ${credit_emoji}`, true)
        .setFooter('∩˙▿˙∩')
        .setThumbnail('https://cdn.discordapp.com/attachments/621005423335702528/676802134875832350/doesnt_need_money_mokou.png')
        .setTimestamp(msg.createdAt)
        .setColor('#5b5ddf')
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'topmoney')) {
        const credit_emoji = client.emojis.cache.get("741939356003991562")
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
            color:'#5b5ddf',
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

    


});

client.login(token);
