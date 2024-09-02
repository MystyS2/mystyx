import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import PopularTvSlide from './components/PopularTvSlide/PopularTvSlide';
import TrendingAllSlide from './components/TrendingAll/TrendingAllSlide';

// 1. 배너
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
    return (
        <div className='grid place-items-center gap-10 mb-32'>
            <Banner/>
            <div className='grid gap-20'>
                <TrendingAllSlide />
                <PopularMovieSlide />
                <PopularTvSlide/>                
            </div>
        </div>
    )
}

export default HomePage

