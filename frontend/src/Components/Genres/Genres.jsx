import React from 'react'
import './GenresStyle.scss';
import { useSelector } from 'react-redux';
const Genres = ({data}) => {

  // console.log(data)
  const {genres} = useSelector((state) => state.home);


  return (
    <div className='genres'>
        {
            data?.map((id_no)=>{
              if(!genres[id_no]?.name)
              return;
              
             return (
                       <div key={id_no} className='genre'>
                       {genres[id_no]?.name}
                       </div>
                     
                     ) 

            })
        }
    </div>
  )
}

export default Genres
