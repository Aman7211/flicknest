import './App.css'
import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/API'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration,getGenres} from './Redux/Slices/HomeSlice';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Register';
import Home from './pages/Home/Home'
import SearchResult from './pages/Searchresult/SearchResult';
import Details from './pages/Details/Details';
import Explore from './pages/Explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {

  const dispatch=useDispatch();
  const {url}=useSelector((state)=>state.home)
  // console.log(url);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
  
  const fetchApiConfig=()=>{
        fetchDataFromApi("/configuration").then((res)=>{
          const url={
            backdrop:res.images.secure_base_url + "original",
            poster:res.images.secure_base_url + "original",
            profile:res.images.secure_base_url + "original",
          }
          dispatch(getApiConfiguration(url));
        })

  }

  const genresCall = async ()=>
  {
       let promises=[];
       let endPoints=["tv","movie"];
       let allGenres={};

       endPoints.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
       })

      //  console.log(promises)
       const data=await Promise.all(promises); //When using Promise.all, the data variable will indeed contain an array of the resolved values of each promise, not promises themselves. The Promise.all method returns a single promise that is fulfilled with an array of the resolved values when all promises in the input array are successfully resolved.
      //  console.log(data);

       data.map(({genres}) => {
           genres.map((item) =>{
            allGenres[item.id]=item;
          })
       });

       dispatch(getGenres(allGenres))
      //  console.log(allGenres)
     
  }

  return (
    <>
     <BrowserRouter>
       <Routes>
             <Route path='/' element={<SignUp/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/home' element={<Home/>}/>
             <Route path='/:mediaType/:id' element={<Details/>}/>
             <Route path='/search/:query' element={<SearchResult/>}/>
             <Route path='/explore/:mediaType' element={<Explore/>}/>
             <Route path='*' element={<PageNotFound/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}
export default App
