import dotenv from 'dotenv'

dotenv.config()


export default {
    //mongo para factory 
    persistence: process.env.PERSISTENCE, 
    //atlas
    mongo_url: process.env.mongo_url,
    //puerto
    port: process.env.PORT
}