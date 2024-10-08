import React from 'react'
import "./Card.style.css"
import { useMovieGenresQuery } from '../../hooks/useMovieGenres';
import { useTvGenresQuery } from '../../hooks/useTvGenres';
import { useNavigate } from 'react-router-dom';
import { useMovieRatingQuery } from '../../hooks/useMovieRating';

const Card = ({ item }) => {
    const navigate = useNavigate();
    const imgSrc = `https://image.tmdb.org/t/p/original/${item?.backdrop_path ? item.backdrop_path : item.poster_path}`
    const { data: movieGenres } = useMovieGenresQuery();
    const { data: tvGenres } = useTvGenresQuery();
    const { data: rating = '등급 정보 없음' } = useMovieRatingQuery(item?.id);

    let genres, type;

    if (item.title) {
        genres = movieGenres;
        type = 'movie'
    }
    if (item.name) {
        genres = tvGenres;
        type = 'tv'
    }

    const cardTitle = item.title 
    ? item.title.length > 30
        ? item.title.slice(0, 30) + "..."
        : item.title
    : item.name.length > 30
        ? item.name.slice(0, 30) + "..."
        : item.name;

    return (
        <div className="card image-full w-96 h-full shadow-xl cursor-pointer max-w-[403px]:w-20" onClick={()=>navigate(`/detail/${type}/${item?.id}`)}>
            <figure>
                <img
                    src={imgSrc}
                    alt="card image"
                    className='w-full h-full'
                />
            </figure>
            <div className="card-body p-0 w-full h-full">
                <div className="w-full h-full bg-opacity-50 justify-start text-white text-start">
                    <h1 className="card-title p-12 text-4xl">{cardTitle}</h1>
                    <div className='info p-10 w-full h-full flex flex-col'>
                        <h2 className="card-title text-xl mb-2">{cardTitle}</h2>
                        <div className='flex mb-2'>
                            {item.genre_ids.map((id, index) => {
                                if (index < 2) {
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
                        <div>
                            {rating === "등급 정보 없음" ? <div className="badge gap-2">{rating}</div> :
                            rating === "18+" || rating === "19+" ? <div className="badge badge-error gap-2">{rating}</div> : 
                            rating === "15+" ? <div className="badge badge-accent gap-2">{rating}</div> :
                            rating === "12+" ? <div className='badge badge-warning gap-2'>{rating}</div> :
                            <div className="badge badge-success gap-2">{rating}</div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card