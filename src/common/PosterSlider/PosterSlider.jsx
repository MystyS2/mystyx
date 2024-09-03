import React from 'react';
import "./PosterSlider.style.css"
import PosterCard from '../PosterCard/PosterCard';
// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper 모듈 가져오기
import { Navigation } from 'swiper/modules';
// swiper, Autoplay, Navigation(화살표) CSS 가져오기
import 'swiper/css';
import 'swiper/css/navigation';

const PosterSlider = ({ type, informations }) => {
    const title = type == "popular-movie" ? "Popular Movies🍿" : type == "popular-tv" ? "Popular Tv Series📺" : type == "trending" ? "Trending❤️‍🔥" : "Recommend👍";

    return (
        <div>
            <div className='movie-slider w-screen h-[25vh] p-2'>
                <h2 className='mb-4 text-3xl text-primary'>{title}</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={true}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        '@0.75': {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        '@1.00': {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        '@1.20': {
                            slidesPerView: 8,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Navigation]}
                >
                    {informations?.map((item, index) => {
                        return index < 10 ?
                            <SwiperSlide className='w-full' key={index}>
                                <PosterCard item={item} key={index} />
                            </SwiperSlide>
                            : ''
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default PosterSlider