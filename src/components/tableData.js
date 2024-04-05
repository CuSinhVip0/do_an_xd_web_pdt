import React, { useState, useEffect, useLayoutEffect, useMemo, useId } from "react";
import { useSession } from "next-auth/react";
import removeAccents from "remove-accents";
import { HOST } from "@/Data";
import { Spinner } from "@nextui-org/react";
import { ValidNumber } from "@/Utils";
export const Table = (props, { hasEdit = false, hasCheck = false, hasSave = false, userId = "" }) => {
    const [data, setData] = useState(props.data);
    const [Show, setShow] = useState([]);
    const [index, setIndex] = useState(1);
    const [lengthShow, setLengthShow] = useState(props.data.length);
    const [listCheck, setListCheck] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const { data: session } = useSession();
    const [dataUpdate, setDataUpdate] = useState();
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataOld, setDataOld] = useState();
    const setListCheckf = (a) => {
        return setListCheck(a);
    };
    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    useEffect(() => {
        setShow(data.slice(0, props.step));
        setIndex(1);
        setLengthShow(data.length);
    }, [data]);
    useEffect(() => {
        const start = (index - 1) * props.step;
        const end = start + props.step;
        setShow(data.slice(start, end));
    }, [index]);
    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${HOST}/comfirm-subject-result`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.name}`,
                },
                body: JSON.stringify(
                    dataEdit.map((item) => {
                        return {
                            studentCode: item.studentCode,
                            subjectCode: item.subjectCode,
                            semester: item.semester,
                            year: item.year,
                            comfirm: true,
                        };
                    })
                ),
            }).then((res) => res.json());
            if (res.message == "Update score success") {
                setData(
                    data.filter(
                        (item) =>
                            `${item.subjectCode}-${item.studentCode}-${item.semester}-${item.year}` !==
                            listCheck.find(
                                (itm) => itm === `${item.subjectCode}-${item.studentCode}-${item.semester}-${item.year}`
                            )
                    )
                );
                setListCheck([]);
                alert("Cập nhật điểm thành công");

                setDataEdit([]);
                setLoading(false);
                return;
            } else {
                alert("Cập nhật điểm không thành công");

                setLoading(false);
                return;
            }
        } catch (error) {
            alert("Xảy ra lỗi, liên hệ Nguyễn Khắc Thế để fix bug !!!");
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${HOST}/api/training-room/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.name}`,
                },
                body: JSON.stringify({
                    StudentCode: props.userId,
                    SubjectCode: dataUpdate.mamonhoc,
                    Year: dataUpdate.nam,
                    Semester: dataUpdate.hocki,
                    ProcessPercent: dataUpdate.ptramquatrinh,
                    MidtermPercent: dataUpdate.ptramgiuaki,
                    FinalPercent: dataUpdate.ptramcuoiki,
                    ProcessScore: dataUpdate.diemquatrinh,
                    MidtermScore: dataUpdate.diemgiuaki,
                    FinalScore: dataUpdate.diemcuoiki,
                }),
            }).then((res) => res.json());
            if (res.message == "Cập nhật thành công.") {
                alert("Cập nhật điểm thành công");
                setData(
                    data.map((item) => {
                        if (
                            `${item.mamonhoc}-${props.userId}-${item.hocki}-${item.nam}` ===
                            `${dataUpdate.mamonhoc}-${props.userId}-${dataUpdate.hocki}-${dataUpdate.nam}`
                        ) {
                            return {
                                ...item,
                                diemcuoiki: dataUpdate.diemcuoiki,
                                diemgiuaki: dataUpdate.diemgiuaki,
                                diemquatrinh: dataUpdate.diemquatrinh,
                            };
                        } else {
                            return item;
                        }
                    })
                );
                setEdit(false);
                setEditId();
                alert("Cập nhật điểm thành công");
                setDataUpdate();
                setLoading(false);
                return;
            } else {
                alert("Cập nhật điểm không thành công");
                setLoading(false);
                return;
            }
        } catch (error) {
            alert("Xảy ra lỗi, liên hệ Nguyễn Khắc Thể để fix bug !!!");
            setLoading(false);
        }
    };

    return (
        <div className="relative table table-fixed border-collapse border w-full mt-2  bg-white table-auto ">
            <div className="table-header-group box-border ">
                <div className="table-row">
                    {props.hasCheck && (
                        <div className="table-cell w-10 py-4 bg-[#ecf5ff] border  text-center font-bold ">
                            <input
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const all = data.map(
                                            (value, index) =>
                                                `${value.subjectCode}-${value.studentCode}-${value.semester}-${value.year}`
                                        );
                                        setListCheckf(all);
                                        setDataEdit(data);
                                    } else {
                                        setListCheckf([]);
                                        setDataEdit([]);
                                    }
                                }}
                                type="checkbox"
                                className="mr-2"
                            />
                            <label>All</label>
                        </div>
                    )}

                    {Object.values(props.titledata).map((value, index) => {
                        return (
                            <div key={index} className="table-cell  py-4 bg-[#ecf5ff] border  text-center font-bold ">
                                {value}
                            </div>
                        );
                    })}
                    {props.hasEdit && (
                        <div className="table-cell  py-4 bg-[#ecf5ff] border  text-center font-bold ">Tùy chỉnh</div>
                    )}
                </div>

                <div className="table-row box-border w-full">
                    {props.hasCheck && <div className="table-cell py-2  box-border border text-center  w-full"></div>}
                    {Object.keys(props.titledata).map((value, index) => {
                        return (
                            (value === "subject" ||
                                value === "idsubject" ||
                                value === "id" ||
                                value === "name" ||
                                value === "studentCode" ||
                                value === "MSSV" ||
                                value === "Họ" ||
                                value === "Tên" ||
                                value === "Lớp" ||
                                value == "mamonhoc" ||
                                value == "tenmonhoc" ||
                                value == "fullName") && (
                                <div key={index} className="table-cell py-2  box-border border text-center  w-full">
                                    <div className="w-full px-2">
                                        <input
                                            onChange={(e) => {
                                                if (e.target.value == "") {
                                                    setData(props.data);
                                                } else {
                                                    const regex = new RegExp(e.target.value, "i");
                                                    const result =
                                                        props.data &&
                                                        props.data.filter((item) =>
                                                            regex.test(removeAccents(item[value]))
                                                        );

                                                    setData(result);
                                                }
                                            }}
                                            type="text"
                                            className="border px-1 w-3/4  rounded-sm outline-none focus:shadow-md focus:shadow-cyan-500/50"
                                            placeholder="Search"
                                        />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
            <div className="table-row-group box-border">
                {Show &&
                    Show.map((value, index) => {
                        value.AvgScore &&
                            (value.AvgScore =
                                value.processScore * (value.processPercent / 10) +
                                value.midtermScore * (value.midtermPercent / 10) +
                                value.finalScore * (value.finalPercent / 10));
                        value.result && (value.result = value.AvgScore >= 5 ? "PASS" : "FAIL");

                        return (
                            <div
                                key={index}
                                className={`relative table-row ${
                                    edit && index == editId ? "bg-[#CBD5E1]" : index % 2 !== 0 ? "" : "bg-[#ecf5ff]"
                                } ${edit && index == editId ? "" : "hover:bg-gray-200"} `}
                            >
                                {props.hasCheck && (
                                    <div className="table-cell  border ">
                                        <div className=" flex justify-center items-center   cursor-pointer ">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    listCheck.filter(
                                                        (item) =>
                                                            item ==
                                                            `${value.subjectCode}-${value.studentCode}-${value.semester}-${value.year}`
                                                    ).length > 0
                                                        ? true
                                                        : false
                                                }
                                                value={`${value.subjectCode}-${value.studentCode}-${value.semester}-${value.year}`}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setListCheckf([...listCheck, e.target.value]);
                                                        setDataEdit([...dataEdit, value]);
                                                    } else {
                                                        setListCheckf(
                                                            listCheck.filter((item) => item !== e.target.value)
                                                        );
                                                        setDataEdit([
                                                            dataEdit.filter(
                                                                (item) =>
                                                                    `${value.subjectCode}-${value.studentCode}-${value.semester}-${value.year}` !==
                                                                    e.target.value
                                                            ),
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {Object.keys(props.titledata).map((item, i) => {
                                    const x = Object.entries(value).find((i) => i[0].trim() == item.trim());
                                    return (
                                        <div
                                            key={x[0]}
                                            className="table-cell  py-4 text-center  border  cursor-pointer "
                                        >
                                            <div
                                                key={i}
                                                id={`${value.mamonhoc}-${props.userId}-${value.hocki}-${value.nam}-${x[0]}`}
                                                className="block "
                                                contentEditable={
                                                    edit &&
                                                    (item == "diemquatrinh" ||
                                                        item == "diemgiuaki" ||
                                                        item == "diemcuoiki") &&
                                                    index == editId
                                                }
                                                onInput={(e) => {
                                                    if (ValidNumber(e.target.innerText) == "form-error") {
                                                        alert("Không được nhập chữ !!!");
                                                        e.target.innerText = "";
                                                        setDataUpdate({
                                                            ...dataUpdate,
                                                            [x[0]]: "",
                                                        });
                                                    } else {
                                                        if (e.target.innerText <= 10 && e.target.innerText >= 0) {
                                                            setDataUpdate({
                                                                ...dataUpdate,
                                                                [x[0]]: e.target.innerText,
                                                            });
                                                        } else {
                                                            alert("Không đúng khoảng điểm!!!");
                                                            e.target.innerText = "";
                                                            setDataUpdate({
                                                                ...dataUpdate,
                                                                [x[0]]: "",
                                                            });
                                                        }
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    setDataUpdate({ ...dataUpdate, [x[0]]: e.target.innerText });
                                                }}
                                                suppressContentEditableWarning={
                                                    edit &&
                                                    (item == "diemquatrinh" ||
                                                        item == "diemgiuaki" ||
                                                        item == "diemcuoiki") &&
                                                    index == editId
                                                }
                                            >
                                                {x[1]}
                                            </div>
                                        </div>
                                    );
                                })}

                                {props.hasEdit && (
                                    <div className="table-cell py-4 w-full   border  text-center font-bold ">
                                        <button
                                            onClick={() => {
                                                if (dataOld != undefined || dataOld != null) {
                                                    document.getElementById(
                                                        `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemquatrinh`
                                                    ).innerText = dataOld.diemquatrinh;
                                                    document.getElementById(
                                                        `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemgiuaki`
                                                    ).innerText = dataOld.diemgiuaki;
                                                    document.getElementById(
                                                        `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemcuoiki`
                                                    ).innerText = dataOld.diemcuoiki;
                                                }
                                                setEdit(true);
                                                setEditId(index);
                                                setDataUpdate(value);
                                                setDataOld(value);
                                            }}
                                            className={`px-2 ${edit && index == editId && "hidden"}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEdit(false);
                                                setEditId();
                                                setDataUpdate();
                                                setDataOld();
                                            }}
                                            className={`px-2 ${!(edit && index == editId) && "hidden"}`}
                                        >
                                            X
                                        </button>
                                        <button
                                            onClick={!(edit && index == editId) ? null : handleUpdate}
                                            className={`px-2 ${
                                                !(edit && index == editId) && "text-gray-300 cursor-not-allowed"
                                            }`}
                                        >
                                            {edit && index == editId && loading ? <Spinner size="sm" /> : "Save"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
            <div className="absolute top-full right-0  mt-2 flex gap-4">
                <button
                    onClick={() => {
                        if (dataOld != undefined || dataOld != null) {
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemquatrinh`
                            ).innerText = dataOld.diemquatrinh;
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemgiuaki`
                            ).innerText = dataOld.diemgiuaki;
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemcuoiki`
                            ).innerText = dataOld.diemcuoiki;
                        }
                        setEdit(false);
                        setEditId();
                        setDataUpdate();
                        setDataOld();
                        setIndex(index * props.step - props.step == 0 ? index : index - 1);
                    }}
                    id="btnNext"
                    className={` px-3 py-2 ${
                        !(index * props.step - props.step == 0)
                            ? "bg-slate-300"
                            : "bg-slate-100 text-gray-400 cursor-not-allowed"
                    }   `}
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        if (dataOld != undefined || dataOld != null) {
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemquatrinh`
                            ).innerText = dataOld.diemquatrinh;
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemgiuaki`
                            ).innerText = dataOld.diemgiuaki;
                            document.getElementById(
                                `${dataOld.mamonhoc}-${props.userId}-${dataOld.hocki}-${dataOld.nam}-diemcuoiki`
                            ).innerText = dataOld.diemcuoiki;
                        }
                        setEdit(false);
                        setEditId();
                        setDataUpdate();
                        setDataOld();
                        setIndex(index * props.step < lengthShow ? index + 1 : index);
                    }}
                    id="btnNext"
                    className={` px-3 py-2 ${
                        index * props.step < lengthShow
                            ? "bg-slate-300"
                            : "bg-slate-100 text-gray-400 cursor-not-allowed"
                    }   `}
                >
                    Next
                </button>
            </div>
            {props.hasSave && (
                <div className="absolute bottom-full right-0 px-3 py-2 bg-slate-300 mb-2">
                    <button onClick={handleSave}> {loading ? <Spinner size="sm" /> : "Xác nhận"} </button>
                </div>
            )}
        </div>
    );
};
export default Table;
