import { useState,useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";


function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(()=>{
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get('https://webteam-assignments.onrender.com/events');
      setPost(res.data);
      setLoading(false);
    }
    fetchPost();
  },[]);

  console.log(post);

  return (
    <>
      <h1 className="text-3xl font-bold underline flex justify-center mt-5">Web Assignment</h1>
      <Card />
    </>
  );
}

export default App;
