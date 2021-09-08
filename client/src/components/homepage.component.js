import React, { useState } from "react";
import Footer from './footer.component.js';
import Card from './Card';
import Navbar from './NavbarMenu';
import "../assets/css/nucleo-icons.css";
import "../assets/scss/blk-design-system-react.scss?v=1.2.0";
import "../assets/demo/demo.css";
import PageHeader from './PageHeader'

function Homepage(props) {
    React.useEffect(() => {
        document.body.classList.toggle("index-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
          document.body.classList.toggle("index-page");
        };
      },[]);
    return (
        <>
        <Navbar />
        <div className="wrapper">
            <PageHeader />
            <div className="main">
                <Card />
            </div>
            <Footer />
        </div>
        {/* <h1> Home </h1> */}

        </>
    )
}

export default Homepage;