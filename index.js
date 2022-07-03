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

    var canale = client.channels.cache.get("")
    if (hour == 13 && minutes == 27) {
        canale.send("<@&> Non segui ancora il re dei barbari sui vari social? Vai subito a farci un salto e lascia un bel follow!")
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


client.on("guildMemberAdd", member => {
    if(member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setFooter({text: "Re_Dei_Barbari"})
        .setImage("https://media.discordapp.net/attachments/987775840009994253/992784772332011571/Immagine_2022-07-02_153022.png")
        .setDescription(`Hey ${member.toString()}, benvenuto nel server di Re_Dei_Barbari. Vai a leggere il regolamento in <#926237313279881316>`)
        .setTimestamp()
 
    client.channels.cache.get("987827065610960897").send({embeds: [embed]});
});

client.on("guildMemberRemove", member => {
    if(member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setFooter({text: "Re_Dei_Barbari"})
        .setImage("https://media.discordapp.net/attachments/987775840009994253/992784772332011571/Immagine_2022-07-02_153022.png")
        .setDescription(`${member.toString()} è uscito dal server. Noooo sad...`)
        .setTimestamp()

    client.channels.cache.get("988487931947778149").send({embeds: [embed]});
})

client.on("messageCreate", message => {
    if (message.content == "!ms") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Ping del bot")
            .setDescription("Ecco la latenza del bot")
            .addField("Ping", `${client.ws.ping}ms`)

        message.channel.send({embeds: [embed]})
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!clear")) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non ho il permesso');
        }
        let count = parseInt(message.content.split(/\s+/)[1]);
        if (!count) {
            return message.channel.send("Inserisci un numero valido")
        }
        if (count > 500) {
            return message.channel.send("Non puoi cancellare più di 200 messaggi")
        }
        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
});


client.on("messageCreate", message => {
    var parolacce = ["porco dio", "cazzo", "diocane", "dio cane","merda", "DIOCANE", "NEGRO", "n3gro", "negr0", "Negro", "Cazzo", "Porco dio", "Dio cane", "Porca madonna", "PORCA MADONNA","gay", "G4y", "GAY"]
    var trovata = false; 

    parolacce.forEach(parola => {
        if (message.content.includes(parola)) {
             trovata = true;
        }
    })

    if(trovata) {
        message.delete();
        var utente = message.mentions.members.first();
        var embed = new Discord.MessageEmbed()
            .setTitle("Parola probita")
            .setDescription(`Hai scritto una parola proibita`)
        
        message.channel.send({embeds: [embed]})
    }
});

client.on("messageCreate", message => {
    if (message.content.startsWith("!benvenuto")) {
        if (message.content == "!benvenuto") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.permissions.has(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("E' un bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account creato", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Entrato nel server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permessi", "```" + elencoPermessi + "```", false)
            .addField("Ruoli", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send({embeds: [embed]})
    }
});

client.on("messageCreate", message => {
    if (message.content == "!verifica") {
        var embed = new Discord.MessageEmbed()
        .setColor("#F636DF")
        .setDescription("Dopo aver letto attentamente il regolamento interagisci con la reazione per iniziare")
    message.channel.send({embeds: [embed]})
        .then(msg => {
            msg.react("👍")
        })
    }
})

client.on("messageCreate", message => {
    if (message.content == "!ticket") {
        var button1 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("PRIMARY")

        var row = new Discord.MessageActionRow()
            .addComponents(button1)
    
        message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicket") {
        interaction.deferUpdate()
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("Hai gia un ticket aperto").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "987775840009994251", 
        }).then(canale => {
            canale.send("Grazie per aver aperto un ticket aspetta che un moderatore ti risponda")
        })
    }
})

client.on("messageCreate", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non ho il permesso');
        }
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: true
                })
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
                if (utente.permissions.has("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: false
                })
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
});

client.on("messageCreate", message => {
    if (message.content == "!versionebot") {
        var embed = new Discord.MessageEmbed()
        .setColor("#F636DF")
        .setTitle("Versione bot")
        .setDescription("Ecco la versione del bot attuale: v1.0")

    message.channel.send({embeds: [embed]})    
    }
})
