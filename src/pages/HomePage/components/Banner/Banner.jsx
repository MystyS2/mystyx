import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
        <div className='relative w-screen h-[56vh]'>
            <div
                className='banner w-full h-full bg-center bg-no-repeat bg-cover'
                style={{ backgroundImage: "url(https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg)" }}>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute top-0 left-0 w-full h-full p-16 bg-opacity-50 flex items-end justify-start">
                <div className="text-white text-start">
                    <h1 className="text-4xl font-bold mb-4">{data?.results[0].title}</h1>
                    <p className="text-lg hidden lg:flex">{data?.results[0].overview}</p>
                </div>
            </div>
        </div>

    )
}

export default Banner