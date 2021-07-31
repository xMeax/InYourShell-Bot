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
            const content = `**Message supprimé - ${msg.channel} - ${msg.member}:**\n ${msg.content}`;
            const author = `Message supprimé 🗨`;

            embed.embed(Discord,author,content,logsChat,'#ff0000');
        }),

        client.on("messageUpdate", (oldMsg, newMsg) => {
            const logsChat = oldMsg.guild.channels.cache.find(channel => channel.name === '💬・logs-chat');
            const content = `**Message mis à jour - ${oldMsg.channel} - ${oldMsg.member} :**\n**Ancien message :** ${oldMsg.content}\n**Nouveau message : **${newMsg.content}`;
            const author = `Message modifié 💭`;

            embed.embed(Discord,author,content,logsChat,'#ff8b00');
        })
    },

    name:"Events vocal",
    description:"Sauvegarde les actions en vocal des membres",
    eventVocal: function(client,Discord)
    {
        client.on("voiceStateUpdate", async (oldState, newState) => {
            const newUserChannel = newState.channel;
            const oldUserChannel = oldState.channel;
            const logsVocal = oldState.guild.channels.cache.find(channel => channel.name === '🔊・logs-vocal');

            if(newUserChannel && !oldUserChannel)
            {
                const join = `${oldState.member} a rejoint le vocal ${newUserChannel.name}.`;
                embed.embed(Discord,"A rejoint ⭐",join,logsVocal,'#2dff00');
            }else if(newUserChannel && oldUserChannel && oldState.streaming == false && newState.streaming == false && oldState.selfVideo == false && newState.selfVideo == false){
                const changed = `${oldState.member} a quitté le vocal ${oldUserChannel.name} et a rejoint ${newUserChannel.name}.`;
                embed.embed(Discord,"Changement de vocal 🔀 ",changed,logsVocal,'#fc00ff');
            }else if(oldState.streaming == false && newState.streaming == true){
                const stream = `${oldState.member} a commencé un stream dans ${newUserChannel.name}.`;
                embed.embed(Discord,"Début de stream ▶",stream,logsVocal,'#0006ff');
            }else if(oldState.streaming == true && newState.streaming == false){
                const stream = `${oldState.member} a arrêté un stream dans ${newUserChannel.name}.`;
                embed.embed(Discord,"Fin de stream ⏹",stream,logsVocal,'#ff9600');      
            }else if(oldState.selfVideo == false && newState.selfVideo == true){
                const camera = `${oldState.member} a activé sa caméra dans ${newUserChannel.name} `;
                embed.embed(Discord,"Caméra activée 📸",camera,logsVocal,'#ff007f')
            }else if(oldState.selfVideo == true && newState.selfVideo == false){
                const camera = `${oldState.member} a désactivé sa caméra dans ${newUserChannel.name} `;
                embed.embed(Discord,"Caméra désactivée 📷",camera,logsVocal,'#9900ff')
            //}else if(oldState.serverMute)
            }else{
                const left = `${oldState.member} a quitté le vocal ${oldUserChannel.name}.`;
                embed.embed(Discord,"A quitté 🚪",left,logsVocal,'#ff0000');
            }
        })
    },
}