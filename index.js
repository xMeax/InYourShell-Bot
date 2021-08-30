const Discord = require('discord.js');
const client = new Discord.Client({
    partials: [
        "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"
    ]
});
const config = require('./config.json');
const moderation = require('./commands/moderation');
const roles = require('./commands/roles.js');
const logs = require('./commands/logs.js');
const events = require('./commands/events.js');
const tickets = require('./commands/tickets.js');
const security = require('./commands/security');
const { setupTicket } = require('./commands/tickets.js');

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("Mon BOT est Connecté");
    client.user.setActivity(".gg/inyourshell", { type:'WATCHING' });
})

// Gestion des évènements
events.welcome(client,Discord);
events.leave(client,Discord);
events.eventMessage(client,Discord);
events.eventVocal(client,Discord);
events.temporaryVoc(client,Discord);
security.antiLinks(client,Discord);
tickets.reactTickets(client,Discord);

// Répondre à un message
client.on("message", msg => {
    // Si le message n'est pas préfixé il est ignoré
    if(!msg.content.startsWith(config.prefixCmd) || msg.author.bot) return

    // Split string et préfixe
    const args = msg.content.slice(config.prefixCmd.length).trim().split(/ +/);
    // Extraction commande
    const command = args.shift().toLowerCase();
    
    //Commandes utilisateurs
    const commands = new Map([
        ['ping', () => msg.channel.send("Pong")],
        ['kick', () => moderation.kickUser(msg)],
        ['ban', () => moderation.banUser(msg)],
        ['renew', () => moderation.renewChannel(msg)],
        ['prefix', () => moderation.newPrefix(msg)],
        ['lock', () => moderation.lockChannel(msg)],
        ['unlock', () => moderation.unlockChannel(msg)],
        ['addrole', () => roles.addRole(msg)],
        ['removerole', () => roles.removeRole(msg)],
        ['fullsetup', () => logs.fullSetUp(msg)],
        ['server', () => logs.serverInfos(Discord,msg)],
        ['setupticket', () => tickets.setupTicket(Discord,msg)],
        ['countdiscord', () => logs.countDiscord(msg)],
    ]);

    commands.get(command).call();
})

client.login(config.token);

//FAIRE UN PUTAIN DE TOOL A LA LINUX WOULA