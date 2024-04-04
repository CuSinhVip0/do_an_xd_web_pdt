import { MdKeyboardArrowDown } from "react-icons/md"
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io"
import { IoChatboxOutline } from "react-icons/io5"
import { CiUser, CiSettings } from "react-icons/ci"
import { signOut } from "next-auth/react"
export default function AdminHeader() {
    return (
        <header className=" fixed z-20  left-0 right-0  bg-white shadow-lg box-border ">
            <div className="max-w-[1320px] mx-auto flex justify-between items-center">
                <div>GRADEBOOK PAGE FOR TRAINING ROOM</div>
                <div className="inline-flex  items-center ">
                    <div className="p-3 box-border cursor-pointer hover:bg-gray-500">
                        <IoIosNotificationsOutline className="text-xl " />
                    </div>
                    <div className="p-3 cursor-pointer hover:bg-gray-400">
                        <IoChatboxOutline className="text-xl " />
                    </div>
                    <div className=" group relative inline-flex items-center p-6  cursor-pointer before:hidden hover:before:block before:absolute  before:w-full before:h-4 before:top-full before:right-0">
                        Hi Phòng đào tạo ❤️
                        <MdKeyboardArrowDown />
                        <div className="hidden group-hover:block absolute bg-white top-[120%] right-0  shadow-xl rounded-lg before:border-[10px] before:absolute before:border-solid before:border-transparent before:border-t-white before:border-l-white before:rotate-45 before:top-[-8px] before:right-[60px] ">
                            <ul className="flex flex-wrap py-3 ">
                                <li className="inline-flex items-center gap-2 w-max min-w-full px-5 py-2  hover:bg-gray-400">
                                    <CiUser />
                                    Thông tin của tôi
                                </li>
                                <li className="inline-flex items-center gap-2 w-max min-w-full px-5 py-2 hover:bg-gray-400">
                                    <CiSettings />
                                    Cài đặt
                                </li>
                                <li
                                    onClick={() => {
                                        signOut()
                                    }}
                                    className="inline-flex items-center gap-2 w-max min-w-full px-5 py-2 hover:bg-gray-400"
                                >
                                    <IoIosLogOut />
                                    Đăng xuất
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
