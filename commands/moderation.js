const config = require('../config.json');
const events = require('./events.js');

module.exports = {
    name:'kick',
    description:'Cette commande kick un utilisateur !',
    kickUser: function(msg)
    {
        if(!msg.member.hasPermission("KICK_MEMBERS")) return events.invalidCommand(msg)

        const member = msg.mentions.users.first();
        if(member){
            let target = msg.guild.members.cache.get(member.id);
            const reason = msg.content.split(" ").slice(2).join(' ');
            target.kick(reason);

            target = msg.mentions.users.first().username;    
            msg.channel.send(`L'utilisateur ${target} a bien été kick pour le motif suivant : ${reason}`);
        }else{
            msg.channel.send("Impossible de kick cet utilisateur !");
        }
    },

    name:'ban',
    description:'Cette commande ban un utilisateur !',
    banUser: function(msg)
    {
        if(!msg.member.hasPermission("BAN_MEMBERS")) return events.invalidCommand(msg)
        
        const member = msg.mentions.users.first();
        if(member){
            if (msg.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && msg.author.id !== msg.guild.ownerID)
            {
                let target = msg.guild.members.cache.get(member.id);
                const reason = msg.content.split(" ").slice(2).join(' ') || "Aucune raison spécifiée";
                target.ban({reason});
                
                target = member.username;    
                msg.channel.send(`L'utilisateur ${target} a bien été ban pour le motif suivant : ${reason}`);
            }else{
                msg.channel.send(`Vous ne pouvez pas ban un utilisateur plus gradé que vous.`);
            }
        }else{
            msg.channel.send("Impossible de ban cet utilisateur");
        }
    },

    name:'renew',
    description:'Cette commande renew un salon !',
    renewChannel: async function(msg)
    {
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
        
        const oldChannel = msg.channel;
        const newChannel = await msg.channel.clone();

        newChannel.setPosition(oldChannel.position);
        oldChannel.delete();
    },

    name:'prefix',
    description:'Cette commande change le préfix du bot !',
    //A continuer -> sauvegarder le préfixe
    newPrefix: function(msg)
    {
        if(!msg.member.hasPermission("ADMINISTRATOR")) return events.invalidCommand(msg)
        
        const param = msg.content.split(" ").slice(1);
        config.prefixCmd = param;

        msg.channel.send("Le nouveau préfixe est : " + param);
    },

    name:'lock',
    description:'Cette commande ferme un channel.',
    lockChannel: function(msg)
    {
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
    
        const channel = msg.mentions.channels.first() || msg.channel;
        
        channel.updateOverwrite(
            channel.guild.roles.everyone, 
            { VIEW_CHANNEL: true, SEND_MESSAGES: false }
        );
        
        msg.channel.send(`Le salon ${channel} a été bloquay.`);
    },

    name:'unlock',
    description:'Cette commande ouvre un channel.',
    unlockChannel: function(msg)
    {
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return events.invalidCommand(msg)
    
        const channel = msg.mentions.channels.first() || msg.channel;
        
        channel.updateOverwrite(
            channel.guild.roles.everyone, 
            { VIEW_CHANNEL: true, SEND_MESSAGES: true }
        );
        
        msg.channel.send(`Le salon ${channel} a été réouvert.`);
    },
}