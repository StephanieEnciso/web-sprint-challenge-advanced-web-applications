import {axiosWithAuth} from '../utils/axiosWithAuth';

export const fetchColors = () => {
    return axiosWithAuth()
     .get('/colors')
     .then(res => {
         return res.data;
    //    setColorList(res.data);
     })
     .catch(err => {
       console.log(err);
     }) 
}