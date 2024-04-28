import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import Pagination from './../Pagination';

export default function ExpandedTable({ widget, setLoading, navigate }) {

    const [data, setData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(100);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/api/data/get/table?widget_id=${widget.id}&offset=${page}&limit=${limit}`,
                {
                    headers: {
                        "authorization": localStorage.getItem("auth-token")
                    }
                });

            if (response.status == 200) {
                console.log(response.data);
                setData(response.data.data);
                setRecordCount(response.data.count[0].count);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            switch (err.response.status) {
                case 401:
                    toast.error("Unauthorized access");
                    navigate('/login');
                    break;
                case 403:
                    toast.error("Forbidden access");
                    navigate('/login');
                    break;
                case 404:
                    toast.error("Data not found");
                    navigate('/dashboard');
                    break;
                default:
                    toast.error("Something went wrong");
            }
            setLoading(false);
        }
    }

    return (
        <div className={``}>
            <div className="overflow-x-scroll overflow-y-scroll max-h-[500px] px-7 sm:px-10 mt-5 sm:mt-6">
                <table className="table-fixed w-full mb-4">
                    <thead>
                        <tr className={`bg-black3 `}>
                            {widget.configuration.map((column, index) => {
                                return (
                                    <th key={column.clm_id} className="w-[200px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">{column.Column.clm_name}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {widget.configuration.map((column, index) => {
                                        return (
                                            <td key={column.clm_id} className="border border-gray1 border-opacity-40 text-white text-xs text-center px-2 py-2">{row[column.Column.clm_name].toString()}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination recordCount={recordCount}
                limit={limit}
                offset={page}
                setOffset={setPage}
                loadAllData={fetchData} />
        </div>
    )
}