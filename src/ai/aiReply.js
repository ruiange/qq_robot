import axios from "axios";


const configData = {
    method: 'post',
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer bc847147cbfb1435572dcba79ff26948.ByImKZyo7EVLmc2v',
    }
};


const createMessage = async (openId, message) => {
    // const result = await Messages.findOneAndUpdate(
    //     {openId}, // 查询条件
    //     {$push: {messages: message}, time: new Date()}, // 更新操作
    //     {new: true, upsert: true}
    // );
    // return result
    return {messages: [{role: 'user', content: message}]}
}


const AiReply = async (openId, message) => {
    return '你好~ 更多功能还在开发中'
    const {messages} = await createMessage(openId, {role: 'user', content: message})
    const config = {
        ...configData,
        data: {
            "model": "glm-4-0520",
            "messages": messages
        }
    }
    const {data} = await axios(config)
    await createMessage(openId, {role: 'assistant', content: data.choices[0].message.content})
    return data.choices[0].message.content

}

export default AiReply