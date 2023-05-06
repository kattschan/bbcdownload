const { Events, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageEmbed } = require('discord.js');
const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./db.sqlite');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('with space\'s smell', { type: 'PLAYING' });
	}
};
