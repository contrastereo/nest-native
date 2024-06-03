import queryString from "query-string"

export const API_URL = process.env.EXPO_PUBLIC_API_URL
export class ApiFetch {
  async request(url: any, options:any) {
    const response = await fetch(url,options);
    return response;
  }

  get(url: any, options:any) {
    return this.request(API_URL+url, { method: 'GET', ...options });
  }

  post(url: any, body:any, ) {
    return this.request(API_URL+url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, });
  }

  put(url: any, body:any,) {
    return this.request(API_URL+url, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, });
  }

  delete(url: any,) {
    return this.request(API_URL+url, { method: 'DELETE', });
  }
}

export const jsonResponseFromFetchResponse = async (response: any) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};
