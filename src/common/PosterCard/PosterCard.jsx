import React from 'react'
import "./PosterCard.style.css"

import { useMovieGenresQuery } from '../../hooks/useMovieGenres';
import { useTvGenresQuery } from '../../hooks/useTvGenres';

const PosterCard = ({ item }) => {
    const imgSrc = `https://image.tmdb.org/t/p/original/${item?.poster_path}`
    const { data: movieGenres } = useMovieGenresQuery();
    const { data: tvGenres } = useTvGenresQuery();

    let genres;

    if (item?.title) genres = movieGenres;
    if (item?.name) genres = tvGenres;

    return (
        <div>
            <div className='test h-full'>
                {item.poster_path === null ? <div className='w-full h-full bg-secondary rounded-lg' />
                    : <figure><img src={imgSrc} alt="card image" className='rounded-lg' /></figure>}
                <div className='overlay p-10 flex flex-col h-full'>
                    <h2 className="card-title text-xl mb-2">{item.title ? item.title : item.name}</h2>
                    <div className='mb-2'>{Array(Math.round(item.vote_average / 2)).fill('⭐')}</div>
                    <div>{item.adult ? <div className="badge badge-error gap-2">18+</div> : <div className="badge badge-success gap-2">All</div>}</div>
                </div>
            </div>

        </div>

    )
}

export default PosterCard