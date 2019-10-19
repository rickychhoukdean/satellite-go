import React, { useEffect, useState } from 'react';
import Axios from 'axios';


const ProfileView = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8000/user/1/satellites')
    .then(favs => {
      setFavourites(favs)
    })
  })

  return (
    <div>
      
    </div>
  )
}

export default ProfileView;