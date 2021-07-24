const Discord = require('discord.js');
const client = new Discord.Client({
    partials: [
        "GUILD_MEMBER"
    ]
});
const config = require('./config.json');
const moderation = require('./commands/moderation');
const roles = require('./commands/roles.js');
const logs = require('./commands/logs.js');
//const security = require('./commands/security.js');
const events = require('./commands/events.js');
//const embed = require('./static/embed.js');

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("Mon BOT est Connecté");
    client.user.setActivity(".gg/inyourshell", {type:'WATCHING'});
})

// Gestion des évènements
events.welcome(client,Discord);
events.leave(client,Discord);
events.eventMessage(client,Discord); 

// Répondre à un message
client.on("message", msg => {
    // Si le message n'est pas préfixé il est ignoré
    if(!msg.content.startsWith(config.prefixCmd) || msg.author.bot) return

    // Split string et préfixe
    const args = msg.content.slice(config.prefixCmd.length).trim().split(/ +/);
    // Extraction commande
    const command = args.shift().toLowerCase();

    //Commandes utilisateurs
    switch(command)
    {
        case "ping":
            msg.channel.send("Pong");
            break;
        case "kick":
            if(!msg.member.hasPermission("KICK_MEMBERS")) return events.invalidCommand(msg)
            moderation.kickUser(msg);
            break;
        case "ban":
            if(!msg.member.hasPermission("BAN_MEMBERS")) return events.invalidCommand(msg)
            moderation.banUser(msg);
            break;
        case "renew":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
            moderation.renewChannel(msg);
            break;
        case "prefix":
            if(!msg.member.hasPermission("ADMINISTRATOR")) return events.invalidCommand(msg)
            moderation.newPrefix(msg);
            break;
        case "lock":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
            moderation.lockChannel(msg);
            break;
        case "unlock":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
            moderation.unlockChannel(msg);
            break;
        case "addrole":
            if(!msg.member.hasPermission("MANAGE_ROLES")) return events.invalidCommand(msg)
            roles.addRole(msg);
            break;
        case "removerole":
            if(!msg.member.hasPermission("MANAGE_ROLES")) return events.invalidCommand(msg)
            roles.removeRole(msg);
            break;
        case "fullsetup":
            if(!msg.member.hasPermission("ADMINISTRATOR")) return events.invalidCommand(msg)
            logs.fullSetUp(msg);
            break;
        default:
            msg.channel.send("Taper !help pour la liste des commandes !");
            break;
    }
})

client.login(config.token);

//FAIRE UN PUTAIN DE TOOL A LA LINUX WOULA