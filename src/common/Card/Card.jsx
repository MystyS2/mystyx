import React from 'react'
import "./Card.style.css"

import { useMovieGenresQuery } from '../../hooks/useMovieGenres';
import { useTvGenresQuery } from '../../hooks/useTvGenres';

const Card = ({ item }) => {
    const imgSrc = `https://image.tmdb.org/t/p/original/${item?.backdrop_path ? item.backdrop_path : item.poster_path}`
    const { data: movieGenres } = useMovieGenresQuery();
    const { data: tvGenres} = useTvGenresQuery();

    let genres;

    if(item.title) genres = movieGenres;
    if(item.name) genres = tvGenres;

    return (
        <div className="card image-full w-96 shadow-xl cursor-pointer">
            <figure>
                <img
                    src={imgSrc}
                    alt="card image"
                />
            </figure>
            <div className="card-body p-0 w-full h-full">
                <div className="w-full h-full bg-opacity-50 justify-start text-white text-start">
                    <h1 className="card-title p-12 text-4xl">{item.title?item.title:item.name}</h1>
                    <div className='overlay p-10 w-full h-full flex flex-col'>
                        <h2 className="card-title text-xl mb-2">{item.title?item.title:item.name}</h2>
                        <div className='flex mb-2'>
                            {item.genre_ids.map((id, index) => {
                                const genre = genres?.find((g) => g.id === id);  // 장르 ID와 매칭되는 이름 찾기
                                return genre ? (
                                    <div key={index} className="badge badge-primary mr-2 h-10">
                                        {genre.name}
                                    </div>
                                ) : null;  // 장르가 없으면 null 반환
                            })}
                        </div>
                        <div className='mb-2'>{Array(Math.round(item.vote_average / 2)).fill('⭐')}</div>
                        <div>{item.adult ? <div className="badge badge-error gap-2">18+</div> : <div className="badge badge-success gap-2">All</div>}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card