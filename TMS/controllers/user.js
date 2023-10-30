const User=require('../models/user');

function handleCreateUser(req,res){
    let username=req.body.username;
    let email=req.body.email;
    console.log(username,email);

    const user=new User({
        username:username,
        email:email
    });
    
    user.save()
    .then((result)=>{
        res.send({"msg":"Success","userid":result._id});
    })
    .catch((err)=>{
        console.log(err)
        res.send('Fail');
    });
}

module.exports={
    handleCreateUser,
}