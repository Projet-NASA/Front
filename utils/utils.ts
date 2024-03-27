import jwt from "jsonwebtoken";
import { useRouter } from "vue-router";
const SECRET_KEY = "your-secret-key";

export function checkTokenAndRedirect() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY);
      router.push("/");
    } catch (err) {
      console.error("Token has been tampered with", err);
    }
  }
}
 
