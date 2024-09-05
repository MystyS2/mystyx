import React from 'react';
import { useParams } from "react-router-dom";
import { useDetailByIdQuery } from '../../hooks/useDetailById'

const DetailPage = () => {
  const { type, id } = useParams();
  const { data, isLoading, isError, error } = useDetailByIdQuery({ type, id });

  const details = data?.data;

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

  console.log(details);

  return (
    <div className='flex flex-col justify-center'>
      <div
        className='w-full h-96 bg-center bg-no-repeat bg-cover mb-10'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${details?.backdrop_path})` }}>
      </div>
      <div className='flex w-auto h-auto mx-40 justify-center gap-4'>
        <img
          className='w-40'
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
        />
        <div className='flex flex-col justify-center'>
          <h1>{details.title || details.name}</h1> {/* 영화는 title, TV 시리즈는 name */}
          <div className='flex mb-2'>
            {details.genres.map((genre, index) => {
              return <div key={index} className="badge badge-primary mr-2">
                {genre.name}
              </div>
            })}
          </div>
          <p>Overview: {details.overview}</p>
          <p>Release Date: {details.release_date || details.first_air_date}</p>
          <p>Rating: {details.vote_average}</p>
          <p>Runtime: {details.runtime || details.episode_run_time?.[0]} minutes</p>
          <div className='mb-2'>{Array(Math.round(details.vote_average / 2)).fill('⭐')}</div>


        </div>
      </div>
    </div>
  )
}

export default DetailPage