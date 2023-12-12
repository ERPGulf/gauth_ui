import axios from 'axios';

const Axios = axios.create({
  baseURL: "https://aysha.erpgulf.com/api/method/",
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from localStorage
        const refresh_token = localStorage.getItem('refresh_token');

        // Make a request to refresh the access token using the refresh token
        const response = await Axios.post(
          'frappe.integrations.oauth2.get_token',
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token, // Use the actual refresh token
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=',
              'Authorization': `Bearer ${refresh_token}`,
            },
          }
        );

        // Update the access token in localStorage
        localStorage.setItem('access_token', response.data.access_token);

        // Retry the original request with the updated access token
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        // Handle the refresh token request error
        console.error('Error refreshing token:', refreshError);

        // If refresh token request fails, use your other endpoint to generate a new refresh token
        try {
          const newRefreshResponse = await Axios.post(
            'auction_app.gauth.generate_token_secure',
            new URLSearchParams({
              api_key: import.meta.env.VITE_Api_Key,
              api_secret: import.meta.env.VITE_Api_Secret,
              app_key: btoa('335f7d2e33816355bb5d0c17b67b32d597a784afa96547db1ecda4f188c52c51'),
            }).toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=',
              },
            }
          );

          // Handle the successful response here
          localStorage.setItem('refresh_token', newRefreshResponse.data.message.refresh_token);
          console.log(newRefreshResponse.data.message.refresh_token);

          // Retry the original request with the new refresh token
          originalRequest.headers.Authorization = `Bearer ${newRefreshResponse.data.message.refresh_token}`;
          return Axios(originalRequest);
        } catch (newRefreshError) {
          // Handle the error from the new refresh token request
          console.error('Error getting new refresh token:', newRefreshError);

          // Redirect to login or handle as needed
          return Promise.reject(newRefreshError);
        }
      }
    }

    // For other errors, continue to reject the request
    return Promise.reject(error);
  }
  
);

export default Axios;
