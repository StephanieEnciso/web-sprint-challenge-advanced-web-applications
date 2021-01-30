import React, { useState } from "react";
import EditMenu from './EditMenu';
import { axiosWithAuth } from "../utils/axiosWithAuth";
;
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
 //use colorToEdit in order to get the correct color that needs to be in the put
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
     .put(`/colors/${colorToEdit.id}`, colorToEdit)
     .then(res => {
       // map to make sure the correct color gets updated
       const mapC = colors.map(color => {
         if (color.id === res.data.id){
           return res.data
         } else{ 
           return color
         }
       })

       //set the state of colors = to the map so the correct color gets updated
       updateColors(mapC);
       
        console.log(updateColors);
     })
     .catch(err => {
       console.log(err)
     })

  };

  const deleteColor = color => {
    axiosWithAuth()
     .delete(`/colors/${color.id}`)
     .then(res => {
       //array method to make the data an integer 
        
       const data = parseInt(res.data, 10)
        // filter method to remove the color with the id from the response
       const removeColor = colors.filter((color) => {
          return color.id !== data
       })
      //once removed set the rest of the colors to state
      updateColors(removeColor);

     })
     .catch(err => {
       console.log(err.response);
     })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.