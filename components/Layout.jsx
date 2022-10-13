import Head from 'next/head'
import React from 'react'

import  {Navbar}  from '.'
import  Footer  from './Footer'

function Layout({children}) {
  return (
    <div className='layout'>
      
        <Head>
          <title>Mini-ecommerce</title>
        </Head>
        <header>
          <Navbar/>
        </header>
        <main className="main-container">
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>

    </div>
  )
}

export default Layout