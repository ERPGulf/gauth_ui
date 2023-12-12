import React, { useEffect, useState } from "react";
import "./Balance.style.css";
import axios from "axios";

const Balance = ({ isSidebarOpen }) => {
  const [data, setData] = useState([]);
  const [countryCode, setCountryCode] = useState('AE');
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [showAddAndGoBack, setShowAddAndGoBack] = useState(false);
  const countryCodes = ['AD', 'AE'];

  const fetchData = async (code) => {
    try {
      const response = await axios.get(`https://api.apilayer.com/bank_data/banks_by_country?country_code=${code}`, {
        headers: {
          apikey: 'vjUnUheND7mtcb04020bKa2nLpnoTkS9'
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(countryCode);
  }, [countryCode]);

  const handleEditClick = () => {
    if (!showCountryCode) {
      setShowCountryCode(true);
      setShowAddAndGoBack(true);
    } else {
      setShowCountryCode(false);
      setShowAddAndGoBack(false);
    }
  };

  const renderCountryCodeSection = () => {
    return (
      <div style={{marginLeft:'10px'}}>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          style={{paddingRight:'40px', paddingLeft:'40px'}}
        >
          {countryCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <div className={`upcontainer ${isSidebarOpen ? '' : 'closedupcontainer'}`}>
        <h3 className='heading'>Account Balance</h3>
        <p style={{marginLeft:'10px'}}>You have no balance at this time</p>
      </div>

      <div className={`containerforbalance ${isSidebarOpen ? '' : 'closedbalance'}`}>
        <h3 className='h3'>
          Billing Contact{' '}
          <span className="editbutton" onClick={handleEditClick}>
            {showAddAndGoBack ? 'Save' : 'Edit'}
          </span>
        </h3>

        {showCountryCode ? (
          renderCountryCodeSection()
        ) : (
          data.length > 0 && (
            <div className="datas">
              <p>{data[0].name}</p>
              <p>{data[1].name}</p>
              <p>{data[2].name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Balance;
