import React, { useState, useEffect } from 'react';
import { MenuIcon, X, User, Heart, Calendar, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '社区', path: '/community', icon: Users },
    { name: '收藏', path: '/favorites', icon: Heart },
    { name: '每周计划', path: '/weekly-plan', icon: Calendar },
    { name: '个人资料', path: '/profile', icon: User }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-2">
            <span className="text-white font-bold">减脂</span>
          </div>
          <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
            减脂餐盲盒
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`cursor-pointer transition-all hover:text-green-500 ${
                location.pathname === item.path ? 'text-green-500 font-semibold' : 'text-gray-700'
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </nav>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <div
                key={item.path}
                className={`py-3 cursor-pointer transition-all hover:text-green-500 border-b border-gray-100 ${
                  location.pathname === item.path ? 'text-green-500 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center">
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;