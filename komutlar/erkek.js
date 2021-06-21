const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = "817303655085506570"
let alınacakrol = "817295856054697994"
let erkekrol = "817295677905829888"
let kayıtçı = "817357051306311691"

 
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(
new discord.MessageEmbed()
.setAuthor("YÜKSΞL GΛRΛGΞ", client.user.avatarURL())
  .setDescription(`
Bu komudu kullanabilmen için <@&${kayıtçı}> adlı role sahip olman lazım!
  `)
.setFooter("YÜKSΞL GΛRΛGΞ", message.author.avatarURL())
)
if(message.channel.id !== kanal) return message.channel.send(`<a:twitchbit:793899916614828062> Bu komudu sadece <#${kanal}> adlı kanalda kullanabilirsin!`)
if (!erkekrol) return message.channel.send(`<a:twitchbit:793899916614828062> Sunucuda erkek rolü ayarlanmadığı için komut kullanılamaz!`)


let member = message.mentions.members.first();
if (!member) return message.channel.send(`<a:twitchbit:793899916614828062> Erkek olarak kayıt edeceğin kullanıcıyı belirtmelisin!`)
let isim = args[1]
if (!isim) return message.channel.send(`<a:twitchbit:793899916614828062> İsmini belirtmelisin!`)
let yaş = args[2]
if (!yaş) return message.channel.send(`<a:twitchbit:793899916614828062> Yaşını belirtmelisin!`)
member.setNickname(`${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(erkekrol)

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} | Erkek Kayıt`)
.setColor(0x36393F)
.setDescription(`<a:siyahtik:813358466026307624> **Kayıt edilen kullanıcı:** ${member} , Kayıt eden yetkili: <@!${message.author.id}>`)
.addField(`Kullanıcının ismi:`, `${isim}`, true)
.addField(`Kullanıcının yaşı:`, `${yaş}`, true)
.setThumbnail(member.avatarURL)
.setFooter(`YÜKSΞL GΛRΛGΞ`)
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.author.id}`, +1)
db.add(`erkeksayı_${message.author.id}`, +1)
}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["e"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "erkek" //Komutun adı (Komutu girerken lazım olucak)
};