import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  /* esta é uma maneira de acessar o local storage (tambem é possivel acessar pelo useEffect())

  if (typeof window !== "undefined") {
    localStorage.setItem("a", "flamengo")
    console.log(localStorage.getItem("a"))
  } 
  
  não vou usá-lo neste projeto, pois considero desnecessário :)
  */
  const router = useRouter()

  const logOutHandler = () => {
    Cookies.remove("loggedin")
    router.reload()
  }

  return (
    <>
      <Link href={"/"}>
        <h1>Home</h1>
      </Link>
      <button onClick={logOutHandler}>LogOut</button>
    </>
  );
}
