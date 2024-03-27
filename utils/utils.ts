import jwt from "jsonwebtoken";
import { useRouter } from "vue-router";
const SECRET_KEY = "U8lf@gQPKX4#xWp#eSH$";

export function checkTokenAndRedirect() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY);
      router.push("/");
    } catch (err) {
      console.error("le jeton a été falsifié", err);
    }
  }
}
 
