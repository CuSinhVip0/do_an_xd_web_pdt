"use client"
import { NotificationContainer } from "react-notifications"
import AdminHeader from "@/components/header_admin"
import NavAdmin from "@/components/nav_admin"
import { handleHideShowNav } from "@/Utils"
import { MdArrowForwardIos } from "react-icons/md"
export default function DashboardLayout({ children }) {
    return (
        <>
            <main className="min-h-screen ">
                <AdminHeader />
                <div className="pt-[90px] max-w-[1320px] mx-auto  ">
                    <div id="container" className="grid  grid-cols-12  ">
                        <NavAdmin />
                        <div className="col-span-10">
                            <button
                                id="btn"
                                onClick={handleHideShowNav}
                                className=" hidden flex justify-start items-center hover:scale-125"
                            >
                                <MdArrowForwardIos className="ml-6 w-[20px] h-[20px]" />
                                SHOW
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <NotificationContainer />
        </>
    )
}
