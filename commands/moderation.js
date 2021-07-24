const config = require('../config.json');

module.exports = {
    name:'kick',
    description:'Cette commande kick un utilisateur !',
    kickUser: function(msg)
    {
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
        const member = msg.mentions.users.first();
        if(member){
            let target = msg.guild.members.cache.get(member.id);
            const reason = msg.content.split(" ").slice(2).join(' ');
            target.ban({reason});

            target = member.username;    
            msg.channel.send(`L'utilisateur ${target} a bien été ban pour le motif suivant : ${reason}`);
        }else{
            msg.channel.send("Impossible de ban cet utilisateur");
        }
    },

    name:'renew',
    description:'Cette commande renew un salon !',
    renewChannel: async function(msg)
    {
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
        const param = msg.content.split(" ").slice(1);
        config.prefixCmd = param;

        msg.channel.send("Le nouveau préfixe est : " + param);
    },

    name:'lock',
    description:'Cette commande ferme un channel.',
    lockChannel: function(msg)
    {
        const channel = msg.channel;
        
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
        const channel = msg.channel;
        
        channel.updateOverwrite(
            channel.guild.roles.everyone, 
            { VIEW_CHANNEL: true, SEND_MESSAGES: true }
        );
        
        msg.channel.send(`Le salon ${channel} a été réouvert.`);
    },
}