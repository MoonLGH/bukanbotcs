const { inspect } = require('util');
const text = require('./string.js');
exports.execute = async function (msg, command, args, client, D, perm, color) {
    try {
        const matches = msg.content.match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups || msg.content.match(/```(?<code>[^]+?)\s?```/)?.groups
        let evaled = await eval(matches.code)
        
            await msg.channel.send(evaled)
    } catch (err) {
        const stacktrace = text.joinArrayAndLimit(err.stack.split('\n'),900,'\n');
      const value = [
        '```xl',
        stacktrace.text,
        stacktrace.excess ? `\nand ${stacktrace.excess} lines more!` : '',
        '```'
      ].join('\n');
        const embed = new D.MessageEmbed()
        .setColor('RED')
        .setFooter([
          `${err.name}`,
          `Evaluated in ${Math.abs(Date.now() - msg.createdTimestamp)}ms.`,
          `Eval | \©️${new Date().getFullYear()} ${msg.guild.me.displayName}`].join('\u2000•\u2000'))
        .addFields([
          { name: '\\📥 Input', value: `\`\`\`js\n${text.truncate(text.clean(args.join(' ')),1000,'\n...').replaceAll("```","")}\`\`\``  },
          { name: '\\📤 Output', value }
        ])
      return msg.channel.send({embeds:[embed]})
    }
}   