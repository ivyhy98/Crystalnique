import { Landing, ProductDetails, ProductList, Cart } from './Pages';
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { commerce } from './lib/commerce';
import About from './Pages/About';
import { useDispatch } from 'react-redux';
import { getCart, refreshCart } from './redux/actions/cartActions';
import Checkout from './Pages/Checkout/Checkout';
import Footer from './Components/Footer';
import Healing from './Pages/Healing';
function App() {
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  const getCategories = async() => {
    const { data: category} = await commerce.categories.list();
    setCategories(category)
    };
  
    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
      try{
        const orderIncoming = await commerce.checkout.capture(checkoutTokenId, newOrder);
        
        setOrder(orderIncoming)
        dispatch(refreshCart())
      } catch(error){
        console.log(error)
      }
    }
  useEffect(() => {
    getCategories();
    dispatch(getCart());
  },[dispatch]);
  return (
    <Router>
      <div className="App">
        <Header categories={categories} />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Landing categories={categories} />}/>
            <Route exact path="/details/:permalink" element={<ProductDetails />}/>
            <Route path="/lists/:slug" element={<ProductList />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/about" element={<About />} />
            <Route path="/healing" element={<Healing />} />
            <Route path="/checkout" element={<Checkout onCaptureCheckout={handleCaptureCheckout} order={order}/>} />
          </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
