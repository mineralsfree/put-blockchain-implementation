import {BASE_URL} from "./urls";
import axios from 'axios';
import {IBlockChain, Transaction} from "../types";
export const blockchainApi  = {
    getChain: ()=>{
        return axios.get<IBlockChain>(`${BASE_URL}blockchain/chain`);
    },
    postBlock: (data: Transaction)=>{
        return axios.post(`${BASE_URL}blockchain/createBlock`, data);
    },
    verify: (data: string)=>{
        return axios.post(`${BASE_URL}user/verify`, {str: data})
    }
}
export const initAuthorization = () => {
    const token = localStorage.getItem('jwt');

    if (token) {
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
};
initAuthorization();
