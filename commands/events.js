const embed = require('../static/embed.js');
const security = require('./security.js');

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
        client.on("guildMemberAdd", async member => {
            const arrivees = member.guild.channels.cache.find(channel => channel.name === '✅・arrivées');
            const count = member.guild.channels.cache.find(channel => channel.name.match('🌍⋮ Membres :'));
            const content = `L'utilisateur ${member} vient de rejoindre le serveur !`;
            const color = '#2aff00'; 

            embed.embedWelcLeav(Discord,content,color,arrivees);
            count.setName('🌍⋮ Membres : ' + await member.guild.members.fetch().then(async(member) => member.filter(m => !m.user.bot).size));
        })  
    },

    name:"Bye bye",
    description:"Prévient du départ des membres",
    leave: function(client,Discord)
    {
        client.on("guildMemberRemove", async member => {
            const departs = member.guild.channels.cache.find(channel => channel.name === '👋・départs');
            const count = member.guild.channels.cache.find(channel => channel.name.match('🌍⋮ Membres :'));
            const content = `L'utilisateur ${member} vient de quitter le serveur !`;
            const color = '#ff0000';

            embed.embedWelcLeav(Discord,content,color,departs);
            count.setName('🌍⋮ Membres : ' + await member.guild.members.fetch().then(async(member) => member.filter(m => !m.user.bot).size));
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
                const join = `${oldState.member} a rejoint le vocal ${newUserChannel}.`;
                embed.embed(Discord,"A rejoint ⭐",join,logsVocal,'#2dff00');
            }else if(newUserChannel && oldUserChannel && oldState.streaming == false && newState.streaming == false && oldState.selfVideo == false && newState.selfVideo == false){
                const changed = `${oldState.member} a quitté le vocal ${oldUserChannel} et a rejoint ${newUserChannel}.`;
                embed.embed(Discord,"Changement de vocal 🔀 ",changed,logsVocal,'#fc00ff');
            }else if(oldState.streaming == false && newState.streaming == true){
                const stream = `${oldState.member} a commencé un stream dans ${newUserChannel}.`;
                embed.embed(Discord,"Début de stream ▶",stream,logsVocal,'#0006ff');
            }else if(oldState.streaming == true && newState.streaming == false){
                const stream = `${oldState.member} a arrêté un stream dans ${newUserChannel}.`;
                embed.embed(Discord,"Fin de stream ⏹",stream,logsVocal,'#ff9600');      
            }else if(oldState.selfVideo == false && newState.selfVideo == true){
                const camera = `${oldState.member} a activé sa caméra dans ${newUserChannel} `;
                embed.embed(Discord,"Caméra activée 📸",camera,logsVocal,'#ff007f')
            }else if(oldState.selfVideo == true && newState.selfVideo == false){
                const camera = `${oldState.member} a désactivé sa caméra dans ${newUserChannel} `;
                embed.embed(Discord,"Caméra désactivée 📷",camera,logsVocal,'#9900ff')
            }else{
                const left = `${oldState.member} a quitté le vocal ${oldUserChannel}.`;
                embed.embed(Discord,"A quitté 🚪",left,logsVocal,'#ff0000');
            }
        });
    },

    name:"Salons temporaires",
    description:"Crée des salons vocaux temporaires",
    temporaryVoc: function(client,Discord)
    {
        client.on("voiceStateUpdate", async (oldState, newState) => {
            const newUserChannel = newState.channel;
            const tempChannel = oldState.guild.channels.cache.find(channel => channel.name === '⏳⋮ Créer');
            
            if(newUserChannel == tempChannel)
            {
                const category = oldState.guild.channels.cache.find(category => category.name === '📁| Vocaux');
                const logsVocal = oldState.guild.channels.cache.find(channel => channel.name === '🔊・logs-vocal');
                const usr = oldState.member.displayName;

                if(!newState.guild.channels.cache.find(channel => channel.name === '⏳⋮ ' + usr))
                {
                    const newTemp = await oldState.guild.channels.create('⏳⋮ ' + usr, {
                        type:'voice',
                        parent:category
                    })
                    const contentTemp = `${newState.member} vient de créer le salon temporaire ${newTemp}`;
                    embed.embed(Discord,'A créé un vocal 🛃',contentTemp,logsVocal,'#00ff87');
                    
                    security.permTemp(newTemp,'everyone',newState);
                    security.permTemp(newTemp,'1' + newState.member,newState);
                    security.permTemp(newTemp,'Administrateur',newState);
                    /*security.permTemp(newTemp,'💻 ⥽ Administrateur',newState);
                    security.permTemp(newTemp,'📘 ⥽ S-Modérateur',newState);
                    security.permTemp(newTemp,'📘 ⥽ Modérateur',newState);
                    security.permTemp(newTemp,'📘 ⥽ Modérateur test',newState);
                    security.permTemp(newTemp,'🐸 ⥽ Aker',newState);
                    security.permTemp(newTemp,'💊 ⥽ Matrixé',newState);
                    security.permTemp(newTemp,'🥇 ⥽ Preau',newState);
                    security.permTemp(newTemp,'🥈 ⥽ Confirmé',newState);
                    security.permTemp(newTemp,'🥉 ⥽ Avancé',newState);
                    security.permTemp(newTemp,'🐱 ⥽ Noob',newState);
                    security.permTemp(newTemp,'👾 ⥽ Membre',newState);*/
                    
                    await oldState.member.voice.setChannel(newTemp);
                }else{
                    const newTemp = oldState.guild.channels.cache.find(channel => channel.name === '⏳⋮ ' + usr);
                    oldState.member.voice.setChannel(newTemp);
                }

            }
        });

        client.on('voiceStateUpdate', (oldState, newState) => {
            const channel = oldState.guild.channels.cache.find(channel => channel.name.match('⏳⋮ ') && channel.name !== '⏳⋮ Créer');
            
            if (oldState.channel === channel && channel.members.size === 0) {
                oldState.channel.delete();
            }
        });
    },
}