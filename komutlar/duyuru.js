const Discord = require('discord.js');//Asperius Code
const db = require('quick.db');//Asperius Code
const Spectrum = new Set();//Asperius Code
//Asperius Code
exports.run = async(client, message, args) => {   
     if(message.author.id !== message.guild.owner.user.id) return message.reply(':bit: Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
let mesaj = args[0]
client.channels.cache.get("817296941234126848").send(`
**|| @everyone || & || @here ||**
`)
const embed = new Discord.MessageEmbed()
.setDescription(`
<a:bildirim:838763840996638770> **Yeni Video Yayında!** <a:bildirim:838763840996638770>
-------------------- **YÜKSΞL GΛRΛGΞ®** --------------------
<a:youtubegif:838704427577114665> **Yeni Video YouTube Kanalımızda!** <a:sag_tik:798851371340136458> [**İzlemek için Tıklayınız**](${mesaj}) <a:soltik:838762680117886996>
-------------------- **YÜKSΞL GΛRΛGΞ®** --------------------
`)
.setColor("#E9C79A")
.setImage("https://cdn.discordapp.com/attachments/837993054493343764/838701158133530664/tenor.gif")
.setFooter("YÜKSΞL GΛRΛGΞ®")
.setTimestamp()
client.channels.cache.get("817296941234126848").send(embed)
}//Asperius Code
exports.conf = {
  enabled: true, //Asperius Code
  guildOnly: true, //Asperius Code
  aliases: ["yt"], //Asperius Code
  permLevel: 0 //Asperius Code
};

exports.help = {
  name: "youtube" //Asperius Code
};