const jwt = require('jsonwebtoken')

const generarJWT = (usuario) => {
    return new Promise((resolve, rejected) => {

        const payload = {
            name: usuario.name,
            email: usuario.email,
            id: usuario.id
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        },
            (err, token) => {
                if (err) {
                    console.log(err);
                    rejected()
                }

                resolve(token)
            })

    })
}

module.exports = {
    generarJWT
}