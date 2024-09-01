import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/Banner/Banner';

// 1. 배너
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
    return (
        <div className='grid place-items-center'>
            <Banner />
        </div>
    )
}

export default HomePage

