import './comp.css'
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";



function ListView () {


	
	const [message, setMessage] = useState('waiting');


  	useEffect(() => {


    fetch("http://127.0.0.1:8000/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        console.log(data.message);
      })
      .catch((error) => console.log(error));
  }, []);


	return (

		<>


		<h1 className="text-3xl font-bold underline text-red-600">Hello l</h1>
		<h1 className="text-3xl font-bold underline text-red-600"><NavLink to="/">Hello l</NavLink></h1>

		<p>{message}</p>
				
		</>


		)



}



export default ListView;

