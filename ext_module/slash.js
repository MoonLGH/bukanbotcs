const fs = require("fs")
exports.slash = function (client, D) {
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "test",
            description: "Test If The Bot Working"
        }
    });
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "hello",
            description: "print hello world"
        }
    });

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "echo",
            description: "Echos your text as an embed!",

            options: [{
                name: "content",
                description: "Content of the embed",
                type: 3,
                required: true
            }]
        }
    });

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "say",
            description: "basicly echo!",

            options: [{
                name: "content",
                description: "Content of the embed",
                type: 3,
                required: true
            }]
        }
    });

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command == 'hello') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }
        const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            if (command == command.name) {
                const embed = new D.MessageEmbed()
                    .setTitle("Testing...")
                    .setThumbnail(interaction.member.user.displayAvatarURL)
                    .setDescription("Beep Boop... \nThe bot is working")
                    .setAuthor(interaction.member.user.username);

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, embed, D, client)
                    }
                });

            }
        }
        if (command == "test") {
            const embed = new D.MessageEmbed()
                .setTitle("Testing...")
                .setThumbnail(interaction.member.user.displayAvatarURL)
                .setDescription("Beep Boop... \nThe bot is working")
                .setAuthor(interaction.member.user.username);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed, D, client)
                }
            });
        }

        if (command == "echo" || command == "say") {
            const description = args.find(arg => arg.name.toLowerCase() == "content").value;
            const embed = new D.MessageEmbed()
                .setTitle("Echo!")
                .setThumbnail(interaction.member.user.displayAvatarURL)
                .setDescription(description)
                .setAuthor(interaction.member.user.username);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed, D, client)
                }
            });
        }
    });
}

exports.handler = function (client, D) {
    const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.api.applications(client.user.id).commands.post({
            data: {
                name: command.name,
                description: command.desc
            }
        });
        client.ws.on('INTERACTION_CREATE', async (interaction) => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;

            if (command == command.name) {
                const embed = command.message

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, embed, D, client)
                    }
                });
            }
        })
    }
}
async function createAPIMessage(interaction, content, D, client) {
    const apiMessage = await D.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return {
        ...apiMessage.data,
        files: apiMessage.files
    };
}