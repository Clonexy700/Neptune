const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ['https://thumbs.gfycat.com/CompletePotableDove-size_restricted.gif', 'https://i.pinimg.com/originals/0d/ba/6c/0dba6ce428e4199a9a2aef768b93b494.gif', 'https://media.tenor.com/images/19089cd2b4970740debff2cdfc43329a/tenor.gif',
'https://media1.tenor.com/images/79b965bb99fd58b94d2550b384093e75/tenor.gif?itemid=13668435', 'https://media1.tenor.com/images/b88fa314f0f172832a5f41fce111f359/tenor.gif?itemid=13356071', 'https://media0.giphy.com/media/ROF8OQvDmxytW/giphy.gif',
'https://i.gifer.com/3B6X.gif', 'https://i.gifer.com/Muck.gif', 'https://media.tenor.com/images/15dd673b469356e2129a0be61c81c3e1/tenor.gif', 'https://i.gifer.com/7JF.gif', 'https://mrwgifs.com/wp-content/uploads/2013/05/Dramatic-Crying-In-Anime-Gif.gif',
'https://64.media.tumblr.com/05a06bee54fd137f6dbde85c2fed0738/tumblr_oguirl6lGA1u7ltf6o2_400.gifv', 'https://i.pinimg.com/originals/f4/ef/bb/f4efbb0911cb0d6d3e8b1d1d4bdb83e1.gif', 'https://i.gifer.com/V2Kw.gif']

    return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = async(client, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .addField('Crying', `${msg.author} ✧ is crying right now`)
    .setImage(randomgif())
    .setFooter('( ╥ω╥ )')
    .setColor('#fed9f3')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "cry"
}