import axios from "axios";
import mysql from "mysql2";

const cookie = 'buvid_fp=a5dce24532874a1726c7a9b2dcc70ca7; buvid3=AC43A468-ECEB-5CEB-A82B-19EA52E9B9F159855infoc; b_nut=1721903660; buvid4=C71CC185-77FA-BA8B-385F-E621F3BDBFC059855-024072510-pz0c8kYwj%2F6QypOdWaIALw%3D%3D; _clck=1vb6pxx%7C2%7Cfo9%7C0%7C1541; uid=1; pwd=d68913fcf88313137a9c66d527d57cf1'


/**
 * 查询小黑屋
 * @returns {Promise<void>}
 */
const queryList = async (client,event) => {
   try{
       const connection = operationalData()
       connection.connect();
       connection.query('SELECT * FROM tc_ver4_ban_list', (error, results, fields) => {
           if (error) {
               console.error('error:', error.message);
               throw error;
           }
           console.log(results);
           if(results.length===0){
               client.api.sendGroupMessage(event.group_openid, {
                   msg_id: event.id,
                   msg_type: 0,
                   content: '\n小黑屋为空;',
               });
           }else{
               let msg = `\n小黑屋里有${results.length}个坏🥚\n============\n\n`
               for (let i = 0; i < results.length; i++) {
                   msg += `${i+1}.${results[i].name}\n`
               }


               client.api.sendGroupMessage(event.group_openid, {
                   msg_id: event.id,
                   msg_type: 0,
                   content: msg,
               });
           }

       });
       connection.end();
   }catch (e) {
       console.log(e.message)
   }
}


const banUser = async (client,event) => {

    console.log(event.content)

    const id = event.content.replace('/关起来', '').trim()

    console.log(id)

    const {data} = await axios({
        post: 'get',
        url: `http://tb.ruiange.work/index.php?plugin=ver4_ban&api&m=search&words=${id}`,
        headers: {
            ['cookie']: cookie
        }
    })
    console.log(data)



    if (data.code === 200 && data.data.length > 0) {
        console.log('=====')
        if(data.data[0].tieba_uid!==id){
            console.log('未查询到此用户')
            await client.api.sendGroupMessage(event.group_openid, {
                msg_id: event.id,
                msg_type: 0,
                content: '未查询到此用户,请输入正确ID',
            });
            return
        }
        const userData = {
            "uid": 1,
            "pid": 3,
            "name": data.data[0].name,
            "name_show": data.data[0].show_name,
            "portrait": data.data[0].portrait,
            "tieba": "九阴",
            "stime": JSON.parse((new Date().getTime() / 1000).toFixed(0)),
            "etime": 1798646400,
        }

        console.log(userData)
        const connection = operationalData()
        connection.connect();
        connection.query('INSERT INTO tc_ver4_ban_list SET ?', userData, (error, results, fields) => {
            if (error) throw error;
            console.log('插入成功');
            client.api.sendGroupMessage(event.group_openid, {
                msg_id: event.id,
                msg_type: 0,
                content: `${data.data[0].name? data.data[0].name:data.data[0].show_name}已添加到小黑屋`,
            });
        });
        connection.end();

    } else {
        console.log('未查询到此用户')
        await client.api.sendGroupMessage(event.group_openid, {
            //msg_id: event.id,
            msg_type: 0,
            content: '未查询到此用户',
        });
    }


}


const operationalData = ()=>{

    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DATA_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
}

const tieBa = async (client, event) => {
    if (event.content.includes('/小黑屋')) {
        await queryList(client,event)
    }

    if (event.content.includes('/关起来')) {
        await banUser(client,event)
    }
}




export default tieBa