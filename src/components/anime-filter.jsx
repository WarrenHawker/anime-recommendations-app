import { useState } from "react"
import { genres, scores, ratings, statuses } from "../searchParams"

export default function AnimeFilter(props) {
  const [genresSelected, setGenresSelected] = useState(genres)
  const [minScore, setMinScore] = useState()
  const [minRating, setMinRating] = useState()
  const [chosenStatus, setChosenStatus] = useState()

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
    setMinScore(e.target.value.slice(6))
  }

  const scoresDisplay = scores.map((score) => {
    return (
      <div key={score.id}>
        <input onChange ={scoreSelectToggle} type="radio" id={`score-${score.id}`} name="score" value={`score-${score.id}`}></input>
        <label htmlFor={`score-${score.id}`}>{score.name}</label>
      </div>
    )
  })

  const ratingSelectToggle = (e) => {
    setMinRating(e.target.value.slice(7))
  }

  const ratingsDisplay = ratings.map((rating) => {
    return (
      <div key={rating.id}>
        <input onChange ={ratingSelectToggle} type="radio" id={`rating-${rating.id}`} name="rating" value={`rating-${rating.id}`}></input>
        <label htmlFor={`rating-${rating.id}`}>{`${rating.name} (${rating.description})`}</label>
      </div>
    )
  })

  const statusSelectToggle = (e) => {
    setChosenStatus(e.target.value.slice(7))
  }

  const statusesDisplay = statuses.map((status)=> {
    return (
      <div key={status.id}>
        <input onChange ={statusSelectToggle} type="radio" id={`status-${status.name}`} name="status" value={`status-${status.name}`}></input>
        <label htmlFor={`status-${status.name}`}>{status.name}</label>
      </div>
    )
  })

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const genres = genresSelected.filter(genre => genre.isChecked)
    const searchOptions = {
      status: chosenStatus,
      rating: minRating,
      score: minScore,
      genres: genres.map((genre) => {
        return genre.id
      })
    }
    props.setAnimeFilter(searchOptions)
  }

  const clearFilter = (e) => {
    e.preventDefault();
    const inputs = [...e.target.parentElement.querySelectorAll('input')]
    inputs.forEach((input)=> {
      input.checked = false;
    })

    const buttonID = e.target.id.slice(10)
    switch(buttonID) {
      case 'genres':
        setGenresSelected(genres)
        break;
      case 'score':
        setMinScore(null)
        break;
      case 'rating':
        setMinRating(null)
        break;
      case 'status':
        setChosenStatus(null)
        break;
    }
  }
	//prettier-ignore
	return (
    <form onSubmit={handleFormSubmission}>
      <fieldset id="genre-selection">
        <legend>Genres</legend>
        {genresDisplay}
        <button id="btn-clear-genres" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset id="score-selection">
        <legend>Minimum Score</legend>
        {scoresDisplay}
        <button id="btn-clear-score" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset id="rating-selection">
        <legend>Minimum Age Rating</legend>
        {ratingsDisplay}
        <button id="btn-clear-rating" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset id="status-selection">
        <legend>Status</legend>
        {statusesDisplay}
        <button id="btn-clear-status" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <button>Search</button>
    </form>
  )
}
