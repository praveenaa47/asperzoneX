"use client";
import React, { useState } from 'react';
import Categories from './components/CategoriesComponents';
import BlogPostCard from './components/BlogCard';
import RecentPosts from './components/RecentPosts';
import ConversationAndCV from './components/Cv';
import Header from '@/components/home/Header';
import AspireZonesFooter from '@/components/Footer';
import CareersBanner from './components/CareersBanner';

export default function BlogPostSection() {
  const [formData, setFormData] = useState({
    name: '',
    joinName: '',
    email: '',
    address: '',
    university: '',
    universityType: '',
    phone: '',
    commentEmail: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleCVUpload = () => {
    console.log('CV upload triggered');
    // Handle CV upload logic here
  };

  const handleShowMoreCategories = () => {
    console.log('Show more categories');
  };

  const categories = [
    { name: 'AI in Recruitment', color: 'text-blue-600' },
    { name: 'Remote Work', color: 'text-blue-600' },
    { name: 'AI in Medicine', color: 'text-blue-600' },
    { name: 'Diversity & Inclusion', color: 'text-blue-600' },
    { name: 'Future Of Work', color: 'text-blue-600' },
    { name: 'Talent Strategy', color: 'text-blue-600' }
  ];

  const recentPosts = [
    { title: 'AI and the talent landscape', date: '24' },
    { title: 'The Rise of Gig Economy Hiring', date: '23' },
    { title: 'Revolutionizing Recruitment', date: '24' },
    { title: 'Revolutionizing Recruitment', date: '24' }
  ];

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=400&fit=crop",
      title: "Renewable Energy Startups: Powering The Future",
      description: "Renewable Energy Startups Are Transforming How We Produce And Consume Power. From Solar Panels To Wind Turbines And Innovative Storage Solutions, These Companies Are Driving A Sustainable Energy Revolution.",
      keyTopics: "Solar Technology, Energy Storage, Green Startups, Sustainable Business Models."
    },
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
      title: "Renewable Energy Startups: Powering The Future",
      description: "Renewable Energy Startups Are Transforming How We Produce And Consume Power. From Solar Panels To Wind Turbines And Innovative Storage Solutions, These Companies Are Driving A Sustainable Energy Revolution.",
      keyTopics: "Solar Technology, Energy Storage, Green Startups, Sustainable Business Models."
    }
  ];

  return (
    <>
    <Header/>
    <CareersBanner/>
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard
                key={index}
                image={post.image}
                title={post.title}
                description={post.description}
                keyTopics={post.keyTopics}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Categories 
              categories={categories} 
              onShowMore={handleShowMoreCategories}
            />
            
            <RecentPosts posts={recentPosts} />
            
            <ConversationAndCV
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCVUpload={handleCVUpload}
            />
          </div>
        </div>
      </div>
    </div>
    <AspireZonesFooter/>
    </>
  );
}