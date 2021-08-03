const config = require('../config.json');

module.exports = {
    name:'antiLinks',
    description:'Cette commande bloque l\'envoie de liens externes au serveur discord',
    antiLinks: function(msg)
    {
        const str = msg.content;
        const regex = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
        const reason = 'Lien externe';
        const author = msg.author;
        
        if(str.match(regex))
        {
            msg.delete(reason);
            warn(author,msg);
            msg.channel.send('Attention, il est interdit d\'envoyer des liens externes dans le channel ' + msg.channel.name + ' !');
        }
    },

    name:'warn',
    description:'Cette fonction permet de warn un utilisateur',
    warn: function(msg)
    {
        //A continuer -> sauvegarde des warns
        msg.channel.send('L\'utilisateur ' + author.username + ' a pris un avertissement.');
    },

    name:'Perm staff',
    description:'Met les perms à toute l\'équipe du staff',
    permsStaff: function(channel,roleStaff,usr)
    {
        if(roleStaff === 'everyone') 
        {
            channel.updateOverwrite(
                channel.guild.roles.everyone, 
                { VIEW_CHANNEL: false, SEND_MESSAGES: false }
            )
        }else if(roleStaff.match('1')){            
            channel.updateOverwrite(
                usr,
                { VIEW_CHANNEL: true, SEND_MESSAGES: true }
            );
        }else{
            channel.updateOverwrite(
                channel.guild.roles.cache.find(role => role.name === roleStaff),
                { VIEW_CHANNEL: true, SEND_MESSAGES: true }
            );
        }
    },

    name:'Perm user',
    description:'Permissions pour les users',
    permTemp: function(channel,roleStaff,usr)
    {
        if(roleStaff === 'everyone')
        {
            channel.updateOverwrite(
                channel.guild.roles.everyone,
                { VIEW_CHANNEL: false, CONNECT: false}
            );
        }else if(roleStaff.match('1')){
            channel.updateOverwrite(
                usr.member,
                { MANAGE_CHANNELS: true, MUTE_MEMBERS: true, DEAFEN_MEMBERS: true, MOVE_MEMBERS: true }
            );
        }else{
            channel.updateOverwrite(
                channel.guild.roles.cache.find(role => role.name === roleStaff),
                { VIEW_CHANNEL: true, CONNECT: true }
            );
        }
    },
}