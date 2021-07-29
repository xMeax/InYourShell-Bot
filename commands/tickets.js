const security = require('./security.js');

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
        const category = msg.guild.channels.cache.find(category => category.name === '📂| Support') || await x.guild.channels.create('📂| Support', { type:'category' });
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
    },

    name:'React',
    description:'Création des channels pour les tickets correspondant',
    reactTickets: function(client,Discord)
    {
        client.on("messageReactionAdd", async (react, user) => {
            if(!react.message.channel === '📄・tickets') return
                const category = react.message.guild.channels.cache.find(category => category.name === '📂| Support');
            
                if(!category) this.setupTicket(Discord,user)

                switch(`${react.emoji}`)
                {
                    case "💥":
                        const channel = await react.message.guild.channels.create("membre-" + user.username, { 
                            type:'text',
                            parent:category
                        });
                        security.permsStaff(channel,'Administrateur');
                        security.permsStaff(channel,'everyone');
                        security.permsStaff(channel,'1' + user.username);
                        /*security.permsStaff(channel,'💻 ⥽ Administrateur');
                        security.permsStaff(channel,'📘 ⥽ S-Modérateur');
                        security.permsStaff(channel,'📘 ⥽ Modérateur');
                        security.permsStaff(channel,'📘 ⥽ Modérateur test');*/
                        break;
                    case "❗":
                        console.log('Ticket problème technique');
                        break;
                    case "🔴":
                        console.log('Ticket problème avec un staff');
                        break;
                    default:
                        console.log('Mauvais choix de ticket');
                        return;
                }
        })
    },
}