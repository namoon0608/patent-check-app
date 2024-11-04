import React, { useEffect, useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

function SavedReports({ setResults, reducerVal }) {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch(`${apiUrl}/patents/reports`);
            const data = await response.json();

            if (response.status === 200) {
                setReports(data);
            }
        };
        fetchReports();
    }, [reducerVal]);

    return (
        <div className="mt-5">
            <h2 className="text-center text-3xl font-bold">Saved Reports</h2>
            {reports.length ? (
                <table
                    border="1"
                    cellSpacing="0"
                    className="table-fixed w-full max-w-4xl mx-auto border-collapse border border-slate-500 my-4"
                >
                    <thead>
                        <tr>
                            <th className="border border-slate-600 py-2 px-2.5">
                                Report Title
                            </th>
                            <th className="border border-slate-600 py-2 px-2.5">
                                Analysis Date
                            </th>
                            <th className="border border-slate-600 py-2 px-2.5">
                                Operation
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {reports.map((report, index) => (
                            <tr key={index}>
                                <td
                                    scope="row"
                                    className="border border-slate-600 py-2 px-2.5"
                                >
                                    {report.patent_id} - {report.company_name}
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5">
                                    {report.analysis_date}
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5">
                                    <button
                                        onClick={() => {
                                            setResults(report);
                                        }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <></>
            )}
        </div>
    );
}

export default SavedReports;
