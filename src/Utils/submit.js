"use client"
import { HOST } from "@/Data"
export const handleSubmit = async (props) => {
    if (props.submit && props.submit2) {
        const responce = await fetch(
            HOST + "/api/Authentication/login/lectorer",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: props.dataUser,
                    password: props.dataPass,
                }),
            }
        ).then((res) => res.json())
        localStorage.setItem("token", res, token)
    } else {
        console.log("wrong")
    }
}
