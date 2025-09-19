'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import { formatRelativeTime } from '@/utils';

interface GameReviewsProps {
  gameId: string;
}

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    rating: 5,
    content: 'Absolutely amazing game! The graphics are stunning and the gameplay is incredibly engaging. I\'ve been playing for hours and can\'t get enough.',
    isVerified: true,
    createdAt: new Date('2024-02-15'),
    user: {
      id: 'user1',
      name: 'GamerPro123',
      image: '/user-avatar.svg',
      level: 15
    }
  },
  {
    id: '2',
    rating: 4,
    content: 'Great game overall, but could use some improvements in the controls. The story is fantastic though.',
    isVerified: false,
    createdAt: new Date('2024-02-10'),
    user: {
      id: 'user2',
      name: 'SpaceExplorer',
      image: '/user-avatar2.svg',
      level: 8
    }
  },
  {
    id: '3',
    rating: 5,
    content: 'Perfect for kids! My 8-year-old loves this game and it\'s completely safe. Highly recommended for families.',
    isVerified: true,
    createdAt: new Date('2024-02-08'),
    user: {
      id: 'user3',
      name: 'ParentGamer',
      image: '/user-avatar3.svg',
      level: 12
    }
  }
];

export function GameReviews({ gameId: _gameId }: GameReviewsProps) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [reviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || rating === 0) return;

    setIsSubmitting(true);
    // In a real app, submit to API
    setTimeout(() => {
      setIsSubmitting(false);
      setNewReview('');
      setRating(0);
    }, 1000);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => 
    reviews.filter(review => review.rating === star).length
  );

  return (
    <div>
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-white mr-2">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-400 text-sm">
              Based on {reviews.length} reviews
            </span>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[5 - star];
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 w-3">{star}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Write Review */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Write a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Review</label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your thoughts about this game..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <Button
              type="submit"
              disabled={!newReview.trim() || rating === 0 || isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user.image} />
                    <AvatarFallback>
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {review.user.name}
                      </span>
                      {review.isVerified && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        Lv. {review.user.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">
                        {formatRelativeTime(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-gray-300 mb-3">{review.content}</p>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Not Helpful
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="sm">
            Load More Reviews
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
