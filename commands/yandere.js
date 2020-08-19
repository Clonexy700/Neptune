const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ["https://media1.tenor.com/images/7132e6f39a0e4ada4e33d71056bcde67/tenor.gif?itemid=12858455",
    "https://media1.tenor.com/images/6d74b0a14b509395c24dd8a43bdfefcf/tenor.gif?itemid=12476875",
    "https://media1.tenor.com/images/ebd72fadecf1ee92620134820f7041c2/tenor.gif?itemid=5455607",
    "https://media1.tenor.com/images/f29cb39e3afc48508f377ce59ee65978/tenor.gif?itemid=10167774",
    "https://media1.tenor.com/images/e07e8466c814c2d872729fe4023541f4/tenor.gif?itemid=12858464",
    "https://media1.tenor.com/images/9935a3c918b54a487759e12f0691b2a6/tenor.gif?itemid=12858466",
    "https://media1.tenor.com/images/1ce4f3195a34951af451412f385ec30a/tenor.gif?itemid=12858461",
    "https://media1.tenor.com/images/b844b8b2d1a4424f1308d13ee24487a5/tenor.gif?itemid=5344617",
    "https://media1.tenor.com/images/a3e3ce17096ace560058c8c254ab7c86/tenor.gif?itemid=12507777",
    "https://media1.tenor.com/images/9d64a1ce08da487d468ae7a055729b66/tenor.gif?itemid=14593966",
    "https://media1.tenor.com/images/9ed18e229bde8a4cd47f1587c887c5ac/tenor.gif?itemid=5428628",
    "https://media1.tenor.com/images/f3bf85ec59620ba85cf2a6a5e0245571/tenor.gif?itemid=13173092",
    "https://media1.tenor.com/images/e0ecc5586420e2bff3ef46bcad940745/tenor.gif?itemid=15158440",
    "https://media1.tenor.com/images/d10f561068060b7175ba14b9ebef409e/tenor.gif?itemid=12174461",
    "https://media1.tenor.com/images/52c4d55c27725df1b0a35178ad7cbc08/tenor.gif?itemid=10166732",
    "https://media.tenor.com/images/82b74068ad8e9be8c3a6678b11259c6a/tenor.gif"]

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .addField('Yandere', `${msg.author} ✧ is in yandere mode now`)
    .setImage(randomgif())
    .setFooter('(^ω^)ノﾞ(((((((((●～*')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "yandere"
}