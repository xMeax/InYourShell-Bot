const config = require('../config.json');

module.exports = {
    name:'addRole',
    description:'Cette commande ajoute un rôle à un utilisateur.',
    addRole: function(msg)
    {
        const member = msg.mentions.users.first();
        const newRole = msg.mentions.roles.first();    

        if(member)
        {
            const target = msg.guild.members.cache.get(member.id);
            if(newRole)
            {
                target.roles.add(newRole);
                msg.channel.send("Le rôle " + newRole.name + " a bien été ajoutay à l'utilisateur " + member.username);
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
        const member = msg.mentions.users.first();
        const newRole = msg.mentions.roles.first();    

        if(member)
        {
            const target = msg.guild.members.cache.get(member.id);
            if(newRole)
            {
                target.roles.remove(newRole);
                msg.channel.send("Le rôle " + newRole.name + " a bien été retiray à l'utilisateur " + member.username);
            }else{
                msg.channel.send("Veuillez spécifiay un rôle existant.")
            }
        }else{
            msg.channel.send("Veuillez spécifiay un utilisateur existant.")
        }
    }
}