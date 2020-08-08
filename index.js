const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const userdata = JSON.parse(fs.readFileSync('storage/userdata.json', 'utf8'));

let config = require('./config.json'); 

let token = config.token; 
let prefix = config.prefix;

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


client.on('message', (msg) => {

    if (!msg.guild) return;
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    if (!userdata[msg.author.id]) userdata[msg.author.id] = {
        exp: 0
    }

    userdata[msg.author.id].exp++;

    fs.writeFile('storage/userdata.json', JSON.stringify(userdata), (err) => {
        if (err) console.error(err);
    });

    if (msg.content === (prefix + 'stats')) {
        const embed = new Discord.MessageEmbed()
        .addField('Nep stats', `${msg.author} Your experience amount is: **${userdata[msg.author.id].exp}**`)
        .setFooter('(´｡• ω •｡`)')
        .setThumbnail(msg.author.displayAvatarURL())
        .setTimestamp(msg.createdAt)
        .setColor('#5b5ddf')
        msg.channel.send(embed)
    }
    
    if (msg.content === (prefix + 'nep')) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`Nep nep! ${msg.author}`)
        .setColor('#5b5ddf')
        msg.channel.send(embed)

    }

    if (msg.content === (prefix + 'embedtest')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('This is title')
        .setDescription('This is the description field')
        .addField('MIMI', 'Zeronya love lolies', false)
        .setColor('#5b5ddf')
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'info')) {
        var finalString = '';
        var user = msg.author;
        var userCreated = user.createdAt.toString().split(' ');
        const embed = new Discord.MessageEmbed()
        .addField(`${user.username}'s information`, `${user.tag}`)
        .addField(`Presence`, `${user.presence.status}`)
        .addField('Account created:\n ', `${userCreated[1]}, ${userCreated[2]}d  ${userCreated[3]}y, ${userCreated[4]}`)
        .setFooter(`ID: ${user.id}\n ｡^‿^｡`)
        .setTimestamp(msg.createdAt)
        .setColor('#5d5ddf')
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'alicard')) {
        const embed  = new Discord.MessageEmbed()
        .addField('Nep nep!', '``He is perv and lewding lolies >.<``', false)
        .setColor('#f53127')
        .setImage('https://cdn.discordapp.com/attachments/607250459622768640/740811878418219100/satan.png')
        msg.channel .send(embed)
    }

    if (msg.content === (prefix + 'ping')) {
        const embed = new Discord.MessageEmbed()
        .setColor('#5b5ddf')
        .setDescription("Nep! Ping: ``" + Math.round(client.ws.ping) + "`` ms")
        msg.channel.send(embed)
    }

    if (msg.content === (prefix + 'carrot')) {
        const embed = new Discord.MessageEmbed()
        .setColor('#5b5ddf')
        .setImage('https://cdn.discordapp.com/attachments/581531385639206935/740827197132242954/3099b51e40f0f8fd.gif')
        msg.channel.send(embed)
    }

    if (msg.content.startsWith(prefix + 'avatar')) {
        const user = msg.mentions.users.first();
        if (user === undefined) {
            const embed = new Discord.MessageEmbed()
            .addField('Nep nep!', `${msg.author.username}'s avatar`, false)
            .setImage(msg.author.displayAvatarURL())
            .setColor('#5b5ddf')
            msg.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .addField('Nep nep!', `${user.username}'s avatar`, false)
            .setImage(user.displayAvatarURL())
            .setColor('#5b5ddf')
            msg.channel.send(embed)
        }
    }
});

client.login(token);
