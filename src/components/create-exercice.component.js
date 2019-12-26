import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.min.css";
import axios from "axios";

export default function(){
    const [username, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const onChangeUsername = function(e){
      setUserName(e.target.value);
    };

    const onChangeDescription = function(e){
        setDescription(e.target.value);
    };

    const onChangeDuration = function(e){
        setDuration(e.target.value);
    };

    const onChangeDate = function(date){
        setDate(date);
    };

    const onSubmit = function(e){
      e.preventDefault();

      const exercise = {
          username: username,
          description: description,
          duration: duration,
          date: date
      };

      axios.post("http://localhost:5000/exercises/add", exercise)
          .then(res => console.log(res.data))
          .catch(err => console.log("Error : " + err));
            //location.push("/");
    };

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(response => {
                if (response.data.length > 0){
                    setUsers(response.data.map(user => user.username));
                    setUserName(response.data[0].username);
                    console.log(users);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return(
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username : </label>
                    <select required className="form-control" value={username} onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                            return <option key={user} value={user}>{user}</option>;
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description : </label>
                    <input type="text" required className="form-control" value={description} onChange={onChangeDescription}/>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes) : </label>
                    <input type="text" className="form-control" value={duration} onChange={onChangeDuration}/>
                </div>
                <div className="form-group">
                    <label>Date : </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate}/>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
    /*
    return(
        <div>
            Create Exercise Component
        </div>
    );*/
}