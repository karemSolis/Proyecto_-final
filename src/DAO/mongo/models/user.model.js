import mongoose from "mongoose"

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:{ type: String, max: 100 },
    last_name: { type: String, max: 100 },
    email: { type: String, max: 254 },
    password: { type: String, max: 50 },

    age: Number,

    rol: String,

    id_cart: String,

    documents: //para almacenar los docu del usuario 
    [
        {
          name: { type: String},
          reference: { type: String},
        }
    ],
    last_connection: Date //fecha y hora 
})

const usersModel = mongoose.model(usersCollection, userSchema)
export default usersModel

/*
login
{
    "email": "soliskarem@gmail.com",
    "password": "123456789"
}

*/