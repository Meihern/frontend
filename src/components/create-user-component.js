import React, {useState} from "react";
import axios from 'axios';


export default function () {

    const [username, setUserName] = useState('');

    const onChangeUsername = function (e) {
        setUserName(e.target.value);
    };

    const onSubmit = function(e){
      e.preventDefault();
      const newUser = {
          username: username,
      };
      axios.post('http://localhost:5000/users/add', newUser)
          .then(res => console.log(res.data))
          .catch(err => console.log("Error"+err));
      setUserName('');
    };

    return(
      <div>
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
              <div className="form-group">
                  <input type="text" required className="form-control" value={username} onChange={onChangeUsername}/>
              </div>
              <div className="form-group">
                  <input type="submit" value="Create User" className="btn btn-primary"/>
              </div>
          </form>
      </div>
    );
    /*
    return (
      <div>
          Create User Component
      </div>
    );
    */
}