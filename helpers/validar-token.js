const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request,res = response,next)=>{

    const token = req.header('x-token')

    try {

        const user = jwt.verify(token, process.env.JWT_SECRET)

        if(!user){
            res.status(400)
            .json({
                ok: false,
                message: 'No es valido'
            })
        }

        req.body.name = user.name
        req.body.id = user.id
        req.body.email = user.email

        
    } catch (error) {
        return res.status(400)
        .json({
            ok: false,
            message: 'Error validando'
        })
    }
    next()
    
}


module.exports = {
    validarJWT
}