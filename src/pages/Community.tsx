import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Heart, MessageCircle, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Post } from '../types';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  // Mock posts data for now
  useEffect(() => {
    setPosts([
      {
        id: '1',
        userId: 'user1',
        title: '我的减脂餐打卡第30天',
        content: '坚持了一个月的减脂餐记录，期间体重减轻了5kg，分享一下我的心得和经验...',
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        likes: 156,
        createdAt: new Date().toISOString(),
        comments: [],
        isLiked: false
      },
      {
        id: '2',
        userId: 'user2',
        title: '超简单的低卡早餐分享',
        content: '今天给大家分享一个既营养又美味的低卡早餐配方，只需要15分钟就能完成...',
        imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
        likes: 89,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        comments: [],
        isLiked: true
      }
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">减脂社区</h1>
        <button
          className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transition-all duration-300"
          onClick={() => navigate('/community/create')}
        >
          <PlusCircle size={20} className="mr-2" />
          发布动态
        </button>
      </div>

      <div className="grid gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 
                className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-green-500 transition-colors"
                onClick={() => navigate(`/community/post/${post.id}`)}
              >
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => navigate(`/community/post/${post.id}`)}
                />
              )}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <button 
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    } transition-colors`}
                  >
                    <Heart size={20} fill={post.isLiked ? "#ef4444" : "none"} />
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    onClick={() => navigate(`/community/post/${post.id}`)}
                  >
                    <MessageCircle size={20} />
                    <span>{post.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(post.createdAt), 'MM月dd日 HH:mm', { locale: zhCN })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;