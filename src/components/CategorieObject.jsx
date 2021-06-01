import React from "react";
import { Link } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
const src = 'https://image.flaticon.com/icons/png/512/883/883806.png'




function CategorieObject({categories, currentUser}) {
    if (!categories || !currentUser) {
        return(<h1>hello waiting for data</h1>)
    }

    const category_id = categories.id
    const user_id = currentUser.id
    // console.log(categories)

    function handleClick(e, data) {
        console.log('logged click')
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({user_id: currentUser.id, category_id: category_id})
            })
            .then(res => res.json())
            .then(newCartObj => {
                // console.log(newCartObj)
            })
    }
   
    
    return(

 <Card id="categorieCard" as={Link} to={`/categories/${category_id}`} onClick={handleClick} link > 
        <Image src={src} wrapped ui={false} size='tiny' circular/>

        <Card.Content>
            <Card.Meta textAlign="center">
                <span >{categories.name}</span>
            </Card.Meta>
        </Card.Content>
    </Card>
    )
}

export default CategorieObject