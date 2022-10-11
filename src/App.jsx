import { useEffect, useRef, useState } from "react"
import axios from "axios";
import AnimeList from "./components/anime-list";
import AnimeFilter from "./components/anime-filter";


export default function App() {
  const [options, setOptions] = useState({
    type: null, //tv or movie
    genres: null,
    status: null,
    min_score: null, //0-10
    rating: null,
    limit: null, //1-25 number of anime per page
    page: null, //returned page (if more than 25 entries)
  });
  const fetchData = useRef(false);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if(fetchData.current) {
      let fetchUrl = new URL('https://api.jikan.moe/v4/anime?');
      Object.entries(options).forEach(([key, value]) => {
        if(value) {
          fetchUrl.searchParams.append(key, value)
        }
      })
      axios.get(fetchUrl)
      .then(res => {
        const metaData = {
          currentPage: res.data.pagination.current_page,
          totalPages: res.data.pagination.last_visible_page,
          resultsPerPage: res.data.pagination.items.per_page,
          totalResults: res.data.pagination.items.total,
        }
        const animeData = res.data.data.map((anime) => {
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
            id: anime.mal_id
          }
        })
        setSearchData({metaData, animeData});
        setLoading(false);
      })
      
    }
    else {
      fetchData.current = true;
    } 
  }, [options])

  function setAnimeFilter(data) {
    setOptions({
      type: data.type,
      genres: data.genres.toString(),
      status: data.status,
      min_score: data.score, 
      rating: data.rating,
      limit: null, 
      page: null, 
    })
    setLoading(true);
  }

  console.log(loading)
  
  return (
    <main>
      <h1>Anime Recommendations</h1>
      <h2>Find your next favourite anime</h2>
      <h3>Use the filters below to find the perfect anime for you!</h3>
      <AnimeFilter setAnimeFilter={setAnimeFilter}/>
      <div className="recommendations-container">
        {searchData ? <AnimeList data={searchData}/> : null}
        {loading ? <div className="spinner-loader"></div> : null}
      </div>
      
    </main>
  )
}
