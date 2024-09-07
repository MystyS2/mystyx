import React, { useEffect, useState } from 'react';
import { useSearchQuery } from '../../hooks/useSearch';
import { useTrendingAllQuery } from '../../hooks/useTrendingAll';
import { useSearchParams } from 'react-router-dom';
import './MoviePage.style.css';
import Slider from '../../../src/common/Slider.jsx/Slider';
import PosterCard from '../../common/PosterCard/PosterCard';

const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};

const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const keyword = query.get('q');
    const [isAscending, setIsAscending] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);

    const { data: trends } = useTrendingAllQuery();
    const { data, isLoading, isError, error } = useSearchQuery({ keyword, page });
    const searchData = data?.data;

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        if (selectedGenre) {
            const filtered = selectedGenre
                ? searchData?.results.filter(item =>
                    item.genre_ids && item.genre_ids.includes(selectedGenre)
                )
                : searchData?.results;

            setFilteredResults(filtered);
        } else {
            setFilteredResults(searchData?.results);
        }
    }, [selectedGenre, searchData]);

    const handlePageClick = (newPage) => {
        if (newPage > 0 && newPage <= searchData?.total_pages) {
            setPage(newPage);
        }
    };

    const toggleSortOrder = () => {
        setIsAscending(prevOrder => !prevOrder);
    };

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    const showAll = () => {
        setSelectedGenre(null);
    };

    if (isLoading) {
        return <span className="m-40 loading loading-bars loading-lg text-primary"></span>;
    }

    if (isError) {
        return (
            <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error.message}</span>
            </div>
        );
    }

    return (
        <div className="grid place-items-center">
            <div className="mb-20">
                <Slider type="recommend" informations={trends?.results} />
            </div>
            <div className="title text-2xl font-medium w-full h-fit pl-40 py-2 bg-secondary max-lg:pl-10">
                🪄Sort & Filter
            </div>
            <div className="flex flex-wrap gap-2 justify-center my-2">
                <button onClick={toggleSortOrder} className="btn btn-accent">
                    {isAscending ? 'Popularity🔻' : 'Popularity🔺'}
                </button>
                <button onClick={showAll} className={`btn btn-outline btn-primary ${!selectedGenre ? 'btn-active' : ''}`}>
                    All
                </button>
                {Object.entries(genres).map(([id, name]) => (
                    <button
                        key={id}
                        onClick={() => handleGenreClick(parseInt(id))}
                        className={`btn btn-outline btn-secondary ${selectedGenre === parseInt(id) ? 'btn-active' : ''}`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="title text-2xl font-medium w-full h-fit pl-40 py-2 bg-primary max-lg:pl-10">
                {`🔍Total : ${searchData?.total_results}`}
            </div>

            {/* 필터링된 결과가 없을 때 메시지 출력 */}
            {filteredResults?.length === 0 ? (
                <div className="m-5 flex items-center text-4xl font-semibold gap-4">
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                        alt="Crying Face"
                        width="100"
                        height="100"
                    />
                    There's no results..
                </div>
            ) : (
                <div className="pos grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 max-[405px]:grid-cols-2 grid-cols-3 gap-2 m-8">
                    {filteredResults && filteredResults.length > 0
                        ? filteredResults
                            .slice()
                            .sort((a, b) => (isAscending ? a.popularity - b.popularity : b.popularity - a.popularity))
                            .map((item, index) => <PosterCard item={item} key={index} />)
                        : (
                            <div className="m-5 flex items-center text-4xl font-semibold gap-4">
                                <img
                                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                                    alt="Crying Face"
                                    width="100"
                                    height="100"
                                />
                                There's no results..
                            </div>
                        )
                    }
                </div>
            )}

            {/* Pagination */}
            <div className="join md:flex m-4 hidden">
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page - 1)}>
                    Prev
                </button>
                <div className="join">
                    <input
                        className="join-item btn btn-square border-primary"
                        onClick={() => handlePageClick(1)}
                        type="radio"
                        checked={page === 1}
                        name="options"
                        aria-label="1"
                    />
                    {searchData.total_pages < 2 ? (
                        ''
                    ) : (
                        <input
                            className="join-item btn btn-square border-primary"
                            onClick={() => (page < 3 ? handlePageClick(2) : handlePageClick(page - 1))}
                            type="radio"
                            checked={page === 2}
                            name="options"
                            aria-label={page > 2 ? page - 1 : 2}
                        />
                    )}
                    {searchData.total_pages < 3 ? (
                        ''
                    ) : (
                        <input
                            className="join-item btn btn-square border-primary"
                            onClick={() => (page < 3 ? handlePageClick(3) : '')}
                            type="radio"
                            checked={page > 2 ? true : false}
                            name="options"
                            aria-label={page > 2 ? page : 3}
                        />
                    )}
                    {page < searchData.total_pages - 1 ? (
                        <input
                            className="join-item btn btn-square border-primary"
                            onClick={() => (page < 3 ? handlePageClick(4) : handlePageClick(page + 1))}
                            type="radio"
                            name="options"
                            aria-label={page > 2 ? page + 1 : 4}
                        />
                    ) : (
                        ''
                    )}
                    {page !== searchData.total_pages ? (
                        <input
                            className="join-item btn btn-square border-primary"
                            onClick={() => handlePageClick(searchData.total_pages)}
                            type="radio"
                            name="options"
                            aria-label={searchData.total_pages}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page + 1)}>
                    Next
                </button>
            </div>

            <div className="join flex m-4 md:hidden">
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page - 1)}>
                    Prev
                </button>
                <button className="join-item btn btn-square border-primary bg-primary" onClick={() => handlePageClick(page)}>
                    {page}
                </button>
                <button className="join-item btn btn-outline border-primary" onClick={() => handlePageClick(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoviePage;
