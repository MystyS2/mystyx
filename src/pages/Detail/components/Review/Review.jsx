import React from 'react'

const Review = ({ review }) => {
    const profileImg = `https://image.tmdb.org/t/p/original/${review?.author_details.avatar_path}`

    return (
        <div className='flex flex-col gap-2 bg-neutral-content rounded-md p-4'>
            <div className='flex gap-2 justify-between border-b pb-2 border-stone-400'>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                    {review.author_details.avatar_path === null ? <div className='w-full h-full bg-white' />
                      : <img src={profileImg} alt='profile image' />}
                        
                    </div>
                </div>
                <div className='self-center'>
                    {review.author}
                </div>
                <div className="badge badge-accent text-white self-center">⭐{review.author_details.rating ? review.author_details.rating : 0}</div>
            </div>

            <div className='border-b pb-2 border-stone-400 h-[320px]'>
                {review.content.length > 300 
                ? review.content.slice(0, 300) + "..."
                : review.content}
            </div>

            <div className='text-sm text-neutral'>
                updated at {review.updated_at.split("T")[0]}
            </div>
        </div>
    )
}

export default Review