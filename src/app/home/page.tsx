"use client";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import ImageGallery from "../components/HeroImage/HeroImage";
import Loading from "./loading";
import Image from "next/image";
import axios from "axios";
import { message } from "antd";


interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const Main: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingTopHeadlines, setLoadingTopHeadlines] = useState<boolean>(true); 
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false); 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [topHeadlines, setTopHeadlines] = useState<Article[]>([]); 

 
  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY; 
        const res = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
          params: {
            lang: "en",
            country: "us",
            max: 10,
            token: apiKey,
          },
        });
        setTopHeadlines(res.data.articles);
      } catch (error: unknown) {
        console.error("Error fetching top headlines:", error);
      } finally {
        setLoadingTopHeadlines(false); 
      }
    };

    fetchTopHeadlines();
  }, []); 

  useEffect(() => {
    const fetchArticles = async (query: string) => {

      setLoadingArticles(true); 
      try {
        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY; 
        const res = await axios.get(`https://gnews.io/api/v4/search`, {
          params: {
            q: query || "Apple", 
            lang: "en",
            max: 10,
            token: apiKey,
          },
        });
        setArticles(res.data.articles);
      } catch (error:unknown) {
        console.error("Error fetching articles:", error);
        message.error("Failed to fetch articles");
      } finally {
        setLoadingArticles(false); 
      }
    };

    fetchArticles(searchQuery); 
  }, [searchQuery]); 

  const handleSearch = (query: string) => {
    setSearchQuery(query); 
  };

  
  const latestArticles = loadingTopHeadlines ? [] : topHeadlines.slice(0, 3); 
  const images = latestArticles.map((article: Article) => ({
    src: article.image || "/fallback.jpg", 
    alt: article.title,
    category: article.source.name, 
    title: article.title,
  }));

  return (
    <div className="w-full">
    <Header onSearch={handleSearch} />
    
    <ImageGallery images={images} loading={loadingTopHeadlines}/>
  
    <div className="p-4 relative">
      
      <div className="flex items-center relative mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>
        <hr className="border-gray-300 flex-grow h-px mx-4" />
      </div>
  
      {loadingArticles ? (
        <Loading /> 
      ) : (
        articles.map((article, index) => (
          <div key={index} className="mb-4 border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row">
                <Image
                    src={article.image || '/fallback.jpg'}
                    alt={article.title}
                    width={300} 
                    height={200} 
                    className="w-full md:w-1/3 h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                  />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-2">{article.description}</p>
                <span className="text-gray-500 text-sm">{article.publishedAt}</span>
              </div>
            </a>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
};

export default Main;
