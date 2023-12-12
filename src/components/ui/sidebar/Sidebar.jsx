import React, { useState, useEffect } from "react";
import Axios from "../../../ApiManage/Axios/Axios";
import "./SideBar.css";


const Sidebar = ({ onSidebarToggle, isSidebarOpen }) => {
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);


  const toggleProfileBox = (event) => {
    event.stopPropagation();
    setShowProfileBox(!showProfileBox);
    setShowMsgBox(false);
  };

  const closeProfileBox = () => {
    setShowProfileBox(false);
  };

  const toggleMsgBox = () => {
    setShowMsgBox(!showMsgBox);
    setShowProfileBox(false);
  };

  const closeMsgBox = () => {
    setShowMsgBox(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get the access token from local storage
        const accessToken = localStorage.getItem('access_token');
        console.log('Access Token:', accessToken);

        // Set the authorization header with the access token
        Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Make the GET request
        const thirdApi = await Axios.post(
          'employee_app.attendance_api.error_log',
          {
            limit_start: 0,
            limit_page_length: 50,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${accessToken}`,
              'Cookie': 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=',
            },
          }
        );

        // Check if the response is defined and has the headers property
        if (response) {
          setMessages(response.data.message);
        } else {
          console.error('Invalid response:', response);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showMsgBox) {
      fetchData();
    }
  }, [showMsgBox]);
  return (
    <div className={`containerforsidebar ${isSidebarOpen ? '' : 'closedsidebar'}`}>
      <div className="toggle-btn">
        <img
          className="image"
          onClick={onSidebarToggle}
          src="https://icons.veryicon.com/png/o/miscellaneous/we/sidebar-2.png"
          alt="Toggle Sidebar"
        />
        <img
          className={`alarm ${isSidebarOpen ? 'openalarm' : 'closedalarm'}`}
          src="https://cdn-icons-png.flaticon.com/512/20/20147.png"
          alt="Messages"
          onClick={toggleMsgBox}
        />
        <img
          className={`profile ${isSidebarOpen ? '' : 'closedprofile'}`}
          src="https://static.thenounproject.com/png/638636-200.png"
          alt="Profile"
          onClick={toggleProfileBox}
        />
      </div>
      <img
        className="Akamai"
        src="https://seeklogo.com/images/A/Akamai-logo-A040DD6B78-seeklogo.com.png"
        alt="Image"
      />
      <h3 className="names">Linodes</h3>
      <h3 className="names">Volumes</h3>
      <h3 className="names">NodeBalancers</h3>
      <h3 className="names">Firewalls</h3>
      <h3 className="names">Images</h3>

      {showProfileBox && (
        <div className="profile-box">
          <p>User: John Doe</p>
          <p>Email: john.doe@example.com</p>
          
        </div>
      )}

      {showMsgBox && (
        <div className="msg-box">
          <p>Messages</p>
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            <ul>
              {messages.map((message) => (
                <li key={message.name}>
                  <strong>Method:</strong> {message.method}, <strong>Name:</strong> {message.name}, <strong>Seen:</strong> {message.seen}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <h3 className="bottomline"></h3>
    </div>
  );
};

export default Sidebar;
