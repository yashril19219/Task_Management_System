const amqp=require('amqplib/callback_api');
const {sendTaskCreationEmail}=require('./service');
console.log('Rabbitmq connection......')
amqp.connect('amqp://localhost:5672',(err,conn)=>{
    if(err){
        throw err;
    }
    conn.createChannel((err,channel)=>{
        if(err){
            throw err;
        }

        try{
            let queueName='Email_Queue';

            channel.assertQueue(queueName,{durable: false});

            channel.consume(queueName,(msg)=>{
                console.log('Received a message: ')
                const message=JSON.parse(msg.content.toString());
                console.log(message);
                sendTaskCreationEmail(message.user.email,message.task);
            },{noAck:true});

            
        }
        catch{
            console.log('Error');
        }
    })
})





