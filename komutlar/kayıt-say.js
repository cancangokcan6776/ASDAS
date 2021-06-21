const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
    let tag = db.get(`tag_${message.guild.id}`)
let alınacakrol = "817295856054697994"
let erkek = db.get(`erkeksayı_${message.author.id}`)
let kız = db.get(`kızsayı_${message.author.id}`)
let toplam = db.get(`kayıtsayı_${message.author.id}`)
const kayıtsız = message.guild.roles.cache.get(alınacakrol).members.size
const taglı = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size

if(erkek === null) erkek = "0"
if(erkek === undefined) erkek = "0"
if(kız === null) kız = "0"
if(kız === undefined) kız = "0"
if(toplam === null) toplam = "0"
if(toplam === undefined) toplam = "0"

let user = message.mentions.users.first() || message.author
if(user){
  
const embed = new discord.MessageEmbed()
.setAuthor("Carnoxis", client.user.avatarURL({dynamic:true}))
.setDescription(`
${user} adlı kullanıcının kayıt bilgileri:

Erkek kayıt: ${erkek}
Kız kayıt: ${kız}
Toplam: ${toplam}

Diğer:
Kayıtsız sayısı: ${kayıtsız}
Taglı Sayısı: ${taglı ? taglı: "0"}
`)
.setTimestamp()
.setColor(`BLUE`)
.setFooter(`YÜKSΞL GΛRΛGΞ`)
message.channel.send(embed)
} else {
const embed = new discord.MessageEmbed()
.setDescription(`
${message.author.tag} adlı kullanıcının kayıt bilgileri:

Erkek kayıt: ${erkek}
Kız kayıt: ${kız}
Toplam: ${toplam}

Diğer:
Kayıtsız sayısı: ${kayıtsız}
Taglı Sayısı: ${taglı ? taglı: "0"}
`)
.setTimestamp()
.setColor(`BLUE`)
.setFooter(`YÜKSΞL GΛRΛGΞ`, message.author.avatarURL({dynamic:true}))
message.channel.send(embed)
} 
}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["kayıt-say", "k-say"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "kayıtsay" //Komutun adı (Komutu girerken lazım olucak)
};