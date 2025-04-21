import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MealDetail from './pages/MealDetail';
import Favorites from './pages/Favorites';
import WeeklyPlan from './pages/WeeklyPlan';
import Profile from './pages/Profile';
import Community from './pages/Community';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import { MealsProvider } from './store/MealsContext';

function App() {
  return (
    <MealsProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meal/:id" element={<MealDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/weekly-plan" element={<WeeklyPlan />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/create" element={<CreatePost />} />
              <Route path="/community/post/:id" element={<PostDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </MealsProvider>
  );
}

export default App;