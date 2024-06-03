import Image from 'next/image'
import React from 'react'

const PromptCard = ({post,handleTagClick,HandleEdit,handleDelete}) => {
  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
            />

            <div className="flex flex-col">
              <h3 className="font-santoshi font-semibold text-gray-300">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>

        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      
    </div>
  )
}

export default PromptCard
