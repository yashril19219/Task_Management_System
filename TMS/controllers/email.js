const amqp=require('amqplib/callback_api');
const {connectRabbitmq} = require('../connections/rabbitmq');
require("dotenv").config();

async function sendMessage(message){
    try{
        const connection=await connectRabbitmq(process.env.RABBITMQ_CONNECTION_URL);

        const channel=await connection.createChannel();

        let queueName='Email_Queue';
        
        channel.assertQueue(queueName,{durable: false});

        channel.sendToQueue(queueName,Buffer.from(message));

        setTimeout(()=>{
            connection.close();
        },500);        

    }
    catch(error){
        console.log(error);
    }
    

}


module.exports={sendMessage};



