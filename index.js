const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { token, guildId, welcomeChannelId, introChannelId, rulesChannelId, welcomeDelay } = require('./config.json');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
    ],
    partials: [
      Partials.GuildMember,
    ]
});

const timeouts = new Map();
const delay = parseInt(welcomeDelay);

client.on("ready", () => {
  const guild = client.guilds.cache.get(guildId);
  welcomeChannel = guild.channels.cache.get(welcomeChannelId);
  introductionChannel = guild.channels.cache.get(introChannelId);
  rulesChannel = guild.channels.cache.get(rulesChannelId);
  console.log("Now online");
});

client.on('guildMemberAdd', member => {
    if (member.user.bot) return;
    console.log(`Countdown started for ${member.user.username}#${member.user.discriminator}`);
    const timeout = setTimeout(() => {
    const embed = new EmbedBuilder()
      .setColor("#5921FF") 
      .setDescription(`Welcome to the largest Discord Server for the English rock band Muse! Feel free to introduce yourself in ${introductionChannel} and remember to read through ${rulesChannel}. We hope you enjoy your stay!`); // opis u config
      welcomeChannel.send({content: `Welcome to the server, ${member}!`, embeds: [embed]});
      console.log(`${member.user.username}#${member.user.discriminator} welcomed successfully`);
    timeouts.delete(member.id);
  }, delay);
  timeouts.set(member.id, timeout);
});

client.on('guildMemberRemove', member => {
  const timeout = timeouts.get(member.id);
  if (timeout) {
    console.log(`Countdown cancelled for ${member.user.username}#${member.user.discriminator}`);
    clearTimeout(timeout);
    timeouts.delete(member.id);
  }
});

client.login(token);