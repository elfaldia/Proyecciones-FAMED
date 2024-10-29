import router from "next/router"
import { checkSessionService } from "./check.access.service"
import { redirect } from "next/navigation"



export default async function validateSesion(accessToken : string) {
    console.log("en validar: ", accessToken)
    
}