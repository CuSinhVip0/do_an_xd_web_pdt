"use client";
import Link from "next/link";
import { FaUserGraduate, FaBookOpen, FaCertificate } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { handleHideShowNav } from "@/Utils";
import { usePathname } from "next/navigation";
function NavAdmin() {
    const pathname = usePathname();
    return (
        <div id="nav" className=" col-span-2 ">
            <button onClick={handleHideShowNav} className="flex justify-start items-center hover:scale-125">
                <MdOutlineArrowBackIosNew className=" w-[20px] h-[20px]" />
                BACK
            </button>
            <ul>
                <li>
                    <Link
                        href={"/"}
                        className="pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-white hover:text-blue-400"
                    >
                        Trang chủ
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/dashboard/confirm-mark"}
                        className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-white hover:text-blue-400 ${
                            pathname == "/dashboard/confirm-mark" ? "bg-white text-blue-400" : ""
                        }`}
                    >
                        <FaCertificate />
                        Điểm cần xác nhận
                    </Link>
                </li>
                {/* {/*<li>
                    <Link
                        href={"/admin/dashboard/view-mark-by-subject"}
                        className="pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-white hover:text-blue-400"
                    >
                        <FaBookOpen />
                        Điểm theo môn
                    </Link>
                </li> */}

                <li>
                    <Link
                        href={"/dashboard/student-mark"}
                        className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-white hover:text-blue-400 ${
                            pathname == "/dashboard/student-mark" ? "bg-white text-blue-400" : ""
                        }`}
                    >
                        <FaUserGraduate />
                        Xem điểm theo sinh viên
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavAdmin;
