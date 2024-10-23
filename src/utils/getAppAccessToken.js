import axios from "axios";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";


const filePath = path.join(process.cwd(), `src/data/access_token.json`);
let access_token_data = JSON.parse(fs.readFileSync(filePath).toString())

const url = 'https://bots.qq.com/app/getAppAccessToken'
/*获取调用凭证*/
const getAppAccessToken = async () => {
    try{

        if (access_token_data.accessToken) {

            if (dayjs(access_token_data.maturityTime).isBefore(dayjs())) {
                return access_token_data.accessToken
            }
        }
        const {data} = await axios({
            url: url,
            method: 'POST',
            data: {
                appId: process.env.APPID,
                clientSecret: process.env.SECRET
            }
        })
        const currentTime = new Date().getTime()
        const expireTime = currentTime + (data.expires_in) * 1000 //过期时间
        const maturityTime = new Date(expireTime)
        console.warn('当前时间' + dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss'))
        console.warn('过期时间' + dayjs(maturityTime).format('YYYY-MM-DD HH:mm:ss'))
        const accessToken = data.access_token
        const tokenInfo = {
            accessToken,
            expireTime,
            maturityTime: dayjs(maturityTime).format('YYYY-MM-DD HH:mm:ss')
        }
        fs.writeFileSync(filePath, JSON.stringify(tokenInfo))
        return accessToken
    }catch (e){
        console.error('获取access_token失败')
        console.error(e.message)
    }
}

export default getAppAccessToken