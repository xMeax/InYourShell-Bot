const moderation = require("./moderation.js");

module.exports = {
/*
Différentes catégories :
-Social
-Technique
-Staff
*/
    name:'setupticket',
    description:'Setup le message de création de tickets',
    setupTicket: async function(Discord,msg)
    {
        const ticket = '📄・tickets';
        let category = msg.guild.channels.cache.find(category => category.name === '📂| Support');
        let ticketsChannel = msg.guild.channels.cache.find(channel => channel.name === ticket);
        
        if(!category && !ticketsChannel)
        {
            const category = await msg.guild.channels.create('📂| Support', { type:'category' });
            const ticketsChannel = await msg.guild.channels.create(ticket, { 
                type:'text',
                parent:category 
            });
            
            msg.channel.send(`${category.name} et ${ticketsChannel.name} ont bien été créé.`);
        }else if(category && !ticketsChannel){
            const ticketsChannel = await msg.guild.channels.create(ticket, { 
                type:'text',
                parent:category 
            });

            msg.channel.send(`${ticketsChannel.name} a bien été créé.`);
        }else if(!category && ticketsChannel){
            const category = await msg.guild.channels.create('📂| Support', { type:'category' });
            ticketsChannel.setParent(category);

            msg.channel.send(`${category.name} a bien été créé et ${ticketsChannel.name} a été réaffilié à ${category.name}`);
        }else{
            msg.channel.send(`${category} et ${ticketsChannel} existent déjà.`);
        }
        
        category = await msg.guild.channels.cache.find(category => category.name === '📂| Support');
        ticketsChannel = await msg.guild.channels.cache.find(channel => channel.name === ticket);
        
        ticketsChannel.updateOverwrite(
            channel.guild.roles.everyone, 
            { VIEW_CHANNEL: true, SEND_MESSAGES: false }
        );
        
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')    
            .setTitle('Tickets')
            .setDescription('Veuillez cliquer sur l\'émoji pour créer un ticket, cela créera un nouveau channel.\nVeuillez ensuite suivre les instructions')

        ticketsChannel.send(embed);
    }
}