const config = require('../config.json');

module.exports = {
    name:'antiLinks',
    description:'Cette commande bloque l\'envoie de liens externes au serveur discord',
    antiLinks: function(msg)
    {
        const str = msg.content;
        const regex = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
        const reason = 'Lien externe';
        const author = msg.author;
        
        if(str.match(regex))
        {
            msg.delete(reason);
            warn(author,msg);
            msg.channel.send('Attention, il est interdit d\'envoyer des liens externes dans le channel ' + msg.channel.name + ' !');
        }
    },

    name:'warn',
    description:'Cette fonction permet de warn un utilisateur',
    warn: function(author,msg)
    {
        //A continuer -> sauvegarde des warns
        msg.channel.send('L\'utilisateur ' + author.username + ' a pris un avertissement.');
    },
}