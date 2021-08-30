const config = require('../config.json');

module.exports = {
    name:'addRole',
    description:'Cette commande ajoute un rôle à un utilisateur.',
    addRole: function(msg)
    {
        if(!msg.member.hasPermission("MANAGE_ROLES")) return events.invalidCommand(msg)
    
        const member = msg.mentions.users.first();
        const reason = msg.content.split(" ").slice(2).join(' ');
        const newRole = msg.guild.roles.cache.find(role => role.name === reason);

        if(member)
        {
            const target = msg.guild.members.cache.get(member.id);
            if(newRole)
            {
                target.roles.add(newRole);
                msg.channel.send(`Le rôle ${newRole.name} a bien été ajoutay à l'utilisateur ${member}`);
            }else{
                msg.channel.send("Veuillez spécifiay un rôle existant.")
            }
        }else{
            msg.channel.send("Veuillez spécifiay un utilisateur existant.")
        }
    },

    name:'removeRole',
    description:'Cette commande supprime un rôle à un utilisateur.',
    removeRole: function(msg)
    {
        if(!msg.member.hasPermission("MANAGE_ROLES")) return events.invalidCommand(msg)
    
        const member = msg.mentions.users.first();
        const reason = msg.content.split(" ").slice(2).join(' ');
        const oldRole = msg.guild.roles.cache.find(role => role.name === reason);

        if(member)
        {
            const target = msg.guild.members.cache.get(member.id);
            if(oldRole)
            {
                target.roles.remove(oldRole);
                msg.channel.send(`Le rôle ${oldRole.name} a bien été ajoutay à l'utilisateur ${member}`);
            }else{
                msg.channel.send("Veuillez spécifiay un rôle existant.")
            }
        }else{
            msg.channel.send("Veuillez spécifiay un utilisateur existant.")
        }
    }
}