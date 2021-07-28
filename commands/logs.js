const config = require('../config.json');

module.exports = {
    name:'Set up logs',
    description:'Set up toutes les fonctionnalités du bot',
    fullSetUp: async function(msg)
    {
        const category = await msg.guild.channels.create('Administration', { type:'category' });
        
        category.updateOverwrite(await msg.guild.id, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        });
        category.updateOverwrite(await msg.guild.roles.fetch(category.id), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });

        msg.channel.send(`La nouvelle catégorie est ${category.name}`);
        
        const logsJoiners = await msg.guild.channels.create('✅・arrivées', { 
            type:'text',
            parent:category
        });

        const logsLeavers = await msg.guild.channels.create('👋・départs', {
            type:'text',
            parent:category
        });

        const logsChat = await msg.guild.channels.create('💬・logs-chat', {
            type:'text',
            parent:category
        });

        const logsVoice = await msg.guild.channels.create('🔊・logs-vocal', {
            type:'text',
            parent:category
        });

        const logsKickBan = await msg.guild.channels.create('💣・kick-ban', {
            type:'text',
            parent:category
        });

    },

    name:'Server infos',
    description:'Liste les caractéristiques et informations du serveur',
    serverInfos: function(Discord,msg)
    {
        const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setAuthor(`Server Infos`)
            .addField('Nom', `${msg.guild.name}`, true)
            .addField('Région', `${msg.guild.region}`, true)
            .addField('Membre', `${msg.guild.memberCount}`, true)
            .addField('Nitro boost', `Niveau : ${msg.guild.premiumTier}\nBoost : ${msg.guild.premiumSubscriptionCount}`,true)
            .setURL("https://www.discord.gg/inyourshell")
            .setThumbnail(msg.guild.iconURL())
            .setImage(msg.guild.bannerURL())
            //Nitro boost, propriétaire, date de création
            .setTimestamp()

        msg.channel.send(embed)
    },
}
