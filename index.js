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
    if (hour == 15 && minutes == 17) {
        canale.send("Notifica")
    }
    if (hour == 15 && minutes == 17) {
        var embed = new Discord.MessageEmbed()
        .setTitle("Casoo")
        .setDescription("casooo")
        canale.send({embeds: [embed]})
    }
}
setInterval(oraAttuale, 1000*60);

