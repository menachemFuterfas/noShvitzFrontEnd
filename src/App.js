import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import CategorieList from "./components/CategorieList";
import Items from "./components/ItemsList";
import ItemCard from "./components/ItemCard";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [categoriesList, setCategories] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCart, setCurrentCart] = useState(1)
  const [triggerRerender, setTriggerRerender] = useState(false)

  const history = useHistory();

  useEffect(() => {
      fetch("http://127.0.0.1:3000/categories")
      .then(res => res.json())
      .then(categoriesArray => {setCategories(categoriesArray, 'in the fetch')})
  }, [])


  useEffect(() => {

    fetch("http://localhost:3000/autologin", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((r) => {
        if (!r.ok) throw Error("Not logged in!");
        return r.json();
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    } else {
      history.push("/SignIn");
    }
  }, [currentUser, history]);

  function handleLogout() {
    // remove the userId from localstorage
    localStorage.removeItem("token");
    setCurrentUser(null);
    history.push('/')
  }

  function onUpdateUser(user) {
    setCurrentUser(user);
  }

  return (
<>
        <div>
            <NavBar currentUser={currentUser} onLogout={handleLogout} currentCart={currentCart}
          setCurrentCart={setCurrentCart} triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender}/>
            {currentUser ?   <h1>welcome {currentUser.name}</h1>: null}
          
        </div>

  <Switch>

    <Route exact path="/SignUp">
      <SignUp/>
    </Route>

    <Route exact path="/SignIn">
      <SignIn onUpdateUser={onUpdateUser}/>
    </Route>

    <Route exact path="/ShoppingCart/:id">
      <ShoppingCart currentUser={currentUser} triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender}/>
    </Route>

  <Route exact path="/categories">
    <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser}/>
  </Route>

  <Route exact path="/categories/:id">
    <Items categoriesList={categoriesList} currentUser={currentUser}/>            
  </Route >

  <Route exact path="/">
  <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser}/>
  </Route>
  </Switch>
</>
  );
}

export default App;