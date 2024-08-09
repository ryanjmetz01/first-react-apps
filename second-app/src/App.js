import Layout from './Layout'
// -------------------------------------
// These are page options to route from 
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import {Route, Routes } from 'react-router-dom'
// import {useState, useEffect} from 'react'
// import {useNavigate } from 'react-router-dom'
// import {format} from 'date-fns'
// import api from '../api/posts'
// import useWindowSize from '../Hooks/useWindowSize'
// import useAxiosFetch from '../Hooks/useAxiosFetch'
//import { DataProvider } from './Context/dataContext'


function App() {
  // const [posts, setPosts] = useState([]);
  // const [search, setSearch] = useState(''); 
  // const [searchResults, setSearchResults] = useState([]); 
  // const [postTitle, setPostTitle] = useState(''); 
  // const [postBody, setPostBody] = useState(''); 
  // const [editTitle, setEditTitle] = useState(''); 
  // const [editBody, setEditBody] = useState(''); 

  // const navigate = useNavigate(); 

  // const { width } = useWindowSize(); 
  // const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts'); 

  // useEffect(() => {
  //   setPosts(data); 
  // }, [data])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts'); 
  //       // axios api automatically changes to json and automatically catches bad reponses
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response){
  //         // Not in the 200 response range 
  //         console.log(err.response.data); 
  //         console.log(err.response.status); 
  //         console.log(err.response.headers); 
  //       } else {
  //         console.log(console.log(`Error: ${err.message}`)); 
  //       }

  //     }
  //   }

  //   fetchPosts(); 
  // }, [])

  // useEffect(() => {
  //   const filteredResults = posts.filter(post => 
  //     ((post.body).toLowerCase()).includes(search.toLowerCase())
  //     || ((post.title).toLowerCase()).includes(search.toLowerCase())); 

  //     setSearchResults(filteredResults.reverse()); 
  // }, [posts, search])


  // const handleDelete = async (id) => {
  //   try {   
  //     await api.delete(`/posts/${id}`)
  //     // filter out the post that has the passed in id
  //     const postList = posts.filter(post => post.id !== id); 
  //     setPosts(postList); 
  //     // take us back to the homepage after the deletion
  //     navigate('/'); }
  //     catch (err){
  //       console.log(`Error: ${err.message}`); 
  //     }
 
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); 
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1; 
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
  //   const newPost = {id, title:postTitle, datetime, body:postBody}; 
  //   try {
  //     const response = await api.post('/posts', newPost); 
  //     const allPosts = [...posts, response.data]; 
  //     setPosts(allPosts); 
  //     setPostTitle(''); 
  //     setPostBody(''); 
  //     navigate('/'); 
  //   } catch (err){
  //     console.log(`Error: ${err.message}`); 
  //   }
  
  // }

  // const handleEdit = async (id) => {
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
  //   const updatedPost = {id, title:editTitle, datetime, body:editBody}; 
  //   try {
  //     const response = await  api.put(`/posts/${id}`, updatedPost); 
  //     // need to map so we can add the new post while getting rid of the old post
  //     setPosts(posts.map(post => post.id === id ? {...response.data} : post));
  //     setEditTitle(''); 
  //     setEditBody(''); 
  //     navigate('/'); 
  //   } catch (err){
  //     console.log(`Error: ${err.message}`); 
  //   }

  // }

  return (
        <Routes>
          <Route path="/" element={<Layout
            //DataProvider={DataProvider}
          />}>
            <Route index element={<Home/>} />
            <Route path="post">
              <Route index element={<NewPost />} />
              <Route path=":id" element={<PostPage />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path='/edit/:id' element={<EditPost />} />
            <Route path="*" element={<Missing />} />
          </Route>
      </Routes>
  );
}

export default App;
