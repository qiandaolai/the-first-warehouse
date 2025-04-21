import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Post, Comment } from '../types';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock post data
    setPost({
      id: '1',
      userId: 'user1',
      title: '我的减脂餐打卡第30天',
      content: '坚持了一个月的减脂餐记录，期间体重减轻了5kg，分享一下我的心得和经验。\n\n首先要控制每日摄入的总热量，我的目标是1500卡路里。每天会记录下所有食物的热量，确保不超标。\n\n其次是合理搭配三大营养素，保证蛋白质的摄入，适当控制碳水和脂肪。早餐我通常会吃全麦面包配鸡蛋，午餐会有瘦肉和蔬菜，晚餐则以蛋白质和纤维为主。\n\n运动方面，我每周会进行3-4次力量训练，配合20-30分钟有氧。这样既能保持肌肉量，又能持续消耗脂肪。',
      imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      likes: 156,
      createdAt: new Date().toISOString(),
      comments: [
        {
          id: 'c1',
          postId: '1',
          userId: 'user2',
          content: '太棒了！请问具体的饮食计划可以分享一下吗？',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'c2',
          postId: '1',
          userId: 'user3',
          content: '坚持一个月不容易，继续加油！',
          createdAt: new Date(Date.now() - 7200000).toISOString()
        }
      ],
      isLiked: false
    });
  }, [id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement comment creation with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (post) {
        const newCommentObj: Comment = {
          id: `c${Date.now()}`,
          postId: post.id,
          userId: 'currentUser',
          content: newComment,
          createdAt: new Date().toISOString()
        };
        
        setPost({
          ...post,
          comments: [...(post.comments || []), newCommentObj]
        });
        setNewComment('');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">帖子未找到</h2>
        <button
          className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
          onClick={() => navigate('/community')}
        >
          <ArrowLeft size={20} className="mr-2" />
          返回社区
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} className="mr-1" />
        返回
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-6">
              {format(new Date(post.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
            </div>
            
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full rounded-lg mb-6"
              />
            )}
            
            <div className="text-gray-700 whitespace-pre-line mb-6">
              {post.content}
            </div>
            
            <div className="flex items-center space-x-6 border-t border-gray-100 pt-4">
              <button 
                className={`flex items-center space-x-1 ${
                  post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                } transition-colors`}
              >
                <Heart size={20} fill={post.isLiked ? "#ef4444" : "none"} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <MessageCircle size={20} />
                <span>{post.comments?.length || 0}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 size={20} />
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            评论 ({post.comments?.length || 0})
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-r-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 flex items-center"
              >
                <Send size={18} className="mr-1" />
                发送
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {post.comments?.map(comment => (
              <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-800">用户{comment.userId}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {format(new Date(comment.createdAt), 'MM月dd日 HH:mm', { locale: zhCN })}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;