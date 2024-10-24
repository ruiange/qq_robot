import axios from "axios";

const weather = async (client, event) => {
    if (!event.content.includes('/今日天气')) {
        return
    }
    console.warn('今日天气')
    const {data} = await axios({
        url: 'https://tq.ruiange.work/?type=json',
        method: 'get'
    })
    console.warn(data.imgUrl)
    if (data.imgUrl) {
       const mediaInfo  = await client.api.sendGroupFile(event.group_openid, {
            file_type: 1,
            /** 需要发送媒体资源的 url */
            url: data.imgUrl,
            /** 设置 true 会直接发送消息到目标端，且会占用主动消息频次 */
            srv_send_msg: false
        })
        console.warn(mediaInfo.data)
        await client.api.sendGroupMessage(event.group_openid, {
            msg_id: event.id,
            msg_type: 7,
            content: '',
            media: {
                file_info:mediaInfo.data.file_info
            }
        })
    } else {
        await client.api.sendGroupMessage(event.group_openid, {
            msg_id: event.id,
            msg_type: 0,
            content: `今日大明气象局不营业,明天再来吧`,
        });
    }
}
export default weather