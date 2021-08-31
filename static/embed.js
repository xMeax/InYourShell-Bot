module.exports = {
    name:'Embed logsChat',
    description:'Crée des messages embed pour les logs de chat',
    embed: function(Discord, author, content, logsChat,color)
    {
        const setColor = color || '#0099ff';
        const embed = new Discord.MessageEmbed()
            .setColor(setColor)
            .setTitle(author)
            .setDescription(content)
            .setTimestamp()
        
        logsChat.send(embed)
    },

    name:"Embed welcome/leave",
    description:'Crée des messages embed quand les membres rejoignent ou quittent le serveur',
    embedWelcLeav: function(Discord, content, color, logsChat)
    {
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(content)
            .setTimestamp()

            logsChat.send(embed)
    },

    name:'Embed tickets',
    description:'Crée des embed pour les tickets',
    embedTickets: function(Discord, content, color, channel)
    {
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(content)
            .setTimestamp()

            channel.send(embed)
    }
}
