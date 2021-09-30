const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const authController = {


    register: async (req, res = response) => {

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User already exists'
                })
            }
            user = new User(req.body)

            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(password, salt)

            await user.save()

            const token = await generarJWT(user)

            return res.status(201).json({
                "ok": true,
                "id": user.id,
                "name": user.name,
                "email": user.email,
                token
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                "ok": false,
                "message": "error al registrar"
            });
        }

    },

    login: async (req, res = response) => {

        try {

            const { name, email, password } = req.body;

            const user = await User.findOne({ email })


            if (!user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario no existe'
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Contrase;a herrada'
                })
            }

            const token = await generarJWT(user)


            return res.status(201).json({
                "ok": true,
                "id": user.id,
                "name": user.name,
                "email": user.email,
                token
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                "ok": false,
                "message": "error al ingresar"
            });
        }



    },
    renewToken: async (req, res = response) => {

        try {

            const id = req.body.id
            const name = req.body.name
            const email = req.body.email

            const user = {
                id,
                name,
                email
            }

            const token = await generarJWT(user)


            return res.status(201).json({
                "ok": true,
                token
            });


        } catch (err) {
            console.log(err);
            return res.json({
                "ok": true,
                "message": "Error renovando token"
            }).status(400);

        }
    }


}

module.exports = authController;