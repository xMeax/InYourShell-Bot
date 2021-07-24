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

        msg.channel.send('La nouvelle catégorie est ' + category.name);
        
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
}