import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './component/AppAppBar';
import Hero from './component/Hero';
import LogoCollection from './component/LogoCollections';
import Features from './component/Features';
import Testimonials from './component/Testimonials';
import Highlights from './component/Highlights';
import Pricing from './component/Pricing';
import FAQ from './component/FAQ';
import Footer from './component/Footer';
export default function MarketingPage() {
  return (
    <div>
      <AppAppBar/>
      <Hero/>
      <div>
        <LogoCollection/>
        <Features/>
        <Divider/>
        <Testimonials/>
        <Divider/>
        <Highlights/>
        <Divider/>
        <Pricing/>
        <Divider/>
        <FAQ/>
        <Divider/>
        <Footer/>
      </div>
    </div>
  )
}
