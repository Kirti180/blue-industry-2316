const authorise= (permitibble)=>{

    return (req,res,next)=>{
        const role= req.user[0].role
        console.log(req.user)
        if(permitibble.includes(role)){
            next()
        }
        else{
            res.send("Not allowed")
        }
    }
}

module.exports={
    authorise
}