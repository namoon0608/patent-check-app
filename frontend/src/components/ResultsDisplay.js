import React from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

function ResultsDisplay({ results }) {
    if (!results) return null;

    console.log(results);

    return (
        <div className="mt-5">
            <h2 className="text-center text-3xl font-bold">
                Infringement Results
            </h2>
            <article>
                <>
                    {results.top_infringing_products.map((product, index) => (
                        <table
                            border="1"
                            cellSpacing="0"
                            className="table-fixed w-full max-w-7xl mx-auto border-collapse border border-slate-500 mt-4"
                        >
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 py-2 px-2.5">
                                        Product Name
                                    </th>
                                    <th className="border border-slate-600 py-2 px-2.5">
                                        Infringement Likelihood
                                    </th>
                                    <th className="border border-slate-600 py-2 px-2.5">
                                        Specific Features
                                    </th>
                                    <th className="border border-slate-600 py-2 px-2.5">
                                        Relevant Claims
                                    </th>
                                    <th className="border border-slate-600 py-2 px-2.5">
                                        Explanation
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <td
                                    scope="row"
                                    className="border border-slate-600 py-2 px-2.5"
                                >
                                    {product.product_name}
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5">
                                    {product.infringement_likelihood}
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5 text-left">
                                    <ul className="list-disc list-inside">
                                        {product.specific_features.map(
                                            (feature) => (
                                                <li>{feature}</li>
                                            )
                                        )}
                                    </ul>
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5">
                                    {product.relevant_claims.join(', ')}
                                </td>
                                <td className="border border-slate-600 py-2 px-2.5 text-left">
                                    {product.explanation}
                                </td>
                            </tbody>
                        </table>
                    ))}
                </>
            </article>
            <button
                onClick={async () => {
                    await fetch(`${apiUrl}/patents/save`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            report: results,
                        }),
                    });
                }}
                className="w-fit px-1.5 py-1 mx-auto mt-4 block bg-blue-500 text-white rounded"
            >
                Save Report
            </button>
        </div>
    );
}

export default ResultsDisplay;
