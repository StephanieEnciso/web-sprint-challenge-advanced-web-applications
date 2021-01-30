import React, { useEffect, useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import {fetchColors} from '../api/fetchColors';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
 // useEffect will invoke the axios with authorization
 //This will make sure the colors render when page mounts
  useEffect( () => {
    async function fetchData(){
      const res = await fetchColors();
      setColorList(res);
    }
    fetchData();
   
  },[])
  //function to do axios request and set state
  // const fetchColors = () => {
  //   axiosWithAuth()
  //    .get('/colors')
  //    .then(res => {
  //      setColorList(res.data);
  //    })
  //    .catch(err => {
  //      console.log(err);
  //    })
  // }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
