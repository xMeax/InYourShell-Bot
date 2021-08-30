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
        if(!msg.member.hasPermission("ADMINISTRATOR")) return events.invalidCommand(msg)
    
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
            if(react.message.channel.name === '📄・tickets')
            {
                const category = react.message.guild.channels.cache.find(category => category.name === '📂| Support');
                const username = user.username.toLowerCase();

                if(!category) this.setupTicket(Discord,user)

                if(!react.message.guild.channels.cache.find(channel => channel.name === "membre-" + username)
                && !react.message.guild.channels.cache.find(channel => channel.name === "tech-" + username)
                && !react.message.guild.channels.cache.find(channel => channel.name === "staff-" + username))
                {
                    switch(`${react.emoji}`)
                    {
                        case "💥":
                            const channelMembre = await react.message.guild.channels.create("membre-" + username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelMembre,'Administrateur',user);
                            security.permsStaff(channelMembre,'everyone',user);
                            security.permsStaff(channelMembre,'1' + user.username,user);
                            /*security.permsStaff(channel,'💻 ⥽ Administrateur');
                            security.permsStaff(channel,'📘 ⥽ S-Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur test');*/

                            channelMembre.send(`${user} Votre ticket a bien été créé.\nMotif : Problème avec un membre.`);
                            break;
                        case "❗":
                            const channelTech = await react.message.guild.channels.create("tech-" + user.username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelTech,'Administrateur',user);
                            security.permsStaff(channelTech,'everyone',user);
                            security.permsStaff(channelTech,'1' + user.username,user);
                            /*security.permsStaff(channel,'💻 ⥽ Administrateur');
                            security.permsStaff(channel,'📘 ⥽ S-Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur test');*/
                            
                            channelTech.send(`${user} Votre ticket a bien été créé.\nMotif : Problème technique.`);
                            break;
                        case "🔴":
                            const channelStaff = await react.message.guild.channels.create("staff-" + user.username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelStaff,'Administrateur',user);
                            security.permsStaff(channelStaff,'everyone',user);
                            security.permsStaff(channelStaff,'1' + user.username,user);
                            /*security.permsStaff(channel,'💻 ⥽ Administrateur');
                            security.permsStaff(channel,'📘 ⥽ S-Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur');
                            security.permsStaff(channel,'📘 ⥽ Modérateur test');*/
                            
                            channelStaff.send(`${user} Votre ticket a bien été créé.\nMotif : Problème avec un staff.`);
                                break;
                            default:
                                console.log(`Mauvais choix de ticket de ${user}`);
                                return;
                        }
                    } 
                }       
            })
        },
    }