import React, { useState } from 'react'
import { useSearchQuery } from '../../hooks/useSearch'
import { useTrendingAllQuery } from '../../hooks/useTrendingAll';
import { useSearchParams } from 'react-router-dom'
import "./MoviePage.style.css";
import Slider from '../../../src/common/Slider.jsx/Slider';
import PosterSlider from '../../common/PosterSlider/PosterSlider';
import PosterCard from '../../common/PosterCard/PosterCard';

const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const keyword = query.get("q");

    const { data: trends } = useTrendingAllQuery();

    const { data, isLoading, isError, error } = useSearchQuery({ keyword, page });
    const searchData = data?.data;

    const handlePageClick = (newPage) => {
        if (newPage > 0 && newPage <= searchData.total_pages) {
            setPage(newPage);
        }
    };
    // 로딩 상태일 때 로딩 UI를 반환
    if (isLoading) {
        return <span className="loading loading-bars loading-lg text-primary"></span>;
    };

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
    };

    return (
        <div className='grid place-items-center'>
            <div className='title text-2xl font-medium w-full h-fit pl-40 py-2 bg-secondary max-lg:pl-10'>{keyword ? `🔍${keyword}의 검색 결과` : 'Trending❤️‍🔥'}</div>
            <div className="mb-20"><Slider type='recommend' informations={trends?.results} /></div>

            <div className='title text-2xl font-medium w-full h-fit pl-40 py-2 bg-secondary max-lg:pl-10'>{`Total : ${searchData.total_results}`}</div>
            <div className='grid grid-cols-8 gap-2 m-4'>
                {searchData?.results.map((item, index) => {
                    return <PosterCard item={item} key={index} />

                })}
            </div>


            {searchData?.results.map((item, index) => { return <div key={index}>{item.title ? item.title : item.name}</div> })}

            <div className="join flex m-4">
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page - 1)}>Previous</button>
                <div className='join'>
                    <input className="join-item btn btn-square border-primary" onClick={() => handlePageClick(1)}
                        type="radio" checked={page === 1} name="options" aria-label="1" />
                    {searchData.total_pages < 2
                        ? '' :
                        <input className="join-item btn btn-square border-primary" onClick={() => page < 3 ? handlePageClick(2) : handlePageClick(page - 1)}
                            type="radio" checked={page === 2} name="options" aria-label={page > 2 ? page - 1 : 2} />}
                    {searchData.total_pages < 3
                        ? '' :
                        <input className="join-item btn btn-square border-primary" onClick={() => page < 3 ? handlePageClick(3) : ''}
                            type="radio" checked={page > 2 ? true : false} name="options" aria-label={page > 2 ? page : 3} />}
                    {page < searchData.total_pages - 1 ?
                        <input className="join-item btn btn-square border-primary" onClick={() => page < 3 ? handlePageClick(3) : handlePageClick(page + 1)}
                            type="radio" name="options" aria-label={page > 2 ? page + 1 : 4} />
                        : ''}
                    {page !== searchData.total_pages ?
                        <input className="join-item btn btn-square border-primary" onClick={() => handlePageClick(searchData.total_pages)}
                            type="radio" name="options" aria-label={searchData.total_pages} />
                        : ''}
                </div>
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page + 1)}>Next</button>
            </div>
        </div>
    )
}

export default MoviePage