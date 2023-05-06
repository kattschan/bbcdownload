const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Reports a blooper to bt.club.')
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time of the blooper(e.x. 23:45).')
                .setRequired(true)
                .setMinLength(5)
                .setMaxLength(5))
        .addStringOption(option =>
            option.setName('description')
            .setDescription('What happened?')
            .setRequired(true)),
	async execute(interaction) {
        // Defer reply ephemeral
        await interaction.deferReply({ ephemeral: true });
        // Convert the 23:45 time to a 2023-05-05T15:24 time
        const time = interaction.options.getString('time');
        // Date is current day
        const date = new Date();
        const description = interaction.options.getString('description');
        const data = `{"description": "${description}", "time": "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${time}"}`;
        console.log(data);
        // Send the data to the API
        const http = require("https");

const url = 'https://api.bloopertrack.club/post';

const options = {
    method: 'POST',
    'Content-Type': 'application/json',
};

let result = '';
const req = http.request(url, options, (res) => {
    console.log(res.statusCode);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        result += chunk;
    });

    res.on('end', () => {
        console.log(result);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(data);
req.end();
// Reply to the interaction
await interaction.editReply('Your blooper has been reported to https://bloopertrack.club/.');
    },
};