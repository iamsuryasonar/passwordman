import react, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
// import NavBar from '../navbar/NavBar';
// import Footer from '../footer/Footer'

function Layout() {


    return (
        <>
            {/* <NavBar /> */}
            {/* <div className='relative gradient_bg w-full m-auto overflow-hidden'> */}
                {/* <div className='max-w-[1440px] px-4 w-full m-auto min-h-svh flex'> */}
                    <Outlet />
                {/* </div> */}
            {/* </div> */}
            {/* <Footer /> */}
        </>
    )
}

export default Layout;