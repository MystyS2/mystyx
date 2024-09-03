import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper 모듈 가져오기
import { Navigation } from 'swiper/modules';
// swiper, Autoplay, Navigation(화살표) CSS 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import Card from '../../common/Card/Card';


const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const keyword = query.get("q");

    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword })

    console.log(data.results);
    return (
        <div className='grid place-items-center'>
            {data.data?.results.map((item, index) => {
                return <SwiperSlide className='w-full' key={index}>
                        <Card item={item} key={index} sort="movie" />
                        </SwiperSlide>
            })}

            <div className="join">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="1"
                    defaultChecked />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
            </div>
        </div>
    )
}

export default MoviePage