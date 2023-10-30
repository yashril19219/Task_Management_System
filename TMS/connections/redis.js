const redis=require('redis');

async function connectRedis(host,port){
    return redis.createClient({
        host: host,
        port: port
    })
}

module.exports={
    connectRedis
}

