const moderation = require("./moderation.js");

module.exports = {
/*
Différentes catégories :
-Social
-Technique
-Staff
*/
    name:'Setup ticket',
    description:'Setup le message de création de tickets',
    setupTicket: async function(Discord,msg)
    {
        const ticket = '📄・Tickets';
        const category = msg.guild.channels.find(category => category.name === '📂| Support');
        const ticketsChannel = msg.guild.channels.find(channel => channel.name === ticket);
        
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
        }
    
        moderation.lockChannel(msg);
        
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')    
            .setTitle('Tickets')
            .setDescription('Veuillez cliquer sur l\'émoji pour créer un ticket, cela créera un nouveau channel.\nVeuillez ensuite suivre les instructions')

        msg.channel.send(embed);
    }
}