import './App.css';
import {Route} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Catalog from "./components/catalog/Catalog";
import Cart from "./components/cart/Cart";

function App() {
    return (
        <div className="app-wrapper">
            <Navbar/>
            <div className="app-wrapper-content">
                    <Route path={'/catalog'} render={() => <Catalog/>}/>
                    <Route path={'/cart'} render={() => <Cart/>}/>
            </div>
        </div>
    );
}

export default App;
