"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Alertwarning } from "@/Utils";
import Table from "@/components/tableData";
import { HOST } from "@/Data";
import { useSession } from "next-auth/react";

function AddMark() {
    const { data: session } = useSession();
    const [items, setItems] = useState([]);

    const [a, setA] = useState([]);
    useEffect(() => {
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
        };
        responce();
    }, []);

    return (
        <>
            <div className="min-h-full">
                <p className="text-2xl ">Danh sách điểm cần xác nhận</p>
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
