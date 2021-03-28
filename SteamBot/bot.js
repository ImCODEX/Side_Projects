const SteamUser = require('steam-user');
const config = require('./config.json');
const SteamTotp = require('steam-totp');

const client = new SteamUser();

const logOnOptions = {
    accountName: config.username,
    password: config.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedsecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('succesfully logged on.');
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed("Nufacnimic");
});

client.on("friendMessage", function(steamid, message){
    if (message == "hi"){
        client.chatMessage(steamid, "hello");
    }
});