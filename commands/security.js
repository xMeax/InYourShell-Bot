const embed = require('../static/embed.js');

module.exports = {
    name:'antiLinks',
    description:'Cette commande bloque l\'envoie de liens externes au serveur discord',
    antiLinks: function(client,Discord)
    {
        client.on("message", msg =>{
            if(msg.channel !== msg.guild.channels.cache.find(channel => channel.name === '📖・ressources'))
            {
                const str = msg.content;
                const reason = `Pub vers un discord externe non autorisé ! ${msg.author}, vous avez reçu un avertissement. `;
                
                if(/discord\.gg\/\w+/g.test(str))
                {
                    msg.delete({reason});
                    //warn(msg);
                    embed.embed(Discord, 'Anti pub 🔗', reason, msg.channel,'#ff0000');
                }
            }
        })
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