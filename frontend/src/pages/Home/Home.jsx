import React from 'react'
import Herobanner from './heroBanner/Herobanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular'
import TopRated from './TopRated/TopRated'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer';


export default function Home() {
  return (
    <div className='homePage'>
      <Header />
      <Herobanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
      <Footer />
    </div>
  )
}
