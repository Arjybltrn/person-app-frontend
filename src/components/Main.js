import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

const Main = (props) => {
    
    const [ people, setPeople ] = useState(null)
    // const url = "http://localhost:4000/people/"
    const url = "https://person-app-backend-n1kg.onrender.com/people/"

    const getPeople = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setPeople(data)
    }
    
    
    const createPeople = async (person) => {
        await fetch(url, { 
            method: "POST",
            headers: { 
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(person),
            
        })
        getPeople()
    }


    const updatePeople = async (person, id) => {
        await fetch (url + id, {
            method: "PUT", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        })
        getPeople()
    }

    const deletePeople = async (id) => {
        await fetch(url + '/id', {
            method: "DELETE",
        })
        getPeople()
    }

    useEffect(() => getPeople, [])
    
    
    return (
    <main>
    <Routes> 
        <Route exact path="/" element={<Index people={people} createPeople={createPeople} />} />
        <Route path="/people/:id" element={<Show people={people} updatePeople={updatePeople} deletePeople={deletePeople}/> } /> 
    </Routes>
    </main>


      );
}

export default Main