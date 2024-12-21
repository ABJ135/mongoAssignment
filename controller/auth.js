const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticationToken = (req,res,next)=>{
    const authHeader = req.headers.authorization

    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.status(401).json({message:"UnAuthorized"})
    }

    jwt.verify(token,process.env.Jwt_Key,(err,data)=>{
        if(err)
          return  res.status(201).json({message:"unauthorized"})

        console.log(data,"from JWT")
        next();
    })

}

module.exports = authenticationToken