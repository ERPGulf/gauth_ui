import React, { useEffect, useState } from "react";
import "./History.css";
import axios from "axios";

const History = ({ isSidebarOpen }) => {
    const [data, setData] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [currencyList, setCurrencyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.apilayer.com/currency_data/live?source=${selectedCurrency}`, {
                    headers: {
                        apikey: 'MBxh1z07LyeHrIB01Tg5sW2BrveT3hI7'
                    }
                });
                // Ensure the response contains data and update state
                if (response.data && response.data.quotes) {
                    setData(Object.entries(response.data.quotes));
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCurrencyList = async () => {
            try {
                const response = await axios.get('https://api.apilayer.com/currency_data/list', {
                    headers: {
                        apikey: 'MBxh1z07LyeHrIB01Tg5sW2BrveT3hI7'
                    }
                });
                setCurrencyList(Object.keys(response.data.currencies));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        fetchCurrencyList();
    }, [selectedCurrency]);

    // Calculate indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Ensure data has content before attempting pagination
    const itemsToShow = data.length > 0 ? data.slice(startIndex, endIndex) : [];

    // Function to handle page change
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={`containerforhistory ${isSidebarOpen ? '' : 'closedhistory'}`}>
            
            <div>
                <h3 style={{
    borderBottom: '2px solid grey',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px' 
}}>Billing & Payment History </h3>
                <h4 style={{
    borderBottom: '2px solid grey',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px' ,
    color: 'grey'
}}>
                    <span>Description</span>
                    <span className="amount">Amount</span>
                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="options"
                    >
                        <option value='' disabled >
                            Select a currency
                        
                        </option>
                        {currencyList.map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </h4>
            
            </div>
            {itemsToShow.map((item, index) => (
                <div
                    key={index}
                    style={{
                        borderBottom: '1px solid grey',
                        paddingBottom: '10px',
                        paddingTop: '10px',
                        paddingLeft: '10px' 
                    }}
                >
                    <span>{item[0]} </span> <span className='item1'>{item[1]}</span>
                </div>
            ))}
            {/* Pagination controls */}
            <div className="pagination-controller">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
                    (page, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    )
                )}
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default History;
