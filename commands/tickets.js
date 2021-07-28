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
        const category = msg.guild.channels.cache.find(category => category.name === '📂| Support') || await msg.guild.channels.create('📂| Support', { type:'category' });
        const ticketsChannel = msg.guild.channels.cache.find(channel => channel.name === ticket) || await msg.guild.channels.create(ticket, { 
            type:'text',
            parent:category 
        });

        msg.channel.send(`${category} et ${ticketsChannel} ont bien été configuré.`);

        ticketsChannel.updateOverwrite(
            ticketsChannel.guild.roles.everyone, 
            { VIEW_CHANNEL: true, SEND_MESSAGES: false }
        );
        
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')    
            .setTitle('Tickets')
            .setDescription('Veuillez cliquer sur l\'émoji correspondant à votre problème pour créer un ticket.')
            .addField('Problème avec un membre','💥')
            .addField('Problème technique','❗')
            .addField('Problème avec un staff','🔴')

        const createTicket = await ticketsChannel.send(embed);
        createTicket.react('💥');
        createTicket.react('❗');
        createTicket.react('🔴');
    }
}