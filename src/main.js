
import {Client} from 'amesu'
import Instruction from "./plugin/Instruction.js";
import aiReply from "./ai/aiReply.js";
import AiReply from "./ai/aiReply.js";




const main = async () => {
    console.log('启动机器人')
    const client = new Client({
        appid: process.env.APPID,
        token: process.env.TOKEN,
        secret: process.env.SECRET,

        events: ['GROUP_AND_C2C_EVENT', 'PUBLIC_GUILD_MESSAGES'],
        sandbox: false,
        log_level: ' ALL'
    });

//console.warn(client.api)

    // 监听频道消息
    client.on('at.message.create', async event => {
        // 快捷回复
        await event.reply({
            content: 'hello world',
        });
    });

    // 监听群聊消息
    client.on('group.at.message.create', async event => {


        console.log('有人来了')

        const content = event.content.trim()




        if(content.startsWith('/')){
            Instruction(client,event)
            return
        }

        console.warn(event)

        const msg = await AiReply(event.author.union_openid, event.content)
        await client.api.sendGroupMessage(event.group_openid, {
            msg_id: event.id,
            msg_type: 0,
            content: msg,
        });
    });

    // 监听私聊消息
    client.on('c2c.message.create', async (event) => {
        console.log('私聊来了'+event.content)




        const msg = await AiReply(event.author.user_openid, event.content)
        await client.api.sendUserMessage(event.author.user_openid, {
            msg_id: event.id,
            msg_type: 0,
            content: msg,
        });

    });
    await client.online();
};

export default main;