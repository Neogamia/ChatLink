import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { sendToSocket, receiveFromSocket } from "./gamechat/gamechat.mjs";
import { checkEvent } from "./gameserver/gameserver.mjs";
dotenv.config();

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', (msg) => {
    sendToSocket('discordBotMessage', msg);
});

client.login(process.env.token);

receiveFromSocket(client);

checkEvent('playerDeath', client);
checkEvent('playerDisconnected', client);
checkEvent('playerJoined', client);