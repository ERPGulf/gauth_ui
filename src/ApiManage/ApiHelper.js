// separate the api calls from the components
// so that we can reuse the api calls in other components and debug them easily

import instance from "./Axios";

export const generateToken = async () => {
  try {
    const { data } = await instance.post(
      "auction_app.gauth.generate_token_secure",
      new URLSearchParams({
        api_key: import.meta.env.VITE_Api_Key,
        api_secret: import.meta.env.VITE_Api_Secret,
        app_key: import.meta.env.VITE_App_key,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    
    return Promise.resolve(data);
  } catch (error) {
    console.error(`Error generating token: ${error}`);
    return Promise.reject(error);
  }
};

export const refreshToken = async () => {
  try {
    // Get the refresh token from localStorage
    const refresh_token = localStorage.getItem("refresh_token");
    // formdata appending
    const formData = new FormData();
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", refresh_token);

    // Make a request to refresh the access token using the refresh token
    const response = await instance.post(
      "frappe.integrations.oauth2.get_token",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    localStorage.setItem("access_token", response.data.access_token);
    
    return response;
  } catch (refreshError) {
    // Handle the refresh token request error
    console.error("Error refreshing token:", refreshError);
    return Promise.reject(refreshError);
  }
};

export const tokenGenerated = async () => {
  try {
    // Call generateToken to get refresh tokens
    const generateTokenResponse = await generateToken();
    localStorage.setItem("refresh_token", generateTokenResponse.message.refresh_token);
    localStorage.setItem("access_token", generateTokenResponse.message.access_token);
    const accessToken = localStorage.getItem("access_token");
    
    if (!accessToken) {
      // Access token is missing or not valid, call refreshToken to refresh it
      const refreshTokenResponse = await refreshToken();

      return Promise.resolve(refreshTokenResponse);
    }

    // Access token is present and assumed to be valid, return it
    return Promise.resolve({ access_token: accessToken });
  } catch (error) {
    console.error(`Error generating or refreshing token: ${error}`);
    return Promise.reject(error);
  }
};


export const getMessages = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    // Set the authorization header with the access token
    console.log(accessToken);

    // Make the initial GET request
    const initialResponse = await instance.post(
      "employee_app.attendance_api.error_log",
      {
        limit_start: 0,
        limit_page_length: 50,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Return the data if the initial request is successful
    return Promise.resolve(initialResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // If the error is Forbidden, refresh the token and retry the request
      try {
        const newAccessToken = await refreshToken();
        const accessToken = newAccessToken.data.access_token
        
        // Update the authorization header with the new token
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Retry the original request
        const retryResponse = await instance.post(
          "employee_app.attendance_api.error_log",
          {
            limit_start: 0,
            limit_page_length: 50,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );

        // Return the data if the retry request is successful
        return Promise.resolve(retryResponse.data);
      } catch (refreshError) {
        console.error(`Error refreshing token: ${refreshError}`);
        return Promise.reject(refreshError);
      }
    } else {
      // For other errors, log, call refreshToken, and reject the request
      console.error(`Error getting messages: ${error}`);
      try {
        const newAccessToken = await refreshToken();
        const accessToken = newAccessToken.data.access_token
        
        // Update the authorization header with the new token
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Retry the original request
        const retryResponse = await instance.post(
          "employee_app.attendance_api.error_log",
          {
            limit_start: 0,
            limit_page_length: 50,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );

        // Return the data if the retry request is successful
        return Promise.resolve(retryResponse.data);
      } catch (refreshError) {
        console.error(`Error refreshing token during retry: ${refreshError}`);
        return Promise.reject(refreshError);
      }
    }
  }
};



export const isUserAvailable = async (mobilePhone, userEmail) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    // Make the POST request
    const { data } = await instance.post(
      'auction_app.gauth.is_user_available',
      {
        mobile_phone: mobilePhone,
        user_email: userEmail,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return Promise.resolve(data);
  } catch (error) {
    console.error(`Error checking user availability: ${error}`);
    return Promise.reject(error);
  }
};

export const createUser = async (name, userEmail, mobilePhone, password) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    // Create form data
    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('password', password);
    formData.append('mobile_no', mobilePhone);
    formData.append('email', userEmail);
    formData.append('role', 'Auction');

    // Make the POST request
    const { data } = await instance.post(
      'gauth.gauth.gauth.g_create_user',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return Promise.resolve(data);
  } catch (error) {
    console.error(`Error creating new user account: ${error}`);
    return Promise.reject(error);
  }
};


export const generateResetPasswordKey = async (email) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    const formData = new URLSearchParams();
    formData.append('user', email);

    // Make the POST request
    const response = await instance.post(
      'auction_app.gauth.g_generate_reset_password_key',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    // Log the entire response object
    console.log('Reset Key:', response.data.reset_key);
    return response;
   
  } catch (error) {
    console.error(`Error creating reset key: ${error}`);
    return Promise.reject(error);
  }
};

export const checkPasswordStrength = async (password) => {
  try{
    const accessToken = localStorage.getItem("access_token");

    const formData = new URLSearchParams();
    formData.append('new_password', password);

    const response = await instance.post(
      'frappe.core.doctype.user.user.test_password_strength',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }

    );
    console.log('Validation', response.data.message.feedback.password_policy_validation_passed);
    return response;
   
  } catch (error) {
    console.error(`Error creating reset key: ${error}`);
    return Promise.reject(error);
  }
};

export const updatePassword = async(newPassword,resetKey) =>{
  try{
    
    const updatePasswordResponse = await instance.post(
      `frappe.core.doctype.user.user.update_password`,
      {
        new_password: newPassword,
        key: resetKey,
      },
      {
        headers: {
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('Update Password Response:', updatePasswordResponse);
    return updatePasswordResponse;
  }
  catch (error) {
    console.error(`Error updating password: ${error}`);
    return Promise.reject(error);
  }
};


export const EnableOrDisable = async(username, email , mobile_no, enableuser) =>{
  try{
    const accessToken = localStorage.getItem("access_token");

    const response = await instance.post(
      `auction_app.gauth.g_user_enable`,
      {
        username: username,
        email: email,
        mobile_no: mobile_no,
        enable_user: enableuser,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('enable:', response);
    return response;
  }
  catch (error) {
    console.error(`Error enable/disable user: ${error}`);
    return Promise.reject(error);
  }
};


export const deleteUser_ = async(username, email , mobile_no) =>{
  try{
    const accessToken = localStorage.getItem("access_token");

    const response = await instance.post(
      `auction_app.gauth.g_delete_user`,
      {
        username: username,
        email: email,
        mobile_no: mobile_no,
        
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('Deleted Account:', response.data.message);
    return response;
  }
  catch (error) {
    console.error(`Error Deleting user: ${error}`);
    return Promise.reject(error);
  }
};

export const getUsername = async(email , mobile_no) =>{
  try{
    const accessToken = localStorage.getItem("access_token");

    const response = await instance.post(
      `auction_app.gauth.get_user_name`,
      {
        user_email: email,
        mobile_phone:  mobile_no, 
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('username:', response.data.message[0].name);
    return response;
  }
  catch (error) {
    console.error(`Error getting username: ${error}`);
    return Promise.reject(error);
  }
};

export const NewPassword = async(username,newPassword) =>{
  try{
    const accessToken = localStorage.getItem("access_token");
    
    const response = await instance.post(
      `auction_app.gauth.g_update_password`,
      {
        username:username,
        password: newPassword,
        
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('Update Password Response:', response);
    return response;
  }
  catch (error) {
    console.error(`Error updating password: ${error}`);
    return Promise.reject(error);
  }
};

export const getTime = async() =>{
  try{
    
    const response = await instance.post(
      `gauth.gauth.gauth.time`,
      {
        headers: {
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('Time:', response);
    return response;
  }
  catch (error) {
    console.error(`${error}`);
    return Promise.reject(error);
  }
};


export const whoIami = async() =>{
  try{
    const accessToken = localStorage.getItem("access_token");
    const response = await instance.post(
      `gauth.gauth.gauth.whoami`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cookie': 'full_name=Mumtaz%2032; sid=834d08adda118bf4a9761bade5ab686f4afcdd40db680ff103663ea7; system_user=yes; user_id=mumtaz32%40erpgulf.com; user_image=',
        },
      }
    );
    
    console.log('Message:', response);
    return response;
  }
  catch (error) {
    console.error(`${error}`);
    return Promise.reject(error);
  }
};



