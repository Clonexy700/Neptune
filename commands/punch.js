const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ["https://media1.tenor.com/images/f0a7f04a7bc32029cc1273d06b93237f/tenor.gif?itemid=13451464",
    "https://media1.tenor.com/images/5f73f2a7b302a3800b3613095f8a5c40/tenor.gif?itemid=10005495",
    "https://media1.tenor.com/images/359d9a5038eb688e9d5b25eead83ad3e/tenor.gif?itemid=4854805",
    "https://media1.tenor.com/images/5c5828e51733c8ffe1c368f1395a03d0/tenor.gif?itemid=14231351",
    "https://media1.tenor.com/images/5c5828e51733c8ffe1c368f1395a03d0/tenor.gif?itemid=14231351",
    "https://media1.tenor.com/images/f46762ad38fbfed9e4e46bf7b89497c2/tenor.gif?itemid=12141724",
    "https://media1.tenor.com/images/7132e6f39a0e4ada4e33d71056bcde67/tenor.gif?itemid=12858455",
    "https://media1.tenor.com/images/6b701503b0e5ea725b0b3fdf6824d390/tenor.gif?itemid=12141727",
    "https://media1.tenor.com/images/c4f68fbbec3c96193386e5fcc5429b89/tenor.gif?itemid=13451325",
    "https://media1.tenor.com/images/1a2d051f28155db0e4cf175d987cdac2/tenor.gif?itemid=12141721",
    "https://media1.tenor.com/images/efd46743771a78e493e66b5d26cd2af1/tenor.gif?itemid=14002773",
    "https://media1.tenor.com/images/fc0ef2ba03d82af0cbd6c5815c3c83d5/tenor.gif?itemid=12141725",
    "https://media1.tenor.com/images/ec2ca0bf12d7b1a30fea702b59e5a7fa/tenor.gif?itemid=13417195",
    "https://media1.tenor.com/images/81769ee6622b5396d1489fb4667fd20a/tenor.gif?itemid=14376074",
    "https://media1.tenor.com/images/1925e468ff1ac9efc2100a3d092c54ff/tenor.gif?itemid=4718221",
    "https://media1.tenor.com/images/d702fa41028207c6523b831ec2db9467/tenor.gif?itemid=5990650",
    "https://media1.tenor.com/images/5ca31fd724f6baca41e366db4258a1e6/tenor.gif?itemid=12141726",
    "https://cdn.idunetwork.eu.org/images/lick/7.gif"]

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    var user = msg.mentions.users.first();
    if (user === undefined) {
        var user = 'you';
    }
    var message = args.slice(1, args.length).join(" ");
    const embed = new Discord.MessageEmbed()
    .addField('Punching', `${msg.author} ✧ ${user} | ${message}`)
    .setImage(randomgif())
    .setFooter('୧((#Φ益Φ#))୨')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "punch"
}