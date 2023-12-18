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
    localStorage.setItem("access_token", data.message.access_token);
    localStorage.setItem("refresh_token", data.message.refresh_token);
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
    const { data } = await instance.post(
      "frappe.integrations.oauth2.get_token",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    return data.message.access_token;
  } catch (refreshError) {
    // Handle the refresh token request error
    console.error("Error refreshing token:", refreshError);
    return Promise.reject(refreshError);
  }
};

export const getMessages = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    // Set the authorization header with the access token
    console.log(accessToken);
    // Make the GET request
    const { data } = await instance.post(
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
    return Promise.resolve(data);
  } catch (error) {
    console.error(`Error getting messages: ${error}`);
    return Promise.reject(error);
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


export const generateResetPasswordKey = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");

    const formData = new URLSearchParams();
    formData.append('user', 'hiba@gmail,com'); // Use the passed email parameter

    // Make the POST request
    const { data } = await instance.post(
      'auction_app.gauth.g_generate_reset_password_key',
      formData.toString(), // Convert FormData to a URL-encoded string
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return Promise.resolve(data);
  } catch (error) {
    console.error(`Error creating reset key: ${error}`);
    return Promise.reject(error);
  }
};
