const http = require('http');

const express = require('express');

const app = express();

app.get("/", (request, response) => {

  response.sendStatus(200);

});

app.listen(process.env.PORT);

setInterval(() => {

  http.get(`https://alert-mahogany-sprin1.glitch.me/`);

}, 280000);

const Discord = require('discord.js');

const converter = require('number-to-words');

const moment = require('moment');

const dateformat = require('dateformat');

const ms = require('parse-ms')

const client = new Discord.Client({ disableEveryone: true});

const fs = require('fs');

const request = require('request');

const jimp = require('jimp')

const pretty = require("pretty-ms");

const prefix = process.env.PREFIX

const PREFIX = process.env.PREFIX

const ownerID = process.env.MYID

console.log("hi.");

client.commands = new Discord.Collection();

client.aliases = new Discord.Collection();

console.log("hi..... ");

/// كود بوت 
client.login(process.env.BOT_TOKEN).catch(err=> console.log("**قد لا يوجد توكن او التوكن متوقف**"));
client.on("message", message => {
  if (message.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()

      .setAuthor(client.user.username, client.user.avatarURL)

      .setColor("RANDOM")

      .addField(
        "✽ **بنق البوت** : ",

        `» ${Math.round(client.ping)}` + " ms",

        true
      )

      .addField("**السيرفرات** :  ", `» ${client.guilds.size}`, true)

      .addField("**الرومات** : ", `» ${client.channels.size} `, true)

      .addField("**الاشخاص** : ", `» ${client.users.size} `, true)

      .addField("**اسم البوت** :  ", `» <@718166954099081306>`, true)

      .addField("**رئيس البوت** :  ", `» <@667030309031641089>`, true) // تعديل اساسي غير الايدي لايدي حسابك

      .setImage("")

      .setFooter(message.author.username, message.client.avatarURL);

    message.channel.send(bot);
  }
});

/// كود بنق
client.on("message", message => {

  if (!message.channel.guild) return;

  if (message.content.startsWith(prefix + "ping")) {

    if (!message.channel.guild) return;

    var msg = `${Date.now() - message.createdTimestamp}`;

    var api = `${Math.round(client.ping)}`;

    if (message.author.bot) return;

    let embed = new Discord.RichEmbed()

      .setAuthor(message.author.username, message.author.avatarURL)

      .setColor("#5016f3")

      .addField("**تاخير الاستضافة**", msg + " ms :signal_strength: ")

      .addField("**تاخير الرد:**", api + " ms :signal_strength: ")

      .setTimestamp();

    message.channel.send({ embed: embed });

  }

});
/// كود اعضاء 

client.on("message", message => {

  if (message.content == prefix + "member") {

    const embed = new Discord.RichEmbed().setDescription(`**حالات الاعضاء🔋

:green_heart: اونلاين   ${

      message.guild.members.filter(m => m.presence.status == "online").size

    }

:heart:مشغول       ${

      message.guild.members.filter(m => m.presence.status == "dnd").size

    }

:yellow_heart: خامل      ${

      message.guild.members.filter(m => m.presence.status == "idle").size

    }   

:black_heart: اوفلاين   ${

      message.guild.members.filter(m => m.presence.status == "offline").size

    } 

:blue_heart:   الكل  ${message.guild.memberCount}**`);

    message.channel.send({ embed });

  }

});
/// كود امبد
client.on("message", message => {

  var prefix = "+";

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "embed") {

    if (!message.channel.guild)

      return message.reply("** This command only for servers **");

    let say = new Discord.RichEmbed()

      .addField(

        "Emebad:",

        ``

      )

      .setDescription(args.join("  "))

      .setColor(0x23b2d6);

    message.channel.sendEmbed(say);

    message.delete();

  }

});
/// كود منع رابط
client.on("message", message => {

  if (message.content.includes("discord.gg/")) {

    if (message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();

    message.guild

      .member(message.author)

      .addRole(message.guild.roles.find(r => r.name === "Muted"));

    let embedP = new Discord.RichEmbed()

      .setTitle("❌ | تمت معاقبتك")

      .setAuthor(message.author.username, message.author.avatarURL)

      .addField(

        `** لقد قمت بمخالفة قوانين السيرفر من خلال نشر روابط اضافة الى سيرفرات اخرى  **`,

        `**ملاحظة  : إن كآن هذآ الاسكات عن طريق الخطأ الرجاء التوجه والتكلم مع الادآرة**`

      )

      .addField(`by`, `wolves bc `)

      .setColor("RED")

      .setThumbnail(message.author.avatarURL)

      .setFooter(`${message.guild.name} Server`, message.guild.iconURL);

    message.channel.send(embedP);

  }

});

 /// كود اعطاء رول
client.on("message", message => {

  let roleembed = new Discord.RichEmbed()

    .setDescription(

      `

    return message.reply

    +role @mention rolename : لأعطاء رتبة لعضو معين

    +role all rolename : لأعطاء رتبة للجميع

    +role humans rolename : لأعطاء رتبة للاشخاص فقط

    +role bots rolename : لأعطاء رتبة لجميع البوتات`

    )

    .setFooter(

      "Requested by " + message.author.username,

      message.author.avatarURL

    );

  var args = message.content.split(" ").slice(1);

  var msg = message.content.toLowerCase();

  if (!message.guild) return;

  if (!msg.startsWith(prefix + "role")) return;

  if (!message.member.hasPermission("MANAGE_ROLES"))

    return message.channel.send(" **__ليس لديك صلاحيات__**");

  if (msg.toLowerCase().startsWith(prefix + "roleembed")) {

    if (!args[0]) return message.channel.sendEmbed(roleembed);

    if (!args[1]) return message.channel.sendEmbed(roleembed);

    var role = msg

      .split(" ")

      .slice(2)

      .join(" ")

      .toLowerCase();

    var role1 = message.guild.roles

      .filter(r => r.name.toLowerCase().indexOf(role) > -1)

      .first();

    if (!role1)

      return message.reply("**:x: يرجى وضع الرتبة المراد اعطاءها الى الشخص**");

    if (message.mentions.members.first()) {

      message.mentions.members.first().addRole(role1);

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] رتبة [ " +

          args[0] +

          " ] تم اعطاء الى **"

      );

    }

    if (args[0].toLowerCase() == "all") {

      message.guild.members.forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الى الكل رتبة**"

      );

    } else if (args[0].toLowerCase() == "bots") {

      message.guild.members

        .filter(m => m.user.bot)

        .forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] تم اعطاء الى البوتات رتبة**"

      );

    } else if (args[0].toLowerCase() == "humans") {

      message.guild.members

        .filter(m => !m.user.bot)

        .forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] تم اعطاء الى البشريين رتبة**"

      );

    }

  } else {

    if (!args[0])

      return message.reply("**:x: يرجى وضع الشخص المراد اعطائها الرتبة**");

    if (!args[1])

      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");

    var role = msg

      .split(" ")

      .slice(2)

      .join(" ")

      .toLowerCase();

    var role1 = message.guild.roles

      .filter(r => r.name.toLowerCase().indexOf(role) > -1)

      .first();

    if (!role1)

      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");

    if (message.mentions.members.first()) {

      message.mentions.members.first().addRole(role1);

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] رتبة [ " +

          args[0] +

          " ] تم اعطاء **"

      );

    }

    if (args[0].toLowerCase() == "all") {

      message.guild.members.forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الكل رتبة**"

      );

    } else if (args[0].toLowerCase() == "bots") {

      message.guild.members

        .filter(m => m.user.bot)

        .forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البوتات رتبة**"

      );

    } else if (args[0].toLowerCase() == "humans") {

      message.guild.members

        .filter(m => !m.user.bot)

        .forEach(m => m.addRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البشريين رتبة**"

      );

    }

  }

});
//// كود ازالة رول
client.on("message", message => {

  let roleembed = new Discord.RichEmbed()

    .setDescription(

      `

    return message.reply

    +role @mention rolename : لأعطاء رتبة لعضو معين

    +role all rolename : لأعطاء رتبة للجميع

    +role humans rolename : لأعطاء رتبة للاشخاص فقط

    +role bots rolename : لأعطاء رتبة لجميع البوتات`

    )

    .setFooter(

      "Requested by " + message.author.username,

      message.author.avatarURL

    );

  var args = message.content.split(" ").slice(1);

  var msg = message.content.toLowerCase();

  if (!message.guild) return;

  if (!msg.startsWith(prefix + "removerole")) return;

  if (!message.member.hasPermission("MANAGE_ROLES"))

    return message.channel.send(" **__ليس لديك صلاحيات__**");

  if (msg.toLowerCase().startsWith(prefix + "roleembed")) {

    if (!args[0]) return message.channel.sendEmbed(roleembed);

    if (!args[1]) return message.channel.sendEmbed(roleembed);

    var role = msg

      .split(" ")

      .slice(2)

      .join(" ")

      .toLowerCase();

    var role1 = message.guild.roles

      .filter(r => r.name.toLowerCase().indexOf(role) > -1)

      .first();

    if (!role1)

      return message.reply("**:x: يرجى وضع الرتبة المراد ازالتها الى الشخص**");

    if (message.mentions.members.first()) {

      message.mentions.members.first().removeRole(role1);

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] رتبة [ " +

          args[0] +

          " ] تم ازالة الى **"

      );

    }

    if (args[0].toLowerCase() == "all") {

      message.guild.members.forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم ازالة الى الكل رتبة**"

      );

    } else if (args[0].toLowerCase() == "bots") {

      message.guild.members

        .filter(m => m.user.bot)

        .forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] تم ازالة الى البوتات رتبة**"

      );

    } else if (args[0].toLowerCase() == "humans") {

      message.guild.members

        .filter(m => !m.user.bot)

        .forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] تم ازالة الى البشريين رتبة**"

      );

    }

  } else {

    if (!args[0])

      return message.reply("**:x: يرجى وضع الشخص المراد ازالة الرتبة**");

    if (!args[1])

      return message.reply("**:x: يرجى وضع الرتبة المراد ازالة للشخص**");

    var role = msg

      .split(" ")

      .slice(2)

      .join(" ")

      .toLowerCase();

    var role1 = message.guild.roles

      .filter(r => r.name.toLowerCase().indexOf(role) > -1)

      .first();

    if (!role1)

      return message.reply("**:x: يرجى وضع الرتبة المراد ازالة للشخص**");

    if (message.mentions.members.first()) {

      message.mentions.members.first().removeRole(role1);

      return message.reply(

        "**:white_check_mark: [ " +

          role1.name +

          " ] رتبة [ " +

          args[0] +

          " } تم ازالة**"

      );

    }

    if (args[0].toLowerCase() == "all") {

      message.guild.members.forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم ازالة الكل رتبة**"

      );

    } else if (args[0].toLowerCase() == "bots") {

      message.guild.members

        .filter(m => m.user.bot)

        .forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم ازالة البوتات رتبة**"

      );

    } else if (args[0].toLowerCase() == "humans") {

      message.guild.members

        .filter(m => !m.user.bot)

        .forEach(m => m.removeRole(role1));

      return message.reply(

        "**:white_check_mark: [ " + role1.name + " ] تم ازالة البشريين رتبة**"

      );

    }

  }

});


 //// كود report 
client.on("message", message => {

  var prefix = "+";

  if (message.author.bot) return;

  if (message.content.startsWith(prefix + "report")) {

    if (!message.channel.guild) return;

    let args = message.content

      .split(" ")

      .slice(1)

      .join(" ");

    client.users

      .get("667030309031641089")

      .send(

        "\n" +

          "**" +

          "● السيرفر :" +

          "**" +

          "\n" +

          "**" +

          "» " +

          message.guild.name +

          "**" +

          "\n" +

          "**" +

          " ● المرسل : " +

          "**" +

          "\n" +

          "**" +

          "» " +

          message.author.tag +

          "**" +

          "\n" +

          "**" +

          " ● الرسالة : " +

          "**" +

          "\n" +

          "**" +

          args +

          "**"

      );

    let embed = new Discord.RichEmbed()

      .setAuthor(message.author.username, message.author.avatarURL)

      .setDescription("📬 تم ارسال الرسالة الى صاحب البوت بنجاح")

      .setThumbnail(message.author.avatarURL)

      .setFooter("wolves bc");

    message.channel.send(embed);

  }

});

 
 /// كود kill
client.on("message", message => {

  if (!message.content.startsWith(prefix)) return;

  if (!message.channel.guild)

    return message.reply("** This command only for servers **");

  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  if (command === "kill") {

    var sabotage = message.mentions.users.first();

    if (sabotage == message.author)

      return message.reply(`**الانتحار مو زين و الله**`);

    if (sabotage === client.user) return message.reply(`** تبي تقتلني ؟ **`);

    if (sabotage < 1) {

      message.delete();

      return message.channel.sendMessage(

        "ضع شيئا للقتل، مثل ذكر مستخدم، أو استخدام رمز تعبيري"

      );

    }

    if (!sabotage)

      return message.channel.send(`Please Mention A Member to Kill :warning:`);

    message.channel

      .send("▄︻̷̿┻̿═━一 ${sabotage")

      .then(msg => {

        msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :three:`);

        setTimeout(function() {

          msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :two:`);

        }, 1000);

        setTimeout(function() {

          msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :one:`);

        }, 2000);

        setTimeout(function() {

          msg.edit(`▄︻̷̿┻̿═━一 :boom:`);

        }, 3000);

        setTimeout(function() {

          msg.edit(`▄︻̷̿┻̿═━一 :fire:`);

        }, 4000);

        setTimeout(function() {

          msg.edit(`▄︻̷̿┻̿═━一 :skull:`);

        }, 5000);

        msg.delete(6000);

        message.delete();

      });

    message.channel

      .send("**تم اخفاء الجريمة بنجاح 🕳 **")

      .then(msg => msg.delete(8000));

  }

});

 /// كود Avatar 

client.on("message", message => {
  if (message.content.startsWith(prefix + "avatar")) {
    if (!message.channel.guild) return;

    var mentionned = message.mentions.users.first();

    var client;

    if (mentionned) {
      var client = mentionned;
    } else {
      var client = message.author;
    }

    const embed = new Discord.RichEmbed()

      .addField("Requested by:", "<@" + message.author.id + ">")

      .setColor()

      .setImage(`${client.avatarURL}`);

    message.channel.sendEmbed(embed);
  }
});

/// كود المبندين
client.on("message", message => {

  if (message.content.startsWith(prefix + "bans")) {

    message.guild

      .fetchBans()

      .then(bans =>

        message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `)

      )

      .catch(console.error);

  }

});

 //// كود invite 

client.on("message", message => {

  if (message.content.split(" ")[0].toLowerCase() == prefix + "invite") {

    let guild = message.guild;

    var codes = [""];

    var nul = 0;

    guild

      .fetchInvites()

      .then(invites => {

        invites.forEach(invite => {

          if (invite.inviter === message.author) {

            nul += invite.uses;

            codes.push(`discord.gg/${invite.code}`);

          }

        });

        if (nul > 0) {

          const e = new Discord.RichEmbed()

            .addField(

              `${message.author.username}`,

              `لقد قمت بدعوة **${nul}** شخص`

            )

            .setColor("#36393e");

          message.channel.send(e);

        } else {

          var embed = new Discord.RichEmbed()

            .setColor("#000000")

            .addField(

              `${message.author.username}`,

              `لم تقم بدعوة أي شخص لهذة السيرفر`

            );

          return;

        }

      })

      .then(m => {

        if (codes.length < 0) {

          var embed = new Discord.RichEmbed()

            .setColor("#000000")

            .addField(

              `Your invite codes in ${message.guild.name}`,

              `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`

            );

          message.channel.send({ embed: embed });

          return;

        } else {

          var embed = new Discord.RichEmbed()

            .setColor("#000000")

            .addField(

              `Your invite codes in ${message.guild.name}`,

              `Invite Codes :\n${codes.join("\n")}`

            )

            .setColor("#36393e");

          message.channel.send({ embed: embed });

          return;

        }

      });

  }

});

//// كود link
client.on("message", message => {

  if (message.content.startsWith(prefix + "link")) {

    message.channel

      .createInvite({

        thing: true,

        maxUses: 5,

        maxAge: 86400

      })
      .then(invite => message.author.sendMessage(invite.url));
   
    message.author.send(`**مدة الرابط : يـوم

عدد استخدامات الرابط : 5**`);
message.react("✅");
  }

});

 /// كود حالة
client.on("ready", function() {

  var ms = 10000;

  var setGame = [

    "قائمة الهليب تحت الصيانة",

    `${client.guilds.size} السيرفرات`,

    `${client.users.size} الاعضاء`,

    `+help`,

    "انشر البوت حب"

  ];

  var i = -1;

  var j = 0;

  setInterval(function() {

    if (i == -1) {

      j = 1;

    }

    if (i == setGame.length - 1) {

      j = -1;

    }

    i = i + j;

    client.user.setGame(setGame[i], `http://twitch.tv/S-F`);

  }, ms);

  console.log(`Logged in as ${client.user.tag}!`);

  console.log("وتف");

  console.log("");

  console.log(

    "╔[═════════════════════════════════════════════════════════════════]╗"

  );

  console.log(`[Start] ${new Date()}`);

  console.log(

    "╚[═════════════════════════════════════════════════════════════════]╝"

  );

  console.log("");

  console.log("╔[════════════════════════════════════]╗");

  console.log(`Logged in as * [ " ${client.user.username} " ]`);

 });

//// كود kick
client.on("message", message => {

  if (message.author.x5bz) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {

    if (!message.channel.guild)

      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))

      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");

    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))

      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");

    let user = message.mentions.users.first();

    let reason = message.content

      .split(" ")

      .slice(2)

      .join(" ");

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");

    if (!reason) return message.reply("**اكتب سبب الطرد**");

    if (!message.guild.member(user).kickable)

      return message.reply(

        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"

      );

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()

      .setAuthor(`KICKED!`, user.displayAvatarURL)

      .setColor("RANDOM")

      .setTimestamp()

      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")

      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")

      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");

    message.channel.send({

      embed: kickembed

    });

  }

});

 /// كود  ban
client.on("message", message => {

  if (message.author.codes) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {

    if (!message.channel.guild)

      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))

      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))

      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");

    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");

    if (!message.guild.member(user).bannable)

      return message.reply(

        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"

      );

    message.guild.member(user).ban(7, user);

    message.channel.send(

      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `

    );

  }

});


/// كود unban
client.on("message", message => {

  let user =

    message.mentions.users.first() ||

    client.users.get(message.content.split(" ")[1]);

  if (message.content.startsWith(prefix + "unban")) {

    if (!message.member.hasPermission("ADMINISTRATOR"))

      return message.channel.send("❌|**`ADMINISTRATOR`لا توجد لديك رتبة`**");

    if (!user)

      return message.channel.send(

        `Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`

      );

    message.guild.unban(user);

    message.guild.owner.send(

      `لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`

    );

    var embed = new Discord.RichEmbed()

      .setThumbnail(message.author.avatarURl)

      .setColor("RANDOM")

      .setTitle("**●Unban** !")

      .addField("**●User Unban :** ", `${user}`, true)

      .addField("**●By :**", ` <@${message.author.id}> `, true)

      .setAuthor(message.guild.name);

    message.channel.sendEmbed(embed);

  }

});
 
/// كود setcolors 
client.on("message", msg => {
  let args = msg.content
    .split(" ")
    .slice(1)
    .join(" ");

  if (msg.content.split(" ")[0].toLowerCase() === prefix + "setcolors") {
    if (!args)
      return msg.channel.send("`الرجاء كتابة عدد اللوان المرجى صنعها`");

    if (!msg.member.hasPermission("MANAGE_ROLES")) return;

    msg.channel.send(`** Done Colors Was Successful Created ${args}**`);

    setInterval(function() {});

    let count = 0;

    let ecount = 0;

    for (let x = 1; x < `${parseInt(args) + 1}`; x++) {
      msg.guild.createRole({
        name: x,

        color: "RANDOM"
      });
    }
  }
});
//// كود فتح تكت 
let current    = 0;
//
client.on("message", message => {

  if (message.content.startsWith(prefix + "new")) {

       let args = message.content

      console.log(current);

		let openReason = "";

		current++; 
       
       
    const reason = message.content

      .split(" ")

      .slice(1)

      .join(" ");

 if (!args)

    if (!message.guild.roles.exists(gg => gg.name === "support"))

      return message.channel.send(`لازم تسوي رتبة اسمها \`support\`.`);

 

    if (

      message.guild.channels.filter(

        Channel => Channel.name == `ticket-${current}` && Channel.type == "Ticket"

      ).size > 0

    )

      return message.channel.send(`You already have a ticket open.`);


    message.guild.createChannel(`ticket-${current}`, "Ticket")

    
    
      .then(c => {

        let role = message.guild.roles.find(gg => gg.name === "support");

        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");

        c.overwritePermissions(role, {

          SEND_MESSAGES: true,

          READ_MESSAGES: true

        });

        c.overwritePermissions(message.author, {

          SEND_MESSAGES: true,

          READ_MESSAGES: true

        });

        c.overwritePermissions(message.guild.id, {

          READ_MESSAGES: false

        });

        message.channel.send(

          `:white_check_mark: **Your ticket has been created, **${c}.`

        );

        const embed = new Discord.RichEmbed()

          .setColor(0x23b2d6)

          

          .addField(

            `Support will be with you shortly.`,

            `To close this ticket`

          )

 

            
         

          

       

                

          .setTimestamp();

        c.send({

          embed: embed

           

        });

      })
/// كود غلق تكت
} else if (message.content.startsWith(prefix + "close")) {
    if (!message.guild.roles.exists(gg => gg.name === "support"))
      return message.channel.send(` لازم تسوي رتبة اسمها \`Support\`.`);

    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");

    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "support").first().id
      )
    )
      return message.channel.send("You don't have the `support` role!");

    message.channel

      .delete()

      .catch(e => message.channel.send("Check my permissions!"));
  }
});
  /// كود server 
client.on("message", message => {

  if (message.content.startsWith(prefix + "server")) {

    if (!message.channel.guild)

      return message.channel.send(` | This Command is used only in servers!`);

    const millis = new Date().getTime() - message.guild.createdAt.getTime();

    const now = new Date();

    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];

    const days = millis / 1000 / 60 / 60 / 24;

    var embed = new Discord.RichEmbed()

      .setAuthor(message.guild.name, message.guild.iconURL)

      .addField(":id:✽** Server ID:**", `» ${message.guild.id} `, true)

      .addField(

        ":calendar:✽** Created On**",

        `» ${message.guild.createdAt.toLocaleString()}`,

        true

      )

      .addField(":crown: ✽**Server Owner**", `**${message.guild.owner}**`, true)

      .addField(

        `✽** Members ** [${message.guild.members.size}]`,

        `**${

          message.guild.members.filter(c => c.presence.status !== "offline")

            .size

        }** **Online**`,

        true

      )

      .addField(

        ":speech_balloon:✽** Channels **",

        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +

          " TexT | VoicE  " +

          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,

        true

      )

      .addField(":earth_africa:✽** Region **", ` ${message.guild.region}`, true)

      .setImage("")

      .setColor("#000000");

    message.channel.sendEmbed(embed);

  }

});

/// كود move
client.on("message", message => {
  if (!message.channel.guild) return;

  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }

      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;

          var usermentioned = message.mentions.members.first().id;

          var embed = new Discord.RichEmbed()

            .setTitle("Succes!")

            .setColor("#000000")

            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );

          var embed = new Discord.RichEmbed()

            .setTitle(`You are Moved in ${message.guild.name} `)

            .setColor("RANDOM")

            .setTitle(`✽ **Premium**`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );

          message.guild.members

            .get(usermentioned)

            .setVoiceChannel(authorchannel)

            .then(m => message.channel.send(embed));

          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});
/// كود clear 
client.on("message", function(message) {
  if (!message.channel.guild) return;

  if (message.author.bot) return;

  if (message.author.id === client.user.id) return;

  if (message.author.equals(client.user)) return;

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLocaleLowerCase()) {
    case "clear":
      message.delete();

      if (!message.channel.guild) return;

      if (message.member.hasPermission(0x2000)) {
        if (!args[1]) {
          message.channel.fetchMessages().then(messages => {
            message.channel.bulkDelete(messages);

            var messagesDeleted = messages.array().length;

            message.channel

              .send(
                " " +
                  "**```fix\n" +
                  messagesDeleted +
                  " " +
                  ": عدد الرسائل التي تم مسحها" +
                  "```**"
              )

              .then(m => m.delete(5000));
          });
        } else {
          let messagecount = parseInt(args[1]);

          message.channel

            .fetchMessages({ limit: messagecount })

            .then(messages => message.channel.bulkDelete(messages));

          message.channel

            .send(
              " " +
                "**```fix\n" +
                args[1] +
                " " +
                ": عدد الرسائل التي تم مسحها" +
                "```**"
            )

            .then(m => m.delete(5000));

          message.delete(10000);
        }
      } else {
        var manage = new Discord.RichEmbed()

          .setDescription("You Do Not Have Permission MANAGE_MESSAGES :(")

          .setColor("RANDOM");

        message.channel.sendEmbed(manage);

        return;
      }
  }
});
/// كود colors 
client.on("message", message => {
  if (!message.guild || message.author.bot) return;

  if (message.content == prefix + "colors") {
    var fsn = require("fs-nextra");

    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];

      var { Canvas } = require("canvas-constructor");

      var x = 0;

      var y = 0;

      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;

      message.guild.roles

        .filter(role => !isNaN(role.name))

        .sort((b1, b2) => b1.name - b2.name)

        .forEach(() => {
          x += 100;

          if (x > 100 * 12) {
            x = 100;

            y += 80;
          }
        });

      var image = await fsn.readFile(`./colors/${f}`);

      var xd = new Canvas(100 * 11, y + 350)

        .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)

        .setTextBaseline("middle")

        .setColor("white")

        .setTextSize(60)

        .addText(`قائمة الألوان`, 375, 40);

      x = 0;

      y = 150;

      message.guild.roles

        .filter(role => !isNaN(role.name))

        .sort((b1, b2) => b1.name - b2.name)

        .forEach(role => {
          x += 75;

          if (x > 100 * 10) {
            x = 75;

            y += 80;
          }

          xd.setTextBaseline("middle")

            .setTextAlign("center")

            .setColor(role.hexColor)

            .addBeveledRect(x, y, 60, 60, 15)

            .setColor("white");

          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }

          xd.addText(role.name, x + 30, y + 30);
        });

      message.channel.sendFile(xd.toBuffer());
    });
  }
});
/// كود color 
client.on("message", message => {

  let args = message.content.split(" ").slice(1);

  if (message.content.split(" ")[0] == prefix + "color") {

    const embedd = new Discord.RichEmbed()

      .setFooter(

        "Requested by " + message.author.username,

        message.author.avatarURL

      )

      .setDescription(`**There's No Color With This Number ** :x: `)

      .setColor(`ff0000`);

    if (!args[0]) return message.channel.sendEmbed(embedd);

    if (isNaN(args[0]))

      return message.channel.sendEmbed(

        embedd.setDescription("Please select a number :x:")

      );

    if (!message.guild.roles.find("name", `${args[0]}`))

      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);

    if (!a) return;

    if (a.hasPermission(8))

      return message.channel.send(

        embedd.setDescription("This color has administrator!")

      );

    const embed = new Discord.RichEmbed()

      .setFooter(

        "Requested by " + message.author.username,

        message.author.avatarURL

      )

      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);

    message.channel.sendEmbed(embed);

    if (!args[0]) return;

    setInterval(function() {});

    let count = 0;

    let ecount = 0;

    for (let x = 1; x < 201; x++) {

      message.member.removeRole(message.guild.roles.find("name", `${x}`));

    }

    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));

  }

});

///  كود close & open
client.on("message", message => {

  if (message.content === "close") {

    if (!message.channel.guild)

      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))

      return message.reply(" ليس لديك صلاحيات");

    message.channel

      .overwritePermissions(message.guild.id, {

        SEND_MESSAGES: false

      })

      .then(() => {

        message.reply("**تم قفل الشات :no_entry: **");

      });

  }

  if (message.content === "open") {

    if (!message.channel.guild)

      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))

      return message.reply("ليس لديك صلاحيات");

    message.channel

      .overwritePermissions(message.guild.id, {

        SEND_MESSAGES: true

      })

      .then(() => {

        message.reply("**تم فتح الشات :white_check_mark:**");

      });

  }

});

 
 /// كود help
client.on("message", message => {

  var helplist = `** اوامر عامة:  

>  credits - لمعرفة الكردت

---------------------

> daily -  لأخذ كريدت من البوت كل 24 ساعة

---------------------

> server - لمعرفة معلومات السيرفر

---------------------

> bot - لمعرفة معلومات البوت

---------------------

> new - لفتح تكت

---------------------

> link -  لصنع رابط لك

---------------------

> invite -  لمعرفة الانفتاي حقك

---------------------

> https://wolves6.glitch.me موقع البوت

---------------------

> say - لارسال رسالة شبه ايمبد

---------------------

> ايمبد - لإرسال رسالة ايمبد

---------------------

> tax - لمعرفة ضريبة تحويل كريدت برو بوت

---------------------

> colors - لمعرفة الالوان

---------------------

> color - لوضع لون عليك

---------------------

> help1 - الاظهار قائمة هيلب ادارية

---------------------

> kill - لقتل شخص معين 

---------------------

>  اوامر الألعاب 🎮

---------------------

> فكك - ${prefix}fkk

---------------------

> ركب - ${prefix}rkb

---------------------

> اسرع - ${prefix}fast

---------------------

> رياضيات - ${prefix}math

---------------------

> لغز - ${prefix}puzzle

---------------------

> اكس او - ${prefix}xo

**`;

  if (message.content === prefix + "help") {

          message.react("✅");

        


 

    

    

    

    message.author

      .send(helplist)

      .catch(error =>

        message.reply(

          "** لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :negative_squared_cross_mark:**"

        )

      );

  }

});

client.on("message", message => {

  var helplistadmin = `** اوامر ادارية: 

> close - لقفل الشات

---------------------

> open - لفتح الشات

---------------------

> ban - لعطاء شخص معين بان

---------------------

> unban - الازالة الباند من شخص معين

---------------------

> kick - لطرد شخص معين

---------------------

> setcolors - لصنع الوان 

---------------------

> role - لعطاء شخص رول معين

---------------------

> removerole - الازالة رول من شخص معين

---------------------

> stop - لايقاف الاغاني في قائمة الانتضار

---------------------

> move - لسحب شخص معين لرومك الصوتي

---------------------

> mute - لعطاء شخص معين ميوت كتابي

---------------------

> unmute - لإزالة ميوت كتابي من شخص معين

**`;

  if ( message.content === prefix + "help1") {

    if (!message.member.hasPermission("MANAGE_MESSAGES"))

      return message.reply("ليس لديك صلاحيات");


          message.react("✅");

       


    

    

    message.author

      .send(helplistadmin)

      .catch(error =>

        message.reply(

          "** لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :negative_squared_cross_mark:**"

        )

      );

  }

});
////  كود say
client.on("message", msg => {

  if (msg.author.bot) return;

  let args = msg.content

    .split(" ")

    .slice(1)

    .join(" ");


  if (msg.content.startsWith(prefix + "say")) {
    msg.delete(100);

    const embed = new Discord.RichEmbed()

      .setColor(`RED`)

      .setDescription(args);

    msg.channel.sendEmbed(embed);
  }

});
/// كود mute 
client.on("message", message => {

  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {

    if (message.author.bot) return;

    if (!message.member.hasPermission("MANAGE_ROLES"))

      return message

        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")

        .catch(console.error);

    let user = message.mentions.users.first();

    let modlog = client.channels.find(gg => gg.name === "log");

    let muteRole = client.guilds

      .get(message.guild.id)

      .roles.find(gg => gg.name === "Muted");

    if (!muteRole)

      return message

        .reply("** لا يوجد رتبة الميوت 'Muted' **")

        .catch(console.error);

    if (message.mentions.users.size < 1)

      return message

        .reply("** يجب عليك منشنت شخص اولاً**")

        .catch(console.error);

    const embed = new Discord.RichEmbed()

      .setColor(0x00ae86)

      .setTimestamp()

      .addField("الأستعمال:", "اسكت/احكي")

      .addField(

        "تم ميوت:",

        `${user.username}#${user.discriminator} (${user.id})`

      )

      .addField(

        "بواسطة:",

        `${message.author.username}#${message.author.discriminator}`

      );

    if (

      !message.guild

        .member(client.user)

        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")

    )

      return message

        .reply("** لا يوجد لدي برمشن Manage Roles **")

        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {

      return message

        .reply("**:white_check_mark: .. تم اعطاء العضو ميوت**")

        .catch(console.error);

    } else {

      message.guild

        .member(user)

        .addRole(muteRole)

        .then(() => {

          return message

            .reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**")

            .catch(console.error);

        });

    }

  }

});
/// كود unmute 
client.on("message", message => {

  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {

    if (message.author.bot) return;

    if (!message.member.hasPermission("MANAGE_ROLES"))

      return message

        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")

        .catch(console.error);

    let user = message.mentions.users.first();

    let modlog = client.channels.find(gg => gg.name === "log");

    let muteRole = client.guilds

      .get(message.guild.id)

      .roles.find(gg => gg.name === "Muted");

    if (!muteRole)

      return message

        .reply("** لا يوجد لديك رتبه الميوت 'Muted' **")

        .catch(console.error);

    if (message.mentions.users.size < 1)

      return message

        .reply("** يجب عليك منشنت شخص اولاً**")

        .catch(console.error);

    const embed = new Discord.RichEmbed()

      .setColor(0x00ae86)

      .setTimestamp()

      .addField("الأستعمال:", "اسكت/احكي")

      .addField(

        "تم فك الميوت عن:",

        `${user.username}#${user.discriminator} (${user.id})`

      )

      .addField(

        "بواسطة:",

        `${message.author.username}#${message.author.discriminator}`

      );

    if (

      !message.guild

        .member(client.user)

        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")

    )

      return message

        .reply("** لا يوجد لدي برمشن Manage Roles **")

        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {

      return message

        .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")

        .catch(console.error);

    } else {

      message.guild

        .member(user)

        .removeRole(muteRole)

        .then(() => {

          return message

            .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")

            .catch(console.error);

        });

    }

  }

});

 /// كود ترحيب 
const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(king => {

    king.fetchInvites().then(guildInvites => {

      invites[king.id] = guildInvites;

    });

  });

});

client.on('guildMemberAdd', member => {

  member.guild.fetchInvites().then(guildInvites => {

    const gamer = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => gamer.get(i.code).uses < i.uses);

    const inviter = client.users.get(invite.inviter.id);

    const welcome = member.guild.channels.find(channel => channel.name === "welcome");

    welcome.send(`  join ${member} invited

by ${inviter}   (  ${invite.uses} invites )  `)

  });

});

/// كود ibot
client.on('message', msg => {

    if(msg.content.startsWith(prefix + 'binv')) {

    if(msg.channel.type === 'dm') return;

const user = msg.mentions.users.first();

if(!user) return msg.channel.send('``' + '**قم بتحديد بوت**' + '``')

if(!user.bot) return msg.reply('`منشن بوت`');

msg.channel.send(`**Bot InviteURL : ** https://discordapp.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=384064`)

    }

});

 /// كود اختصار 
const shorten = require('isgd');

client.on('message', ninja => {

 if (ninja.content.startsWith(prefix + 'short')) {
ninja.delete(100);

   if (!ninja.channel.guild) return;

    ninja.channel
   

   

    

    let args = ninja.content.split(" ").slice(1);

  if (!args[0]) return ninja.channel.send('**استعمل**: '+ prefix +'short <رابط>')

  if (!args[1]) {

    shorten.shorten(args[0], function(res) {

      if (res.startsWith('Error:')) return ninja.channel.send('**Usage**: '+ prefix +'short <link>');
 
      ninja.channel.send(`اختصار الرابط: ** ${res} ** `);

  
})

}}

});
//// nickname 
client.on("message", message => {

if(message.content.startsWith(prefix + "nickname")){

if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return;

var user = message.mentions.members.first();

var args = message.content.split(" ").slice(2);

var nick = args.join(" ");

if(!user || !args) return message.channel.send(`**• | Usage:** ${prefix}nickname \`\`@Name\`\` nickname`);
message.react("✅");
message.guild.member(user.user).setNickname(`${nick}`);

message.channel.send(`Successfully changed ** ${user} ** nickname to ** ${nick} ** `);
  message.react("✅");

}

});
/// 
client.on('guildMemberAdd', member=> {

    member.addRole(member.guild.roles.find("name","member"));

    });

