import React, { useState, useEffect } from 'react'
import './FilterForm.css'
import DateSelector from '../Other/UIComponents/DateSelector/DateSelector';

const FilterForm = () => {
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('')
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormLoaded, setIsFormLoaded] = useState(false);

    useEffect( () =>{
        setTimeout(() => setIsFormLoaded(true), 100);
    }, []);

    const fetchFilteredData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch (
                `http://localhost:8000/api/data/?keyword=${keyword}&date=${date}`
            );

            if(!response.ok){
                throw new Error('Trouble fetching data');
            }
            const data = await response.json();
            setResults(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
       
    };

    const handleDateChange = (formattedDate) =>{
        setDate(formattedDate);
        
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetchFilteredData();
    };
    return (
        <div className='main-container'>
            <div className= {`search-results-container ${isFormLoaded ? 'slide-up' : '' }`}>
                <div className="search-container">
                    <form className= 'search-form-inputs' onSubmit={HandleSubmit}>
                        <h3 className="search-title">Search for a trouble ticket</h3>
                        <input className='trouble-input' type='text' 
                        required placeholder='Trouble Code' 
                        value = {keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        />
                        <div className="selector-container">
                            <DateSelector onDateChange={handleDateChange}/>
                        </div>
                        
                        
                        <button type='Submit' className='filter-search-button'>Search</button>
                    </form>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}


                <div className='results-container'>
                    
                    <ul className='results-list'>
                        {results.length > 0 ? (
                            results.map((item) => (
                                <li key = {item.id} className='result-item'>
                                    <div className="result-header">
                                        <span className="trouble-code">Trouble Code: {item.trouble_code}</span>
                                        <span className="date">Recorded Date: {item.date}</span>
                                    </div>
                                    <p className='formatted-sentence'><strong>Summary: </strong>{item.formatted_sentence}</p>
                                </li>
                            ))
                        ) : (
                            <p className='no-results'>No results found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilterForm
