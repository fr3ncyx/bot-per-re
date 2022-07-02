const Discord = require("discord.js")
const client = new Discord.Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
})
const fs = require("fs");

client.login(process.env.token)

client.on("ready", () => {
    console.log("Bot online")
})

client.on("ready", () => {
    client.user.setActivity("Re_dei_Barbari", {
        type: "PLAYING",
        url: "https://discord.gg/G7xZ3rfK"
    });
})

client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    member.roles.add("");
});

client.on("messageCreate", message => {
    if (message.content.startsWith("!ban")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.bannable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.ban()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} bannato`)
                    .setDescription(`Utente bannato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!kick")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.kickable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.kick()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} kickato`)
                    .setDescription(`Utente kickato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }
})

function oraAttuale() {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();

    var canale = client.channels.cache.get("987775840009994253")
    if (hour == 13 && minutes == 27) {
        canale.send("<@987775840009994250> Non segui ancora il re dei barbari sui vari social? Vai subito a farci un salto e lascia un bel follow!")
    }
    if (hour == 13 && minutes == 27) {
        var embed = new Discord.MessageEmbed()
        .setColor("#7B3473")
        .setTitle("Twich")
        .setDescription("Segui il re dei barbari su twich!")
        .setURL("https://www.twitch.tv/re_dei_barbari")
        canale.send({embeds: [embed]})
    }
    if (hour == 13 && minutes == 27) {
        var embed = new Discord.MessageEmbed()
        .setColor("#F636DF")
        .setTitle("Instagram")
        .setDescription("Segui il re dei barbari su instagram")
        .setURL("https://www.instagram.com/re_dei_barbari/")
        canale.send({embeds: [embed]})
    }
}
setInterval(oraAttuale, 1000*60);

