import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Accruedcharges.css";

const Accruedcharges = ({ isSidebarOpen }) => {
    const [data, setData] = useState({ bank_name: '', type: '', scheme: '', country: '' });
    const [binCode, setBinCode] = useState('546616');
    const [showBinCodeSection, setShowBinCodeSection] = useState(false);
    const [showAddAndGoBack, setShowAddAndGoBack] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.apilayer.com/bincheck/${binCode}`, {
                    headers: {
                        apikey: 'vjUnUheND7mtcb04020bKa2nLpnoTkS9'
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchData();
    }, [binCode]);

    const handleAddPayment = () => {
        if (!showBinCodeSection) {
            setShowBinCodeSection(true);
            setShowAddAndGoBack(true);
        } else {
            setShowBinCodeSection(false);
            setShowAddAndGoBack(false);
        }
    };

    const renderBinCodeSection = () => {
        return (
            <div style={{marginLeft:'10px'}}>
                <select value={binCode} onChange={(e) => setBinCode(e.target.value)}>
                    <option value="" disabled hidden>
                        Select an option
                    </option>
                    <option value="546616">Citi</option>
                    <option value="302596">Diners Club International</option>

                </select>
            </div>
        );
    };

    return (
        <div>
            <div className={`upaccruedcontainer ${isSidebarOpen ? 'openacc' : 'closedaccrued'}`}>
                <h5 className='heading'>Accured Charges</h5>
                <p style={{marginLeft:'10px', marginTop:'-9px'}}>Since last invoice</p>
            </div>
            <div className={`containerforaccrued ${isSidebarOpen ? 'openacc' : 'closedaccrued'}`}>
                <h3 className='h3'>
                    Payment Methods
                    <span className="addpay" onClick={handleAddPayment}>
                        {showAddAndGoBack ? 'Add Payment' : 'Add Payment'}
                    </span>
                </h3>

                {showBinCodeSection ? (
                    renderBinCodeSection()
                ) : (
                    <div className="box">
                        <p className="marginstyle">
                            {data.scheme}
                            <span className="adata1">{data.bank_name}</span>
                            <span className="adata2">{data.type}</span>
                            <button className="default">Default</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accruedcharges;
