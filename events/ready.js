const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
moment.locale('tr');

module.exports = (client, message) => {


  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar Yüklendi!`);
  
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${client.user.username} İsmi ile Sisteme Giriş Yapıldı!`);
  
  client.user.setStatus("ONLINE");
  
  client.user.setActivity(`BURAK❤️YÜKSEL GARAGE`, ({ type : 'PLAYING' }));
  
};