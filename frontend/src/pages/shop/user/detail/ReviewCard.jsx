import React from 'react'
import { Star } from 'lucide-react'
import { format } from 'date-fns'


const ReviewCard = ({ review }) => {
  const { name, rating, comment, createdAt } = review

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-blue-primary fill-blue-primary' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
      <h3 className="font-medium text-sm text-gray-900 mb-1">{name}</h3>
      <div className="flex items-center gap-1 mb-2">{renderStars()}</div>
      <p className="text-sm text-gray-700 mb-2">{comment}</p>
      <p className="text-xs text-gray-500">{format(new Date(createdAt), 'MMMM d, yyyy')}</p>
    </div>
  )
}

export default ReviewCard
