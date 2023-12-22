import { useState, useContext } from 'react';
import axios from 'axios';
import { AcquiredToken } from "../App";
import { useMsal} from "@azure/msal-react";
import { protectedApi } from "../authConfig";


const useApiRequest = () => {

  const {acquiredToken, getToken} = useContext(AcquiredToken);
  const { instance } = useMsal();

  const axiosCall = async (url, method, data, token,headers) => {
    
    try {
    console.log("Executing axios call");
      const response = await axios({
        method,
        url,
        headers: {
          "Authorization": `Bearer ${token}`,
          ...headers,
        },
        data
      });

      console.log(`Request (${method}) with active token:`, response);

      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
 * Makes an API request with Bearer token. If api request is successful, perform fetch fetchData function with access token and trigger toast function provided if they are given. If response if 401 unauthorized, tries to refresh the token  
 *

 * @param {string} options.url - The URL of the API.
 * @param {string} options.method - The HTTP method for the request.
 * @param {functionring} options.handleSuccess - The function we run when request return with status 200
 * @param {functionring} options.handleSuccess - The function to run when the request returns with status 200.
 * @param {Object} [options.data] - The request payload (optional).
 */
  const makeApiRequest = async ({ url, method, data, headers = {}}) => {
    try {

      const response = await axiosCall(url, method, data, acquiredToken, headers);

      return response;

    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          console.log('Request returns with 401 Unauthorized');
          try {
            const newToken = await getToken();

            const refreshedResponse = await axiosCall(url, method , data, newToken);
            return refreshedResponse;
          } catch (tokenError) {
            console.error("Token refresh failed:", tokenError);
          }
        } else if (status === 403) {
          instance.logoutRedirect();
        } else {
          console.log(error);
          throw error;
        }
      } else {
        console.log(error);
      }
    }
  };

  const fetchCenterData = async () => {
    try {
        const {data} = await makeApiRequest({
            url: `${protectedApi.api.endpoint}/center`,
            method: "get",
        });

        return data;

    } catch (err) {
        console.log('Error fetching center data', err);
    }

  } 

  const fetchCountryData = async () => {
    try {
        const {data} = await makeApiRequest({
            url: `${protectedApi.api.endpoint}/country`,
            method: "get",
        });

        return data;

    } catch (err) {
        console.log('Error fetching center data', err);
    }

  }

  return { makeApiRequest, fetchCenterData, fetchCountryData };
};


export default useApiRequest;
