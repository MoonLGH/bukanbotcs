const { inspect } = require('util');
const text = require('./string.js');
exports.execute = async function (msg, command, args, client, D, perm, color) {
    try {
        const matches = msg.content.match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups || msg.content.match(/```(?<code>[^]+?)\s?```/)?.groups
        let evaled = eval(matches.code);
        let raw = evaled;
        let promise, output, bin, download, type, color;
  
        if (evaled instanceof Promise){
          msg.channel.startTyping();
          promise = await evaled
          .then(res => { return { resolved: true, body: inspect(res, { depth: 0 })};})
          .catch(err => { return { rejected: true, body: inspect(err, { depth: 0 })};});
        };
  
        if (typeof evaled !== 'string'){
          evaled = inspect(evaled, { depth: 0 });
        };
  
        if (promise){
          output = text.clean(promise.body)
        } else {
          output = text.clean(evaled)
        };
  
        if (promise?.resolved){
          color = 'GREEN'
          type = 'Promise (Resolved)'
        } else if (promise?.rejected){
          color = 'RED'
          type = 'Promise (Rejected)'
        } else {
          color = 'GREY'
          type = (typeof raw).charAt(0).toUpperCase() + (typeof raw).slice(1)
        };
  
        const elapsed = Math.abs(Date.now() - msg.createdTimestamp);
        const embed = new D.MessageEmbed()
        .setColor(color)
        .addField('\\📥 Input',`\`\`\`js\n${text.truncate(text.clean(matches.code),1000).replaceAll("```","")}\`\`\``)
        .setFooter([
          `Type: ${type}`,
          `Evaluated in ${elapsed}ms.`,
          `Eval | \©️${new Date().getFullYear()} ${msg.guild.me.displayName}`].join('\u2000•\u2000')
        );
  
        if (output.length > 1000){
          await fetch('https://hastebin.com/documents', {
            method: 'POST',
            body: output,
            headers: { 'Content-Type': 'text/plain' }
          }).then(res => res.json())
          .then(json => bin = 'https://hastebin.com/' + json.key + '.js')
          .catch(() => null)
  
        };
  
        
        embed.addFields([
          {
            name: '\\📤 Output',
            value: output.length > 1000
            ? `\`\`\`fix\nExceeded 1000 characters\nCharacter Length: ${output.length}\`\`\``
            : `\`\`\`js\n${output}\n\`\`\``
          },
          { name: '\u200b', value: `[\`📄 View\`](${bin}) • [\`📩 Download\`](${download})` }
        ].splice(0, Number(output.length > 1000) + 1))

        msg.channel.stopTyping();
        return msg.channel.send({embeds:[embed]});
    } catch (err) {
      const stacktrace = text.joinArrayAndLimit(err.stack.split('\n'),900,'\n');
      const value = [
        '```xl',
        stacktrace.text,
        stacktrace.excess ? `\nand ${stacktrace.excess} lines more!` : '',
        '```'
      ].join('\n');
      msg.channel.stopTyping()
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