import dotenv from 'dotenv';
import passport from "passport"
import jwt from "passport-jwt"


dotenv.config();

const JwtStrategy = jwt.Strategy //definición de la estrategía de autentificación 
const ExtractJwt = jwt.ExtractJwt //definición de la función para extraer el token 

const cookieExtractor = req => {//función para extraer el token el objeto reqbuscando el token en la cokie 
    let token = null
    if (req && req.cookies) {
        token = req.cookies["token"]
    }
    return token
}


const initializePassport = () => {//función para iniciar configuración de passport

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),//configuración de passport para uasar la estrategia jwt, saca las cookies de la solicitud usando cookieExtractor 
        secretOrKey: process.env.SESSION_SECRET //usando la clave secreta session_secret
        //secretOrKey: "ClaveSecretaSeguraYUnicajojojo"

    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err);
        }
    }));
}

export default initializePassport