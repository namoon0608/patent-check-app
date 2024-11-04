import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

function InputForm({ setResults }) {
    const [patentId, setPatentId] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/patents/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patentId, companyName }),
        });
        const data = await response.json();
        if (response.status === 200) {
            setResults(data);
        } else {
            alert(data.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg flex flex-col gap-3 mx-auto"
        >
            <input
                type="text"
                value={patentId}
                onChange={(e) => setPatentId(e.target.value)}
                placeholder="Patent ID"
                required
                className="border border-black rounded p-1"
            />
            <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                required
                className="border border-black rounded p-1"
            />
            <button
                type="submit"
                className="w-fit px-1.5 py-1 mx-auto bg-blue-500 text-white rounded"
            >
                Check Infringement
            </button>
        </form>
    );
}

export default InputForm;
