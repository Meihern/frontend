import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function() {
    const [exercices, setExercices] = useState([]);
    const Exercise = exercices => (
        <tr>
            <td>{exercices.exercise.username}</td>
            <td>{exercices.exercise.description}</td>
            <td>{exercices.exercise.duration}</td>
            <td>{exercices.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+exercices.exercise._id}>edit</Link> | <a href="#" onClick={() => {
                    deleteExercice(exercices.exercise._id)
            }}>delete</a>
            </td>
        </tr>
    );

    const deleteExercice =  function(id){
      axios.delete('http://localhost:5000/exercises/delete/'+id)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      setExercices(exercices.filter(el=> el._id !== id));
    };

    const exercicesList = function(){
      return exercices.map(currentexercise => {
          // eslint-disable-next-line react/jsx-no-undef
          return <Exercise exercise={currentexercise} deleteExercise={deleteExercice} key={currentexercise._id} />;
      })
    };

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                setExercices(response.data);
                console.log(exercices);
            })
    }, []);

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {exercicesList()}
                </tbody>
            </table>
        </div>
    )

}
