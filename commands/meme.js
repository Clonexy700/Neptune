const Discord = require("discord.js");
const randomPuppy = require("random-puppy")
module.exports.run = async(client, msg, args) => {
    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const embed = new Discord.MessageEmbed()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#fed9f3')
    .setTitle(`From /r/${random}`)
    .setURL(`https://reddit.com/${random}`)
    .setImage(img)
    msg.channel.send(embed);
}
    

module.exports.config = {
    command: "meme"
}