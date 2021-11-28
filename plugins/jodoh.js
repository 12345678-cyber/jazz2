const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} ariffb|dinda annisa`
    let [name1, name2] = text.split(/[&|.]/i)
    if (!name1 || !name2) throw `contoh:\n${usedPrefix + command} ariffb|dinda annisa`

    let res = await fetch(global.API('zeks', '/api/primbonjodoh', { name1, name2 }, 'apikey'))
    if (res.status != 200) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (json.status) {
        let { name1, name2, thumb, positif, negatif } = json.result
        stiker = await sticker(false, thumb, name1, name2)
        await conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m })
        m.reply(`
*Nama kamu:* ${name1}
*Nama doi:* ${name2}

*Positif:*
${positif}

*Negatif:*
${negatif}

*© stikerin*
`.trim())
    }
    else throw json

}
//handler.help = ['jodoh'].map(v => v + ' <name>|<name doi>')
//handler.tags = ['fun']
handler.command = /^(jodoh)$/i

handler.limit = true

module.exports = handler