import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDetailByIdQuery } from '../../hooks/useDetailById'
import { useCreditsQuery } from '../../hooks/useCredits';
import Review from './components/Review/Review';
import { useReviewsQuery } from '../../hooks/useReviews';

const DetailPage = () => {
  const { type, id } = useParams();
  const { data, isLoading, isError, error } = useDetailByIdQuery({ type, id });
  const { data: creditData } = useCreditsQuery({ type, id });
  const { data: reviewData } = useReviewsQuery({ type, id });
  const details = data?.data;
  const credits = creditData?.data;
  const reviews = reviewData?.data.results;

  const [moreReviews, setMoreReviews] = useState(false);

  const stars = Math.round(details?.vote_average / 2);

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
    <div className='flex flex-col justify-center mb-40'>
      <>
        <div
          className='w-full h-96 bg-center bg-no-repeat bg-cover mb-10'
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${details?.backdrop_path})` }}>
        </div>
        <div className="absolute top-[68px] w-full h-96 bg-gradient-to-t from-black to-transparent"></div>

        <div className="absolute top-[68px] left-0 w-full h-96 p-16 bg-opacity-50 flex items-end justify-start">
          <div className="text-white text-start">
            <h1 className="text-4xl font-bold mb-4 text-primary">{details.title || details.name}</h1>
            <p className='flex max-sm:flex-col'>
              {(details.release_date ? details.release_date.slice(0, 4) : '') ||
                (details.first_air_date ? details.first_air_date.slice(0, 4) : '')}
              &nbsp;·&nbsp; {details.genres.map((genre, index) => {
                return <div className='flex' key={index}>
                  {genre.name}&nbsp;·&nbsp;
                </div>
              })}
              {details.origin_country}
            </p>
          </div>
        </div>
      </>

      <div className='flex w-auto h-auto lg:mx-40 lg:flex-row justify-center gap-8 mx-10 flex-col'>
        <div className='flex flex-col gap-1 w-[238px] flex-shrink-0'>
          {details.poster_path === null
            ? <div className='h-[400px] w-[238px] mb-2 bg-secondary rounded-lg' />
            : <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title || details.name} className='h-[400px] w-[238px] object-cover mb-2' />}
          <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>RATING</h2>
          <div className='text-4xl mb-2 flex'>
            {Array(stars).fill(<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" alt="Star" width="36" height="36" />)}
            {Array(5 - stars).fill(<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Milky%20Way.png" alt="Milky Way" width="36" height="36" />)}
          </div>
          <p>Average⭐{details.vote_average}&nbsp;</p>
          <p className='text-neutral-content text-sm font-thin'>({details.vote_count} people rated)</p>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className="text-4xl font-bold mb-4 text-primary">{details.original_title || details.name}</h1>
          <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>GENRES</h2>
          <div className='flex mb-2 max-sm:flex-col max-sm:gap-4'>
            {details.genres.map((genre, index) => {
              return <div key={index} className="badge badge-primary mr-2">
                {genre.name}
              </div>
            })}
          </div>
          <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>OVERVIEW</h2>
          {details.tagline ? <p className='mb-1 text-primary'>"{details.tagline}"</p> : ''}
          <p>{details.overview}</p>
          <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>REALEASE DATE</h2>
          <p>{details.release_date || details.first_air_date}</p>
          {type == 'tv'
            ? <>
              <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>SEASONS & EPISODES</h2>
              <p>{details.number_of_seasons} Season(s), {details.number_of_episodes} Episodes</p>
            </>
            : <>
              <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>RUNTIME</h2>
              <p>{details.runtime || details.episode_run_time?.[0]} minutes</p>
            </>
          }

          {details?.budget ?
            <div className='flex justify-between w-full gap-4'>
              <div className='flex flex-col w-full'>
                <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>BUDGET</h2>
                <p>💲{details?.budget.toLocaleString('en-US')}</p>
              </div>
              <div className='flex flex-col w-full'>
                <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>REVENUE</h2>
                <p>💲{details?.revenue.toLocaleString('en-US')}</p>
              </div>
            </div>
            : ''
          }

          {details.networks ? <h2 className='text-xl font-semibold text-secondary border-b-secondary border-b-2 pb-2'>Watchable Platform</h2> : ''}
          <div className='flex gap-4'>
            {details.networks?.map((item, index) => {
              const url = `https://image.tmdb.org/t/p/original/${item.logo_path}`
              return <img key={index} src={url} alt={item.name} className='h-10' />
            })}
          </div>
        </div>
      </div>

      <div className='flex flex-col bg-neutral w-auto h-auto lg:px-40 gap-8 px-10 py-10 mt-20'>
        <h2 className='text-3xl font-semibold text-white'>CASTS</h2>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 max-[675px]:grid-cols-1'>
          {credits?.cast?.map((cast, index) => {
            const profileImg = `https://image.tmdb.org/t/p/original/${cast.profile_path}`

            if (index < 10) {
              return <div className='flex gap-4'>
                <div className="avatar">
                  <div className="w-16 rounded">
                    {cast.profile_path === null ? <div className='w-full h-full bg-neutral-content rounded-lg' />
                      : <img key={index} src={profileImg} alt={cast.name} />}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <h3 className='text-xl'>{cast.name}</h3>
                  <p className='text-neutral-content'>{cast.known_for_department}&nbsp;|&nbsp;{cast.character}</p>
                </div>
              </div>
            }
          })}
        </div>
      </div>

      <div className='flex flex-col w-auto h-auto lg:px-40 gap-8 px-10 py-10'>
        <h2 className='text-3xl font-semibold text-white'>REVIEWS</h2>
        <div className='grid max-[300px]:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 text-black'>
          {reviews?.map((review, index) => {
            console.log(index > 4 && !moreReviews)
            return (
              <div className={index > 4 && !moreReviews ? 'hidden' : 'flex'}>
                <Review review={review} key={index} />
              </div>
            );
          })}
        </div>
        {reviews.length != 0
          ? <button class="btn btn-outline" onClick={() => setMoreReviews(!moreReviews)}>{moreReviews ? 'Close' : 'More Reviews'}</button>
          : <div className="flex items-center text-2xl gap-4">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png" alt="Crying Face" width="50" height="50" />
            There's no Review</div>
        }

      </div>


    </div>
  )
}

export default DetailPage