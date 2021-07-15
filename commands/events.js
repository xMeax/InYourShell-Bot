const config = require('../config.json');

module.exports = {
    name:"Commande invalide",
    description:"Trigger quand un utilisateur n'a pas les permissions",
    invalidCommand: function(msg)
    {
        msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
    },

    name:"Bienvenu",
    description:"Accueille les nouveaux arrivants",
    welcome: function(client)
    {
        client.on("guildMemberAdd", member => {
            const arrivees = member.guild.channels.cache.find(channel => channel.name === '✅・arrivées');
        
            arrivees.send(`L'utilisateur ${member} vient de rejoindre le serveur !`);
        })
    },

    name:"Bye bye",
    description:"Préviens du départ des membres",
    leave: function(client)
    {
        client.on("guildMemberRemove", member => {
            const departs = member.guild.channels.cache.find(channel => channel.name === '👋・départs');

            departs.send(`L'utilisateur ${member} vient de quitter le serveur !`);
        })
    },

    name:"Logs delete messages",
    description:"Sauvegarde les messages supprimés des membres",
    eventMessage: function(client)
    {
        client.on("messageDelete", msg => {
            const logsChat = msg.guild.channels.cache.find(channel => channel.name === '💬・logs-chat');
            logsChat.send(`Le message suivant de ${msg.author} a été supprimé : \n${msg.content}`);
        })

        client.on("messageUpdate", msg => {
            const logsChat = msg.guild.channels.cache.find(channel => channel.name === '💬・logs-chat');
            logsChat.send(`Le message suivant de ${msg.author} a été modifié : \n${msg.content}`);
        })
    },
}