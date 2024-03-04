import React from 'react'
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper'
import './PageNotFound.scss'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer'
const PageNotFound = () => {
  return (
    <>
    <Header />
    <div className="pageNotFound">
    <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
    </ContentWrapper>
</div>
<Footer />
</>
  )
}

export default PageNotFound
