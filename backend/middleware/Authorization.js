const authorise= (permitibble)=>{

    return (req,res,next)=>{
        const role= req.body.role
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