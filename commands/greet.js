const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ['https://thumbs.gfycat.com/QuarterlyMellowAmurminnow-small.gif', 'https://media.tenor.com/images/b5e6535437f98c48eaefea445b097668/tenor.gif', 'https://media.tenor.com/images/6ed6c00826f75f1a24921663581576cd/tenor.gif',
'https://media.tenor.com/images/21f53e7521c2262f778cb71bd671522b/tenor.gif', 'https://media.tenor.com/images/408866348c81c86db4c33a6daff2e6eb/tenor.gif', 'https://media.tenor.com/images/b96f06f81933f49b6d24577017eb4edd/tenor.gif', 'https://media.tenor.com/images/251d736302c3dcdb755b9aa59174556d/tenor.gif',
'https://thumbs.gfycat.com/SleepyTenderCrayfish-size_restricted.gif', 'https://i.kym-cdn.com/photos/images/original/001/371/139/a10.gif', 'https://media.tenor.com/images/528d443dcea42078e911ef4b1cba8625/tenor.gif', 'https://media.tenor.com/images/952929a2a92426c0a7e73886f0b2582d/tenor.gif',
'https://pa1.narvii.com/5695/f117c2303c8c8c1ea471fbe7d7dfecc752692bbd_hq.gif', 'https://image.myanimelist.net/ui/gDEE1QGHMmMAOJRb4Q-ehqF7ckhcVAUyzogC6VP5vLRfZvPmxqZSesrY7To5I7-5c4KbOY3j_H9-tM3uu_VYkol0eLS8ziNVmWBywwIfmGx-_1uttPQiPRLm7cgQpArB', "https://i.gifer.com/Q71.gif", 'https://33.media.tumblr.com/8fe6b9eb58ea74411fe6047aaa67f652/tumblr_inline_mv07xetIMS1rb40sz.gif']

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .addField('Crying', `${msg.author} ✧ greets`)
    .setImage(randomgif())
    .setFooter('(つ≧▽≦)つ')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "greet"
}