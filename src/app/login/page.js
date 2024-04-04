"use client"

import { useRef, useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Spinner } from "@nextui-org/react"
function Login() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const username = useRef()
    const password2 = useRef()
    const [submit, setSubmit] = useState(false)
    const [submit2, setSubmit2] = useState(false)
    const [dataUser, setDataUser] = useState()
    const [dataPass, setDataPass] = useState()
    const handleSub = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await signIn("credentials", {
                dataUser,
                dataPass,
                submit,
                submit2,
                redirect: false,
            })
            if (data.error) {
                setLoading(false)
                return
            } else {
                router.replace("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }
    function handleFocus(e, ref) {
        ref.current.innerText = ""
        e.target.className = e.target.className.replace(" unvalid", "")
    }
    function handleCheck(e, ref = null) {
        const value = e.value
        //không có data
        if (!value) {
            ref.current.innerText = "Vui lòng nhập đủ thông tin"
            return false
        }
        //có data
        else {
            ref.current.innerText = ""
            switch (e.name) {
                //username :Kí tự đầu tiên là chữ và độ dài lớn hơn 4
                case "username":
                    if (
                        !(
                            e.value.length >= 4 &&
                            ((e.value.charCodeAt(0) >= 65 &&
                                e.value.charCodeAt(0) <= 90) ||
                                (e.value.charCodeAt(0) >= 97 &&
                                    e.value.charCodeAt(0) <= 122))
                        )
                    ) {
                        if (!e.className.includes("unvalid"))
                            e.className += " unvalid"
                        ref.current.innerText =
                            "Tài khoản không hợp lệ! Vui lòng nhập lại"
                        return false
                    }
                    return true

                //password: Kí tự đầu tiên là chữ và viết hoa và độ dài lớn hơn 6
                case "password":
                    if (!(e.value.length >= 4)) {
                        if (!e.className.includes("unvalid"))
                            e.className += " unvalid"
                        ref.current.innerText =
                            "Mật khẩu không hợp lệ! Vui lòng nhập lại"
                        return false
                    }
                    return true

                default:
                    return false
            }
        }
    }
    return (
        <div className="w-full h-screen bg-[#f0f2f5] flex justify-center items-center">
            <div className="bg-white flex justify-center items-center rounded-xl">
                <div className="px-5 py-8 flex items-center justify-center flex-col">
                    <div className="font-extrabold text-3xl text-black align-center mb-10">
                        Đăng nhập cho  Phòng đào tạo
                    </div>
                    <div
                    // action={() =>
                    //     handleSubmit({
                    //         submit,
                    //         submit2,
                    //         dataUser,
                    //         dataPass,
                    //     })
                    // }
                    // action={handleSub}
                    >
                        <input
                            type="text"
                            className="w-[360px] p-3 border-2 border-solid border-black outline-none rounded box-border  text-sm tracking-wide block"
                            name="username"
                            placeholder="Tài khoản"
                            onChange={(e) => setDataUser(e.target.value)}
                            onFocus={(e) => handleFocus(e, username)}
                            onBlur={(e) =>
                                handleCheck(e.target, username)
                                    ? setSubmit(true)
                                    : setSubmit(false)
                            }
                        />
                        <p
                            className="mx-2 align-left text-sm h-[20px] text-red-500"
                            ref={username}
                        ></p>
                        <input
                            type="password"
                            className="w-[360px] p-3 border-2 border-solid border-black outline-none rounded box-border  text-sm tracking-wide block"
                            name="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => setDataPass(e.target.value)}
                            onFocus={(e) => handleFocus(e, password2)}
                            onBlur={(e) =>
                                handleCheck(e.target, password2)
                                    ? setSubmit2(true)
                                    : setSubmit2(false)
                            }
                        />
                        <p
                            className="mx-2 align-left text-sm h-[20px] text-red-500"
                            ref={password2}
                        ></p>
                        <div
                            className={`w-[360px] h-12  text-center flex justify-center items-center  outline-none rounded   tracking-wide   ${
                                !loading ? "bg-black" : "bg-gray-300"
                            }  text-white font-bold text-lg`}
                            onClick={
                                loading
                                    ? null
                                    : (e) => {
                                          handleSub(e)
                                      }
                            }
                        >
                            {loading ? <Spinner size="sm" /> : "Đăng nhập"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
