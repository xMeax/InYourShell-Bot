module.exports = {
    name:'Embed logsChat',
    description:'Crée des messages embed, nécessite embed.embed(Discord,author,content,logsChat);',
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
    description:'Crée des messages embed, nécessite ..',
    embedWelcLeav: function(Discord, content, color, logsChat)
    {
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(content)
            .setTimestamp()

            logsChat.send(embed)
    }
}
