import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadUsers({localFetchUrl, categoriesList, setTriggerRerender}) {
    
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()

   if (!loaded) {
       setLoaded(true)
        fetch(`${localFetchUrl}/users`,{
            credentials: "include",
        })
    .then(res => res.json())
    .then(usersData => {setUsers(usersData)})
   }

//    console.log(users)
       



    function handleClick(e) {
       
        if (users.length > 0) {
            csvLink.current.link.click()
            console.log('just clicked ')
        }
    }
  

   const headers = [
        { label: "name", key: "name" },
        { label: "email", key: "email" },
        { label: "phone_number_1", key: "phone_number_1" },
        { label: "phone_number_2", key: "phone_number_2" },
        { label: "admin", key: "admin" },
        { label: "activated", key: "activated" }
       
      ];

    let data = [] 

    data = users.map((user, index) => { return (
      { name: user.name,
       email: user.email,
       phone_number_1: user.phoneNumber1 ,
       phone_number_2: user.phoneNumber2,
       admin: user.admin ? 'TRUE': 'FALSE',
       activated: user.activated ? 'TRUE': 'FALSE',
        }
    )
    })

    // console.log(data)












    return(
        <>

        
        <Button content='Downloed Users.csv' secondary onClick={handleClick}  />
   
        
        <CSVLink
            data={data}
            filename="users.csv"
            className='hidden'
            ref={csvLink}
            headers={headers}
            target='_blank'
        />

      </>
    )
 


}

export default DownloadUsers