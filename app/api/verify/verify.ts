// app/api/verify/verify.ts
import jwt from 'jsonwebtoken';

const secretKey = 'mySecretKey';

export async function verifyTokenLogic(token: string) {
  console.log("0");
  if (!token) {
    return { status: 401, body: { error: 'Invalid token' } };
  }

  try {
    console.log("1");
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    console.log("2");
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("3");
    if (decoded.exp && decoded.exp < currentTime) {
      console.log("4");
      return { status: 200, body: { status: 'tokenExpired' } };
    } else {
      console.log("5");
      return { status: 200, body: { status: 'ok' } };
    }
  } catch (err) {
    return { status: 401, body: { error: 'Invalid token!!' } };
  }
}
