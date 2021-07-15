const config = require('../config.json');

module.exports = {
    name:"Bienvenu",
    description:"Accueille les nouveaux arrivants",
    welcome: function(client)
    {
        client.on("guildMemberAdd", member => {
            const arrivees = member.guild.channels.cache.find(channel => channel.name === '✅・arrivées');
        
            arrivees.send(`L'utilisateur ${member} vient de rejoindre le serveur !`);
        })
    },

    name:"Invalid",
    description:"Trigger quand un utilisateur n'a pas les permissions",
    invalidCommand: function(msg)
    {
        msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
    }
}