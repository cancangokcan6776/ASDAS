const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//matador
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "YÜKSΞL GΛRΛGΞ®");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

client.on("ready", () => {
    console.log(`Bütün komutlar başarıyla yüklendi!`);
})


const log = message => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = -ayarlar.varsayilanperm;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
    if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
    if (message.author.id === message.guild.ownerID) permlvl = 6;
    if (message.author.id === ayarlar.sahip) permlvl = 7;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   (chalk.bgBlue.green(e.replace('that was redacted')));
// }); ////

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//---------------------------------KOMUTLAR---------------------------------\\

/*
client.on('guildMemberAdd', async member => {
  await member.addRole(`817295856054697994`) 
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 604800000) {
takizaman = '• Tehlikeli'
} else {
takizaman = `• Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.cache.find(x => x.id === `817303655085506570`)
 let kayıtyetkilisi = "817357051306311691"
  const taki = new Discord.MessageEmbed()
 .setThumbnail("https://media.giphy.com/media/BNUaX2Amv0RAw98I3m/giphy.gif")
 .setImage("https://media.giphy.com/media/WFv10LMhRulRhNMEs4/giphy.gif")
 .setTitle(
     "YÜKSΞL GΛRΛGΞ® HOŞGELDİN"
   )
   .setDescription(`a:siyahtik:813358466026307624> **Sunucumuza Hoş geldin** <a:siyahtik:813358466026307624> ${member} 
   
» • <a:kalp:805906630054117436> **Seninle Beraber** ${message.guild.memberCount} **Kişiyiz.**

» • <a:dogru2:825315793067704361> **Yeni Katılan Üyelerimiz <#817296133151522816> Okumuş Kabul Edilir!**

» • <a:dogru2:825315793067704361> **Kayıt İçin İsmini Yaşını Yazıp Lütfen Bekleyin. Yetkililer Kayıt Kısa Zamanda Kayıt Edecektir.**

» • <a:dogru2:825315793067704361> **${takizaman}** <a:dogru2:825315793067704361>
<
» • <a:loading:813338262345089025> **Hesap Oluşturma Tarihi:** ${gecen}

» • <a:dogru2:825315793067704361> **Kayıt Olmak İçin <#817303655085506570> Kayıt Olabilirsin.**
`)
.setColor('GREY')
.setFooter("YÜKSΞL GΛRΛGΞ💚")
.setTimestamp();
message.send(taki)
  message.send(`<@&${kayıtyetkilisi}>`)
 
         }); //matador //3
         */
// AYARLANABİLİR KAYIT KANAL //
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = "817303655085506570"
  let kayıtçı = "817357051306311691"
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "Şüpheli" ;
  }
  if (ayyy > 1) {
    kontrol = "Güvenilir";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif", "https://tenor.com/view/avengers-endgame-gif-18476226"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor(0x36393F)
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

 //
  .setImage("https://media.giphy.com/media/WFv10LMhRulRhNMEs4/giphy.gif")
  .setDescription(`**YÜKSΞL GΛRΛGΞ®** 
      » • <a:siyahtik:813358466026307624> **Sunucumuza Hoşgeldin** <a:siyahtik:813358466026307624> ${
        member.user
      } 
      
      » • <a:kalp:805906630054117436> **Seninle Beraber** ${
        guild.memberCount
      } **Kişiyiz.** 
      
      » • <a:dogru2:825315793067704361> **Yeni Katılan Üyelerimiz** <#817296133151522816> **Okumuş Kabul Edilir!**
      
      » • <a:dogru2:825315793067704361> **Kayıt İçin İsmini Yaşını Yazıp Lütfen Bekleyin.** **Yetkililer Kayıt Kısa Zamanda Kayıt Edecektir.**
      
      » • <a:dogru2:825315793067704361> **Hesap Kuruluş Tarihi:** ${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}
       
       » • <a:dogru2:825315793067704361> ** ${kontrol} ** <a:dogru2:825315793067704361> 
       
       » • <a:dogru2:825315793067704361> **Kayıt** **Olmak** **İçin** <#817303655085506570> **Kayıt** **Olabilirsin.** `);
  
  //
  
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
  client.channels.cache.get(kanal).send(embed);  
  
});

   
 client.on("message" , async message => {
   if(message.content === "sa")
 message.react("<:as_:848569721456033812>")
 })

 client.on("message" , async message => {
   if(message.content === "selamun aleyküm")
 message.react("<:as_:848569721456033812>")
 })

 client.on("message" , async message => {
   if(message.content === "s.a")
 message.react("<:as_:848569721456033812>")
 })

 client.on("message" , async message => {
   if(message.content === "sea")
 message.react("<:as_:848569721456033812>")
 })

 client.on("message" , async message => {
   if(message.content === "Sa")
 message.react("<:as_:848569721456033812>")
 })

 client.on("message" , async message => {
   if(message.content === "save")
 message.channel.send("<a:unlem5:839069684283998279> **Save'leri Görmek İçin Kanala Abone Olup, Herhangi Videoya Like Atıp <#817300507067809822> Bu Kanala Atmanız Yeterli Olacaktır.**")
 });
  
//kayıt kanal son //