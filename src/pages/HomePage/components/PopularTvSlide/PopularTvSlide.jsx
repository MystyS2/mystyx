import React from 'react';
import { usePopularTvSeriesQuery } from '../../../../hooks/usePopularTvSeries';
import "./PopularTvSlide.style.css";
import Card from '../Card/Card';
// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper 모듈 가져오기
import { Navigation } from 'swiper/modules';
// swiper, Autoplay, Navigation(화살표) CSS 가져오기
import 'swiper/css';
import 'swiper/css/navigation';


const PopularTvSlide = () => {
    const { data, isLoading, isError, error } = usePopularTvSeriesQuery();

    // 로딩 상태일 때 로딩 UI를 반환
    if (isLoading) {
        return <span className="loading loading-bars loading-lg text-primary"></span>;
    }

    // 에러 발생 시 에러 메시지 반환
    if (isError) {
        return (
            <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error.message}</span>
            </div>
        );
    }
    return (
        <div className='tv-series-slider  w-screen h-[25vh] p-2'>
            <h2 className='mb-4 text-3xl text-primary'>Popular Tv Series📺</h2>
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
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Navigation]}
            >
                {data?.results.map((item, index) => {
                    return index < 10 ?
                        <SwiperSlide className='w-full' key={index}>
                            <Card item={item} key={index} sort='tv' />
                        </SwiperSlide>
                        : ''
                })}
            </Swiper>
        </div>
    )
}

export default PopularTvSlide