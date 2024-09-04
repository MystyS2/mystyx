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
                    <div className='flex mb-2'>
                            {item.genre_ids.map((id, index) => {
                                if (index === 0) {
                                    const genre = genres?.find((g) => g.id === id).name.split(" ", 1);  // 장르 ID와 매칭되는 이름 찾기
                                    return genre ? (
                                        <div key={index} className="badge badge-primary mr-2">
                                            {genre}
                                        </div>
                                    ) : null;  // 장르가 없으면 null 반환                                    
                                }
                            })}
                        </div>
                    <div className='mb-2'>{Array(Math.round(item.vote_average / 2)).fill('⭐')}</div>
                    <div>{item.adult ? <div className="badge badge-error gap-2">18+</div> : <div className="badge badge-success gap-2">All</div>}</div>
                </div>
            </div>

        </div>

    )
}

export default PosterCard