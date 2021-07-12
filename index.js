const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moderation = require('./commands/moderation');

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("Mon BOT est Connecté");
    client.user.setActivity(".gg/inyourshell", {type:'WATCHING'});
})

function invalidCommand(msg)
{
    msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
}
// Répondre à un message
client.on("message", msg => {
    // Si le message n'est pas préfixé il est ignoré
    if(!msg.content.startsWith(config.prefixCmd) || msg.author.bot) return

    // Split string et préfixe
    const args = msg.content.slice(config.prefixCmd.length).trim().split(/ +/);
    // Extraction commande
    const command = args.shift().toLowerCase();
    // Extraction paramètres
    //const param = msg.content.split(" ").slice(2);

    //Commandes utilisateurs
    switch(command)
    {
        case "ping":
            msg.channel.send("Pong");
            break;
        case "kick":
            if(!msg.member.hasPermission("KICK_MEMBERS")) return invalidCommand(msg)
            moderation.kickUser(msg);
            break;
        case "ban":
            if(!msg.member.hasPermission("BAN_MEMBERS")) return invalidCommand(msg)
            moderation.banUser(msg);
            break;
        case "renew":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return invalidCommand(msg)
            moderation.renewChannel(msg);
            break;
        case "prefix":
            if(!msg.member.hasPermission("ADMINISTRATOR")) return invalidCommand(msg)
            moderation.newPrefix(msg);
            break;
        case "lock":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return invalidCommand(msg)
            moderation.lockChannel(msg);
            break;
        case "unlock":
            if(!msg.member.hasPermission("MANAGE_CHANNELS")) return invalidCommand(msg)
            moderation.unlockChannel(msg);
            break;
        case "addrole":
            if(!msg.member.hasPermission("MANAGE_ROLES")) return invalidCommand(msg)
            moderation.addRole(msg);
            break;
        default:
            msg.channel.send("Taper !help pour la liste des commandes !");
            break;
    }
})

client.login(config.token);
