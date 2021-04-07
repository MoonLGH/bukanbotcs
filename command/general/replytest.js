exports.execute = async function (msg, command, args, client, D, perm, color) {

    reply(msg, args.join(" "))

}
let {
    APIMessage
} = require("discord.js")

function reply(msg, content, options) {
    return msg.channel.send(
        content instanceof APIMessage ?
        content :
        transformOptions(content, options, {
            replyTo: msg,
        }),
    );
}

function transformOptions(content, options, extra = {}, isWebhook = false) {
    if (!options && typeof content === 'object' && !Array.isArray(content)) {
        options = content;
        content = undefined;
    }

    if (!options) {
        options = {};
    } else if (options instanceof MessageEmbed) {
        return isWebhook ? {
            content,
            embeds: [options],
            ...extra
        } : {
            content,
            embed: options,
            ...extra
        };
    } else if (options instanceof MessageAttachment) {
        return {
            content,
            files: [options],
            ...extra
        };
    }

    if (Array.isArray(options)) {
        const [embeds, files] = this.partitionMessageAdditions(options);
        return isWebhook ? {
            content,
            embeds,
            files,
            ...extra
        } : {
            content,
            embed: embeds[0],
            files,
            ...extra
        };
    } else if (Array.isArray(content)) {
        const [embeds, files] = this.partitionMessageAdditions(content);
        if (embeds.length || files.length) {
            return isWebhook ? {
                embeds,
                files,
                ...extra
            } : {
                embed: embeds[0],
                files,
                ...extra
            };
        }
    }

    return {
        content,
        ...options,
        ...extra
    };
}