
import {Client} from 'amesu'
import Instruction from "./plugin/Instruction.js";
import aiReply from "./ai/aiReply.js";
const client = new Client({
    appid: '102455699',
    token: 'ESP1oIQd87Bca89hjvbiN6Nfku0RVIu8',
    secret: '92vohaTMGA4ysmgaVQLGB61xtplhdZVS',
    events: ['GROUP_AND_C2C_EVENT', 'PUBLIC_GUILD_MESSAGES'],
    sandbox: false,
    log_level: 'OFF'
});



// 监听频道消息
client.on('at.message.create', async event => {
    // 快捷回复
    await event.reply({
        content: 'hello world',
    });
});

// 监听群聊消息
client.on('group.at.message.create', async event => {
    console.log(event);
    console.warn('有人来了')



    const content = event.content.trim()
    console.warn(content)



    if(content.startsWith('/')){
        Instruction(client,event)
        return
    }

    aiReply(client,event)

    await client.api.sendGroupMessage(event.group_openid, {
        msg_id: event.id,
        msg_type: 0,
        content: 'hello world',
    });
});

export default client