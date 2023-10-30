const Task=require('../models/task');
const User=require('../models/user');
const {sendMessage}=require('./email');
const{getFromCache,setIntoCache} = require('./redis');

async function handleGetTasks(req,res){
    let userid=req.query.uid;
    let taskid=req.query.id;

    if(!userid && !taskid){
        res.send('Invalid query parameters');
        return ;
    }
    
    if(userid){
        console.log(userid);
        Task.find({createdBy:userid})
        .then((tasks)=>{
            res.send(tasks);
        })
    
        .catch((err)=>{
            
            res.send('Error fetching user task');
        })
    }

    else if(taskid){
        console.log(userid,taskid);
        const result=await getFromCache(taskid);
        if(result.status=='HIT'){
            console.log('CACHE HIT.....');
            res.send(JSON.parse(result.data));
            return ;
        }

        console.log('CACHE MISS......');

        Task.findById(taskid)
        .then((task)=>{
            res.send(task);
            setIntoCache(taskid,JSON.stringify(task));
        })

        .catch((err)=>{
            console.log(err);
            res.send('Error fetching task info');
        });
    }
    else{
        res.send('Error');
    }
}

async function handleCreateTask(req,res){
    let userid=req.query.uid;
    let title=req.body.title;
    let description=req.body.description;
    let dueDate=req.body.dueDate;

    if(!userid){
        res.send('Invalid query parameter');
        return ;
    }

    if(!title){
        res.send('Title is missing');
        return ;
    }
    if(!description){
        res.send('Description is missing');
        return ;
    }
    if(!dueDate){
        res.send('Due Date is missing');
        return ;
    }



    console.log(userid,title,description,dueDate);

    const user=await User.findById(userid);

    if(!user){
        res.send('User not found');
        return ;
    }

    const task=new Task({
        title:title,
        description:description,
        dueDate:dueDate,
        createdBy:userid
    });

    console.log('Task created');

    task.save()
    .then((t)=>{
        res.send({'msg':'Successfully created a new task'})
        sendMessage(JSON.stringify({'user':user,'task':t}));
    })
    .catch((error)=>{
        console.log('Error creating task',error);
        res.send('Error creating task');
    });
}

function handleUpdateTask(req,res){
    let taskid=req.query.id;
    let title=req.body.title;
    let description=req.body.description;
    let dueDate=req.body.dueDate;
    let isCompleted=req.body.isCompleted;

    console.log(title,description,dueDate);
    if(!taskid){
        res.send('Invalid query parameter: TASKID');
        return ;
    }

    Task.findById(taskid)
    .then((task)=>{
        if(title){
            task.title=title;
        }
        if(description){
            console.log('Inside.....')
            task.description=description;
        }
        if(dueDate){
            task.dueDate=dueDate;
        }

        if(isCompleted){
            if(isCompleted=='False'){
                task.completed= false;
            }
            else if(isCompleted=='True'){
                task.completed= true;
            }
            
        }
    
        task.save()
        .then((task)=>{
            res.send({'msg':'Successfully updated the task'});
            return;
        })
        .catch((err)=>{
            res.send('Error while updating task');
            return;
        });
    })

    .catch((err)=>{
        console.log(err);
        res.send('Error fetching task info');
    });
}

function handleDeleteTask(req,res){
    let taskid=req.query.id;

    if(!taskid){
        res.send('Invalid query parameter: TASKID');
        return ;
    }

    Task.findByIdAndRemove(taskid)
    .then((result)=>{
        res.send({'message':'Task deleted successfully'});
    })
    .catch((err)=>{
        console.log(err);
        res.send({'message':'Error while deleting task'});
    })
}

module.exports={
    handleGetTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask
}