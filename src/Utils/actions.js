"use server"
import { cookies } from "next/headers"
import { permanentRedirect } from "next/navigation"
import { redirect } from "next/navigation"

export async function checkCookies() {
    if (cookies().get("auth")?.value == undefined) return true
    return false
}

export async function logout() {
    cookies().delete("auth")
    cookies().delete("role")
    redirect("https://localhost:3000/loginadmin")
}
