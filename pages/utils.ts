import { useRouter } from "vue-router";

export function checkTokenAndRedirect() {
  const router = useRouter();
  if (localStorage.getItem("token")) {
    router.push("/");
  }
}
