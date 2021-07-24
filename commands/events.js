const config = require('../config.json');
const embed = require('../static/embed.js');

module.exports = {
    name:"Commande invalide",
    description:"Trigger quand un utilisateur n'a pas les permissions",
    invalidCommand: function(msg)
    {
        msg.channel.send(`${msg.author} n'a pas la permission d'utiliser cette commande`)
    },

    name:"Bienvenu",
    description:"Accueille les nouveaux arrivants",
    welcome: function(client,Discord)
    {
        client.on("guildMemberAdd", member => {
            const arrivees = member.guild.channels.cache.find(channel => channel.name === '✅・arrivées');
            const content = `L'utilisateur ${member} vient de rejoindre le serveur !`;
            const color = '#2aff00'; 

            embed.embedWelcLeav(Discord,content,color,arrivees);
        })
    },

    name:"Bye bye",
    description:"Prévient du départ des membres",
    leave: function(client,Discord)
    {
        client.on("guildMemberRemove", member => {
            const departs = member.guild.channels.cache.find(channel => channel.name === '👋・départs');
            const content = `L'utilisateur ${member} vient de quitter le serveur !`;
            const color = '#ff0000';

            embed.embedWelcLeav(Discord,content,color,departs);
        })
    },

    name:"Logs delete messages",
    description:"Sauvegarde les messages supprimés des membres",
    eventMessage: function(client,Discord)
    {
        client.on("messageDelete", msg => {            
            const logsChat = msg.guild.channels.cache.find(channel => channel.name === '💬・logs-chat');
            const content = `**Message supprimé - ${msg.channel} :**\n ${msg.content}`;
            const author = `${msg.author.tag}`;

            embed.embed(Discord,author,content,logsChat);
        }),

        client.on("messageUpdate", msg => {
            const logsChat = msg.guild.channels.cache.find(channel => channel.name === '💬・logs-chat');
            const content = `**Message mis à jour - ${msg.channel} :**\n ${msg.content}`;
            const author = `${msg.author.tag}`;

            embed.embed(Discord,author,content,logsChat);
        })
    },
}