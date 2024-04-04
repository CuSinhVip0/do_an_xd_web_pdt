"use client";

import { HOST } from "@/Data";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Table from "@/components/tableData";
import { Spinner } from "@nextui-org/react";

export default function StudentMark() {
    const [data, setData] = useState({});
    const [search, setSearch] = useState("DH19771230");
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        setLoading(true);
        try {
            if (search == "" || search == null || search == undefined) {
                alert("Nhập thông tin");
                setLoading(false);
                return;
            }
            const res = await fetch(`${HOST}/api/training-room/get-score-by-student/${search.trim()}`, {
                headers: {
                    Authorization: `Bearer ${session.user.name}`,
                },
            }).then((res) => res.json());
            if (res.message == "Not found") {
                alert("Không tìm thấy sinh viên");
                setLoading(false);
                return;
            }
            setData(res);
            setLoading(false);
        } catch (error) {
            alert("Xảy ra lỗi, liên hệ NGuyễn Khắc thể để fix bug !!!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full">
            <p className="text-2xl ">Tìm điểm theo sinh viên</p>
            <div className=" flex justify-between h-10">
                <div className="space-x-4 flex">
                    <input
                        className="w-[300px] px-4 outline-none"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch} className="bg-[#3b5d4f] text-white px-4">
                        Search
                    </button>
                    {loading && <Spinner color="primary" size="md" />}
                </div>
            </div>
            {data !== undefined && data.data && data.data.length > 0 && (
                <Table
                    key={Math.random()}
                    titledata={{
                        mamonhoc: "Mã môn học",
                        tenmonhoc: "Tên môn học",
                        nam: "Năm học",
                        hocki: "Học kì",
                        ptramquatrinh: "%QT",
                        ptramgiuaki: "%GK",
                        ptramcuoiki: "%CK",
                        diemquatrinh: "QT",
                        diemgiuaki: "GK",
                        diemcuoiki: "CK",
                    }}
                    data={data.data}
                    userId={data.masinhvien}
                    step={5}
                    hasEdit={true}
                />
            )}
        </div>
    );
}
