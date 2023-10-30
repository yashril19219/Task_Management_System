const {connectRedis} = require('../connections/redis');
const redis=require('redis');
require("dotenv").config();


async function getFromCache(key){
    const client=redis.createClient(process.env.REDIS_HOST,process.env.REDIS_PORT)
    await client.connect().catch((err)=>{
        console.log('Error connecting to redis : ',err);
    });


    const data=await client.get(key);

    if(data!=null){
        return {'status':'HIT','data':data};
    }
    else{
        return {'status':'MISS'};
    }

}


async function setIntoCache(key,value){
    const client=redis.createClient(process.env.REDIS_HOST,process.env.REDIS_PORT)
    await client.connect().catch((err)=>{
        console.log('Error connecting to redis : ',err);
    });
    await client.setEx(key,20,value);
}

module.exports={
    getFromCache,
    setIntoCache
}