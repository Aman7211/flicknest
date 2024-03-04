import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2UxYTUyNjczMjRiMTFlMWJmNmFhY2I2NGNiNDcwYiIsInN1YiI6IjY1YzRiZDIzOTQ1MWU3MDE4NGJkNTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MytOI9VujCVSpLg0eV1gbbr5mXx2nUZPtrmoT2lRXPE"

const headers={
    Authorization:"bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url,params)=>{
   
    try
    {
        const {data}=await axios.get(BASE_URL+url,{
            headers,
            params,
        });
         
         return data
    }
    catch(error)
    {
        console.log(error);
        return error;
    }
};