
import React from 'react'
import Beautyproducts from './Beautyproducts'
import Watches from './Menswatches'
import Offers from './Offers';
import Laptops from './Laptops';
import Footer from './Footer';
const Home = () => {
  return (
    <div>
        <Offers/>
      <Watches/>
      <Beautyproducts/>
      <Laptops/>
      <Footer/>
    </div>
  )
}
export default Home
