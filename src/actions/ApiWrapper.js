import axios from 'axios';

const GENERIC_ROUTE = process.env.REACT_APP_PROXY || 'http://localhost:5000/';

export const get = async (url) => axios.get(GENERIC_ROUTE + url);

export const post = async (url, params) => axios.post(GENERIC_ROUTE + url, params);

export const put = async (url, params) => axios.put(GENERIC_ROUTE + url, params);

export const remove = async (url, params) => axios.delete(GENERIC_ROUTE + url, params);
