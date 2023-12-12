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
        app_key: btoa(
          "335f7d2e33816355bb5d0c17b67b32d597a784afa96547db1ecda4f188c52c51"
        ),
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