"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/tableData";
import { HOST } from "@/Data";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";

function AddMark() {
    const { data: session } = useSession();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        try {
            const responce = async () => {
                const res = await fetch(`${HOST}/get-score-not-comfirm`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.user.name}`,
                    },
                })
                    .then((res) => res.json())
                    .then((res) => res);
                setItems(res.data.map((item) => ({ ...item, subjectCode: item.subjectCode.trim() })));
                setLoading(false);
            };
            responce();
        } catch (err) {
            alert("Xảy ra lỗi, liên hệ NGuyễn Khắc thể để fix bug !!!");
            setLoading(false);
        }
    }, []);

    return (
        <>
            <div className="min-h-full">
                <p className="text-2xl  flex items-center gap-5">
                    Danh sách điểm cần xác nhận {loading && <Spinner color="primary" size="md" />}
                </p>
                <div className=" flex justify-between h-10">
                    <div className="space-x-4 flex"></div>
                    <div></div>
                </div>
                {items.length > 0 && (
                    <Table
                        key={Math.random()}
                        titledata={{
                            subject: "Môn học",
                            fullName: "Tên sinh viên",
                            year: "Năm học",
                            semester: "Học kì",
                            processPercent: "%QT",
                            midtermPercent: "%GK",
                            finalPercent: "%CK",
                            processScore: "QT",
                            midtermScore: "GK",
                            finalScore: "CK",
                        }}
                        data={items}
                        step={5}
                        hasCheck={true}
                        hasSave={true}
                    />
                )}
            </div>
        </>
    );
}

export default AddMark;
