import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Input, Menu, Card, Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import UserCard from "./UserCard";
import OrdersList from "./OrdersList";

function UserList({fetchUrl, localFetchUrl, currentUser}) {
    
    const [loading, setLoading] = useState(false)
    const [sleep, setSleep] = useState(true)
    const [searchedUser, setSearchedUser] = useState("")
    setTimeout(() => setSleep(false), 1000)
    const [users, setUsers] = useState([])




    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
      fetch(`${localFetchUrl}/users`, {
        credentials: "include",
      })
        .then((r) => {
          if (!r.ok) throw Error("Not logged in!");
          return r.json();
        })
        .then((user) => { return ( console.log(user, 'comming out of fetch'), setUsers(user))})
        .catch((err) => console.error(err));
    }

// console.log(users)


let userFrag = ""



if (users.length > 0) {

    let searchedUsers = users.filter(user => 
               user.name.toLowerCase().includes(searchedUser.toLowerCase()))
    userFrag = searchedUsers.map(user => {return <UserCard key={user.id} name={user.name} number={user.phoneNumber1} id={user.id}/>})

}else{
  return (<h1>loading</h1>)
}


    return(
        <>
      <div id="search-users" class="ui search">
      <div class="ui icon input">
        <input   class="prompt" type="text"  placeholder="Search By Name"
            value={searchedUser} onChange={(e) => setSearchedUser(e.target.value)}></input>
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  
    <div id="user_list" class="ui cards">
        {userFrag}
    </div>
      </>
    )

}


export default UserList