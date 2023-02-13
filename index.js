const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { token, guildId, welcomeChannelId, introChannelId, rulesChannelId } = require('./config.json');

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
const welcomeDelay = 180000; // Vreme izvuci u config

client.on("ready", () => {
    const guild = client.guilds.cache.get(guildId);
    welcomeChannel = guild.channels.cache.get(welcomeChannelId);
    introductionChannel = guild.channels.cache.get(introChannelId);
    rulesChannel = guild.channels.cache.get(rulesChannelId);
    // Povuci sve kanale koji postoje
});

client.on('guildMemberAdd', member => {
    if (member.user.bot) return;
    const timeout = setTimeout(() => {
    const embed = new EmbedBuilder()
    // opcija za naslov isto + mozda ostale
      .setColor("#5921FF") //boja u config
      .setDescription(`Welcome to the largest Discord Server for the English rock band Muse! Feel free to introduce yourself in ${introductionChannel} and remember to read through ${rulesChannel}. We hope you enjoy your stay!`); // opis u config
      welcomeChannel.send({content: `Welcome to the server, ${member}!`, embeds: [embed]}); // tekst u config
    timeouts.delete(member.id);
  }, welcomeDelay);
  timeouts.set(member.id, timeout);
});

client.on('guildMemberRemove', member => {
  const timeout = timeouts.get(member.id);
  if (timeout) {
    clearTimeout(timeout);
    timeouts.delete(member.id);
  }
});

client.login(token);