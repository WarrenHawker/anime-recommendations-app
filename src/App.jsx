import { useEffect, useState } from "react"
import axios from "axios";


export default function App() {
  const [options, setOptions] = useState({
    genre: null,
    status: null,
    minScore: null,
    rating: null,
    animePerPage: null, //1-25
    pageNumber: null,
  });

  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v4/anime?genres=36')
    .then(res => {
      const animeInfo = res.data.data.map((anime) => {
        return {
          title: anime.title,
          genres: anime.genres.map((genre) => {
            return genre.name
          }),
          themes: anime.themes.map((theme) => {
            return theme.name
          }),
          synopsis: anime.synopsis,
          image: anime.images.jpg.image_url,
          episodes: anime.episodes,
          type: anime.type,
          rating: anime.rating,
          status: anime.status,
          year: anime.year,
          score: anime.score,
        }
      })
      setAnimeData(animeInfo)
      
    })
  }, [])

  console.log(animeData)
  
  if(animeData) {
    return (
      <main>
        <h1>Anime Recommendations</h1>
        <h2>By Warren Hawker</h2>
        {
          animeData.map((anime) => {
            return <img src={anime.image}></img>
          })
        }
      </main>
    )
  }
}
