import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./App.css"; // Add this for custom CSS (e.g., smooth sliding)

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://webteam-assignments.onrender.com/events"
        );
        setPosts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchPost();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + visibleCards >= posts.length ? 0 : prevIndex + visibleCards
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [posts.length]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (posts.length === 0) {
    return <h2>No Posts Available</h2>;
  }

  const visiblePosts = [
    ...posts.slice(currentIndex, currentIndex + visibleCards),
    ...posts.slice(0, (currentIndex + visibleCards) % posts.length),
  ];

  return (
    <>
      <h1 className="text-3xl font-bold underline flex justify-center mt-5">
        Web Assignment
      </h1>
      <div className="carousel-container flex justify-center items-center overflow-hidden">
        <div
          className="carousel-wrapper flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {visiblePosts.map((post, idx) => (
            <div className="w-1/3 px-4" key={idx}>
              <Card
                imageurl={post.imageurl || "https://via.placeholder.com/300"}
                title={post.title || "No Title"}
                description={post.description || "No Description"}
                date={post.date || "No Date"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
