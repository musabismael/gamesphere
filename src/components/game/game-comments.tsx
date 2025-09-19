'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, ThumbsUp, ThumbsDown, Reply, MoreHorizontal } from 'lucide-react';
import { formatRelativeTime } from '@/utils';

interface GameCommentsProps {
  gameId: string;
}

// Mock comments data
const mockComments = [
  {
    id: '1',
    content: 'This game is absolutely incredible! The graphics are mind-blowing and the gameplay is so smooth. I can\'t stop playing!',
    createdAt: new Date('2024-02-18'),
    user: {
      id: 'user1',
      name: 'GameMaster99',
      image: '/user-avatar.svg',
      level: 20
    },
    likes: 15,
    replies: [
      {
        id: '1-1',
        content: 'I totally agree! The attention to detail is amazing.',
        createdAt: new Date('2024-02-18'),
        user: {
          id: 'user2',
          name: 'SpaceExplorer',
          image: '/user-avatar2.svg',
          level: 12
        },
        likes: 3
      }
    ]
  },
  {
    id: '2',
    content: 'Has anyone figured out how to unlock the secret level? I\'ve been trying for days!',
    createdAt: new Date('2024-02-17'),
    user: {
      id: 'user3',
      name: 'PuzzleSolver',
      image: '/user-avatar3.svg',
      level: 8
    },
    likes: 8,
    replies: []
  },
  {
    id: '3',
    content: 'The soundtrack is absolutely beautiful. It really adds to the immersive experience.',
    createdAt: new Date('2024-02-16'),
    user: {
      id: 'user4',
      name: 'MusicLover',
      image: '/user-avatar4.svg',
      level: 15
    },
    likes: 12,
    replies: []
  }
];

export function GameComments({ gameId: _gameId }: GameCommentsProps) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [comments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // In a real app, submit to API
    setTimeout(() => {
      setIsSubmitting(false);
      setNewComment('');
    }, 1000);
  };

  const handleSubmitReply = async (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    // In a real app, submit to API
    setTimeout(() => {
      setIsSubmitting(false);
      setReplyText('');
      setReplyingTo(null);
    }, 1000);
  };

  return (
    <Card className="bg-slate-800/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white">Comments ({comments.length})</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Write Comment */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/user-avatar.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this game..."
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.image} />
                      <AvatarFallback>
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          Lv. {comment.user.level}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-300 mb-3">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <ThumbsDown className="w-4 h-4 mr-1" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <form onSubmit={(e) => handleSubmitReply(comment.id, e)} className="space-y-3">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/user-avatar.svg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.user.name}...`}
                            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!replyText.trim() || isSubmitting}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {isSubmitting ? 'Posting...' : 'Reply'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-8 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-slate-700/20 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.user.image} />
                            <AvatarFallback>
                              {reply.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">
                                {reply.user.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                Lv. {reply.user.level}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatRelativeTime(reply.createdAt)}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-2">{reply.content}</p>
                      
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {reply.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="sm">
            Load More Comments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
