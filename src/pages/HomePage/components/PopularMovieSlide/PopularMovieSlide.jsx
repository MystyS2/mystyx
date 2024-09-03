import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Slider from '../../../../common/Slider.jsx/Slider';


const PopularMovieSlide = () => { 
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
        <div>
            <Slider type='popular-movie' informations={data?.results}/>
        </div>
    )
}

export default PopularMovieSlide