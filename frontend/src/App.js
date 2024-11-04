import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import SavedReports from './components/SavedReports';

function App() {
    const [results, setResults] = useState(null);

    return (
        <div className="App">
            <h1 className="text-3xl font-bold text-center py-4 px-5">
                Patent Infringement Checker
            </h1>
            <InputForm setResults={setResults} />
            <ResultsDisplay results={results} />
            <SavedReports setResults={setResults} />
        </div>
    );
}

export default App;
