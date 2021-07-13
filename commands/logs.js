const config = require('../config.json');

module.exports = {

    name:'setLogChannel',
    description:'Paramètre le channel où sont affichées les évènements textuels',
    //A continuer
    setTextEventsLogChannel: function(msg)
    {
        const channel = msg.channel;
        
        config.TextEventsLogChannel = channel;  

        msg.channel.send("Le channel " + channel.name + " est le nouveau channel de logs d'évènements textuels.");
    }

}