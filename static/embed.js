module.exports = {
    name:'Embed logsChat',
    description:'Crée des messages embed pour les logs de chat',
    embed: function(Discord, author, content, logsChat)
    {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
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
}
