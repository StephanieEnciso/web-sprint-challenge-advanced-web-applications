import React, { useEffect, useState } from "react";

import {fetchColors} from '../api/fetchColors';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
 // useEffect will invoke the axios with authorization
 //This will make sure the colors render when page mounts
 // the actual axiosWithAuth is in the api folder
 //this was to make sure I could test that everything was rendering when it mounts

  useEffect( () => {
    async function fetchData(){
      const res = await fetchColors();
      setColorList(res);
    }
    fetchData();
   
  },[])

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
