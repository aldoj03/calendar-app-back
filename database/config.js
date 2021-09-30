const mogoose = require('mongoose');

const dbConecction = async ()=>{

    try {
        await mogoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('conectado');
    } catch (error) {
        console.log(error);
        throw new Error('error conectando la db')
    }

}

module.exports = {
    dbConecction
}