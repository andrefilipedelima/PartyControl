const mongoose = require('mongoose');

async function main() {
    try {

        mongoose.set("strictQuery", true);

        await mongoose.connect("mongodb+srv://novo_user:7C18i39STOE2U21U@cluster0.7trt4rb.mongodb.net/?retryWrites=true&w=majority");

        console.log("Conentado ao banco de dados, port: 3000");

    } catch(error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;