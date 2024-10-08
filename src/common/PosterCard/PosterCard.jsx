import React from 'react'
import "./PosterCard.style.css"
import { useNavigate } from 'react-router-dom';
import { useMovieGenresQuery } from '../../hooks/useMovieGenres';
import { useTvGenresQuery } from '../../hooks/useTvGenres';
import { useMovieRatingQuery } from '../../hooks/useMovieRating';

const PosterCard = ({ item }) => {
    const navigate = useNavigate();
    const imgSrc = `https://image.tmdb.org/t/p/original/${item?.poster_path}`
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

    const cardTitle = item?.title
        ? item.title.length > 30
            ? item.title.slice(0, 30) + "..."
            : item.title
        : item.name.length > 30
            ? item.name.slice(0, 30) + "..."
            : item.name;

    return (
        <div className='test h-full' onClick={() => navigate(`/detail/${type}/${item?.id}`)}>
            {!item.poster_path ? <div className='w-full h-full bg-secondary rounded-lg' />
                : <figure><img src={imgSrc} alt="card image" className='rounded-lg' /></figure>}
            <div className='overlay p-10 flex flex-col h-full'>
                <h2 className="card-title text-xl mb-2">{cardTitle}</h2>
                <div className='flex mb-2'>
                    {item.genre_ids?.map((id, index) => {
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
                <div className='mb-2'>{item.vote_average && item.vote_average > 0 ? Array(Math.round(item.vote_average / 2)).fill('⭐') : ''}</div>
                <div>
                    {rating === "등급 정보 없음" ? <div className="badge gap-2">{rating}</div> :
                        rating === "18+" || rating === "19+" ? <div className="badge badge-error gap-2">{rating}</div> :
                            rating === "15+" ? <div className="badge badge-accent gap-2">{rating}</div> :
                                rating === "12+" ? <div className='badge badge-warning gap-2'>{rating}</div> :
                                    <div className="badge badge-success gap-2">{rating}</div>}
                </div>
            </div>
        </div>

    )
}

export default PosterCard