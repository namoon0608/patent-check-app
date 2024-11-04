const db = require('../db/jsonDatabase');
const patents = require('../data/patents.json');
const companyProducts = require('../data/company_products.json');
const axios = require('axios'); // Used for API calls to Google AI Studio

const API_KEY = process.env.GOOGLEKEY || '';

async function checkInfringement(req, res) {
    const { patentId, companyName } = req.body;

    const patent = patents.find((p) => p.publication_number === patentId);
    const company = companyProducts.companies.find((c) =>
        c.name.toLowerCase().includes(companyName.toLowerCase())
    );

    if (!patent || !company) {
        return res.status(404).json({ message: 'Patent or company not found' });
    }

    const results = await runLLMAnalysis(patent, company);

    res.json({
        analysis_id: Date.now(),
        patent_id: patentId,
        company_name: company.name,
        analysis_date: new Date(),
        top_infringing_products: results.top_infringing_products,
        overall_risk_assessment: results.overall_risk_assessment,
    });
}

async function runLLMAnalysis(patent, company) {
    const inputClaims = patent.claims;
    const productDescriptions = company.products
        .map((p, i) => `${i + 1}. ${p.name}: ${p.description}.`)
        .join('; ');
    const requestPayload = {
        contents: [
            {
                parts: [
                    {
                        text: `Patent title: ${patent.title}, Patent Claims: ${inputClaims}`,
                    },
                    {
                        text: `Company Products Descriptions: ${productDescriptions}`,
                    },
                    {
                        text: `compare the claims and the products of the company (${company.name}), to find out the top two infringing products of the company along with explanations of why these
products potentially infringe the patent, specifically detailing which claims are at issue. return a valid json format without line break for me to parse, the json format: {"top_infringing_products": [{"product_name": "string; product's name","infringement_likelihood": "enumerate string ['High', 'Moderate', 'Low']; the level of infringement","relevant_claims": "array of numbers; the relevant claims number","explanation": "string; detailed explanation for the infringement","specific_features": "array of strings; the specific infringement features"},],"overall_risk_assessment": "string; the overall rish assessment"}`,
                    },
                ],
            },
        ],
    };

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            requestPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;

        return JSON.parse(text);
    } catch (error) {
        console.error('Error in LLM analysis:', error);
        return [];
    }
}

function saveReport(req, res) {
    const { report } = req.body;

    db.saveReport(report);
    res.status(201).json({ message: 'Report saved successfully' });
}

async function getSavedReports(req, res) {
    const reports = await db.getReports();
    res.json(reports);
}

module.exports = { checkInfringement, saveReport, getSavedReports };
