const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(client, msg, args) => {

    let level_stats = JSON.parse(fs.readFileSync("./stats.json", "utf-8"));
    var user = msg.mentions.users.first();
    if (user === undefined) {
        var user = msg.author
    }
    const guildLvlStats = level_stats[msg.guild.id];
    const userLvlStats = guildLvlStats[user.id];
    const xpToNextLevel = 5 * Math.pow(userLvlStats.level, 2) + 50 * userLvlStats.level + 100
    var user_lvl = userLvlStats.level
    var user_xp = userLvlStats.xp
    var needed = xpToNextLevel - user_xp
    const embed = new Discord.MessageEmbed()
    .setDescription(`──────────✧.°୭.──────────\n${user}'s Account level table\nLevel: **${user_lvl}**\nExp: **${user_xp}/${xpToNextLevel}**\nExp left to the next level: **${needed}**\n──────────✧.°୭.──────────\n\n ⁣ ⁣⁣⁣⁣⁣      ⁣  ⁣⁣⁣⁣⁣⁣   (⁄ ⁄•⁄ω⁄•⁄ ⁄)`)
    .setColor('#fed9f3')
    .setImage('https://cdn.discordapp.com/attachments/607250459622768640/742665593106464799/a8553ff5501a4099cde21635644a8aad35e44106r1-320-4_hq.gif')
    msg.channel.send(embed)
}

module.exports.config = {
    command: "lvl"
}