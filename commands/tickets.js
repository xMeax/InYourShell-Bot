const security = require('./security.js');
const embed = require('../static/embed.js');

module.exports = {
    name:'setupticket',
    description:'Setup le message de création de tickets',
    setupTicket: async function(Discord,msg)
    {
        if(!msg.member.hasPermission("ADMINISTRATOR")) return events.invalidCommand(msg)
    
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
                            const content = `${user} Votre ticket a bien été créé.\nMotif : Problème avec un membre.`
                            const color = '#258edd';
                            const channelMembre = await react.message.guild.channels.create("membre-" + username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelMembre,'💻 ⥽ Administrateur',user);
                            security.permsStaff(channelMembre,'📗 ⥽ Responsable',user);
                            security.permsStaff(channelMembre,'📘 ⥽ Modérateur',user);
                            security.permsStaff(channelMembre,'everyone',user);
                            security.permsStaff(channelMembre,'1' + user.username,user);

                            embed.embedTickets(Discord,content,color,channelMembre);
                            break;
                        case "❗":
                            const content2 = `${user} Votre ticket a bien été créé.\nMotif : Problème technique.`
                            const color2 = '#258edd';
                            const channelTech = await react.message.guild.channels.create("tech-" + user.username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelTech,'💻 ⥽ Administrateur',user);
                            security.permsStaff(channelTech,'📗 ⥽ Responsable',user);
                            security.permsStaff(channelTech,'📘 ⥽ Modérateur',user);
                            security.permsStaff(channelTech,'everyone',user);
                            security.permsStaff(channelTech,'1' + user.username,user);
                            
                            embed.embedTickets(Discord,content2,color2,channelTech);
                            break;
                        case "🔴":
                            const content3 = `${user} Votre ticket a bien été créé.\nMotif : Problème avec un staff.`
                            const color3 = '#258edd';
                            const channelStaff = await react.message.guild.channels.create("staff-" + user.username, { 
                                type:'text',
                                parent:category
                            });
                            security.permsStaff(channelStaff,'💻 ⥽ Administrateur',user);
                            security.permsStaff(channelStaff,'📗 ⥽ Responsable',user);
                            security.permsStaff(channelStaff,'📘 ⥽ Modérateur',user);
                            security.permsStaff(channelStaff,'everyone',user);
                            security.permsStaff(channelStaff,'1' + user.username,user);
                            
                            embed.embedTickets(Discord,content3,color3,channelStaff);
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