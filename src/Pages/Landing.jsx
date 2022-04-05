import React from 'react'
import Slider from '../Components/Slider/Slider'
import HomeCategory from '../Components/Category/HomeCategory'
import HomeProduct from '../Components/Product/HomeProduct'

const Landing = ({categories}) => {
  return (
    <div>
      <Slider />
      <HomeCategory categories={categories}/>
      <HomeProduct />
    </div>
  )
}

export default Landing;