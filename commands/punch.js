const Discord = require('discord.js');
const fs = require('fs');
function randomgif() {
    var rand = ["https://media1.tenor.com/images/1c986c555ed0b645670596d978c88f6e/tenor.gif?itemid=13142581",
    "https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif?itemid=4790446",
    "https://media1.tenor.com/images/d7c30e46a937aaade4d7bc20eb09339b/tenor.gif?itemid=12003970",
    "https://media1.tenor.com/images/c621075def6ca41785ef4aaea20cc3a2/tenor.gif?itemid=7679409",
    "https://media1.tenor.com/images/6d77cf1fdaa2e7c6a32c370240a7b77c/tenor.gif?itemid=9523306",
    "https://media1.tenor.com/images/965fabbfcdc09ee0eb4d697e25509f34/tenor.gif?itemid=7380310 ",
    "https://media1.tenor.com/images/745d16a823805edbfe83aa9363c48a87/tenor.gif?itemid=12003981",
    "https://media1.tenor.com/images/f03329d8877abfde62b1e056953724f3/tenor.gif?itemid=13785833",
    "https://media1.tenor.com/images/7d43687195b86c8ce2411484eb1951fc/tenor.gif?itemid=7922533",
    "https://media1.tenor.com/images/6afcfbc435b698fa5ceb2ff019718e6d/tenor.gif?itemid=10480971",
    "https://media1.tenor.com/images/b82427b0507d43afb17a6c9ddddfa0a9/tenor.gif?itemid=4903584",
    "https://media1.tenor.com/images/995c766275e66c3aa5efd55ab7d8f86a/tenor.gif?itemid=7885164",
    "https://media1.tenor.com/images/cf467247b8755bcb943dc535ccfd1830/tenor.gif?itemid=9753290",
    "https://media1.tenor.com/images/29ecede6bfa61d6a2fbfb4b63620cdb4/tenor.gif?itemid=14613404",
    "https://media1.tenor.com/images/d37431cbc9bd68eca0d700c787bf33d0/tenor.gif?itemid=5521090",
    "https://media1.tenor.com/images/d7d52d0592bbc77bd5c629c2132c1b33/tenor.gif?itemid=9409159",
    "https://media1.tenor.com/images/313bb02914ddb9262511b790ef4d4c7b/tenor.gif?itemid=7922535",
    "https://cdn.discordapp.com/attachments/624296774747553808/639094165732589580/30.gif",
    "https://cdn.discordapp.com/attachments/624296774747553808/639094187903680522/31.gif",
    "https://pa1.narvii.com/6329/041aa0724fb6e5dbf71681a80b86d5d1add8f8c8_hq.gif"]

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