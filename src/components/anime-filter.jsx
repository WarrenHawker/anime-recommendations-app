import { useState } from "react"
import { genres, scores } from "../searchData"

export default function AnimeFilter(props) {
  const [genresSelected, setGenresSelected] = useState(genres)
  const [minScore, setMinScore] = useState()

  const genreSelectToggle = (e) => {
    const selectedID = e.target.id.slice(6);
    setGenresSelected((prevSelected) => {
      return prevSelected.map((genre) => {
        if (genre.id == selectedID) {
          return {...genre, isChecked:!genre.isChecked}
        } else {
          return {...genre}
        }
      })
    })
  }

  const genresDisplay = genres.map((genre) => {
    return (
      <div key={genre.id}>
        <input onChange={genreSelectToggle} type="checkbox" id={`genre-${genre.id}`} name={`genre-${genre.id}`}></input>
        <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
      </div>
    )
  })

  const scoreSelectToggle = (e) => {
    console.log(e.target.value.slice(6))
  }

  const scoresDisplay = scores.map((score) => {
    return (
      <div key={score.id}>
        <input onChange ={scoreSelectToggle} type="radio" id={`score-${score.id}`} name="score" value={`score-${score.id}`}></input>
        <label htmlFor={`score-${score.id}`}>{score.name}</label>
      </div>
    )
  })
	//prettier-ignore
	return (
    <form>
      <fieldset id="genre-selection">
        {genresDisplay}
      </fieldset>
      <fieldset id="genre-selection">
        {scoresDisplay}
      </fieldset>
      <button onClick={props.setAnimeFilter}>Search</button>
    </form>
  )
}
