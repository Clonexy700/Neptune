const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

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

    userdata[msg.author.id].msgsent++;

    fs.writeFile('storage/userdata.json', JSON.stringify(userdata), (err) => {
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


});

client.login(token);
