import React, {useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment"
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe('pk_test_51JJLwgL5riUHAwMdX7xgOiHVeSbG7XFpw0Fbj5TisuZn20jkoW5b0PYB65gsvUCSEAAcIWQ64cWKOnCX8NEqcO7m00Rd6H8L0O')

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {

      auth.onAuthStateChanged(authUser =>{
        console.log('THE  USER IS >>>', authUser);

        if (authUser) {
          // te user logged in / the user was logged in 

          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          // the user is logged out

          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
  }, [])

  return (
    // BEM
    <Router>
      <div className="app">
          

          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>

            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>

            <Route path="/">
              <Header />
              <Home />
            </Route>
          
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
