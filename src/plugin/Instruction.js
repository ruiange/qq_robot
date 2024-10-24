import tieBa from "./tieba/index.js";
import weather from "./weather/index.js";


const Instruction =(client,event)=>{
    tieBa(client, event).then(r =>{})
    weather(client, event).then(r =>{})
}


export default Instruction