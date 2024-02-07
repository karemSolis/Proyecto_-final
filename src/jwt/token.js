import jwt from 'jsonwebtoken';

export function generateAndSetToken(res, email, password) {
  const token = jwt.sign({ email, password, role: "user" }, "ClaveSecretaSeguraYUnicajojojo", { expiresIn: "24h" });
  res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
  return token
}
export function getEmailFromTokenLogin(token) {
  try {
    const decoded = jwt.verify(token, 'ClaveSecretaSeguraYUnicajojojo');
    return decoded.email;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null; 
  }
}

export function generateAndSetTokenEmail(email) {
  const token = jwt.sign({ email }, 'secreto', { expiresIn: '1h' });
  return token
}
export function getEmailFromToken(token) {
  try {
    const decoded = jwt.verify(token, 'secreto');
    const email = decoded.email;
    return email;
  } catch (error) {

    console.error('Error al decodificar el token:', error);
    return null;
  }
}

export function validateTokenResetPass(token) {
  try {
    const result = jwt.verify(token, 'secreto');
    return result;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('El token ha expirado');
      return null; 
    } else {
      console.error('Error al verificar el token:', error);
      return null;
    }
  }
}