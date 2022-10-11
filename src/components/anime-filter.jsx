import { useState } from "react"
import { genres, scores, ratings, statuses, types } from "../searchParams"

export default function AnimeFilter(props) {
  const [genresSelected, setGenresSelected] = useState(genres)
  const [minScore, setMinScore] = useState()
  const [minRating, setMinRating] = useState()
  const [chosenStatus, setChosenStatus] = useState()
  const [chosenType, setChosenType] = useState()

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
    setChosenStatus(e.target.id.slice(7))
  }

  const statusesDisplay = statuses.map((status)=> {
    return (
      <div key={status.id}>
        <input onChange ={statusSelectToggle} type="radio" id={`status-${status.id}`} name="status" value={`status-${status.name}`}></input>
        <label htmlFor={`status-${status.name}`}>{status.name}</label>
      </div>
    )
  })

  const typeSelectToggle = (e) => {
    setChosenType(e.target.id.slice(5))
  }

  const typesDisplay = types.map((type) => {
    return (
      <div key={type.id}>
        <input onChange ={typeSelectToggle} type="radio" id={`type-${type.id}`} name="type" value={`type-${type.name}`}></input>
        <label htmlFor={`type-${type.name}`}>{type.name}</label>
      </div>
    )
  })

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const genres = genresSelected.filter(genre => genre.isChecked)
    const searchOptions = {
      type: chosenType,
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
      case 'type': 
        setChosenType(null)
        break;
    }
  }
	//prettier-ignore
	return (
    <form onSubmit={handleFormSubmission}>
      <fieldset className="double-column" id="genre-selection">
        <legend>Genres</legend>
        {genresDisplay}
        <button className="btn btn-secondary" id="btn-clear-genres" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset className="double-column" id="score-selection">
        <legend>Minimum Score</legend>
        {scoresDisplay}
        <button className="btn btn-secondary" id="btn-clear-score" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset className="single-column" id="rating-selection">
        <legend>Minimum Age Rating</legend>
        {ratingsDisplay}
        <button className="btn btn-secondary" id="btn-clear-rating" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <div className="fieldset-container">
        <fieldset className="single-column" id="status-selection">
          <legend>Status</legend>
          {statusesDisplay}
          <button className="btn btn-secondary" id="btn-clear-status" onClick={clearFilter}>Clear Filter</button>
        </fieldset>
        <fieldset className="single-column" id="type-selection">
          <legend>Movie or TV Series</legend>
          {typesDisplay}
          <button className="btn btn-secondary" id="btn-clear-type" onClick={clearFilter}>Clear Filter</button>
        </fieldset>
      </div>
      <button className="btn btn-primary">Search</button>
    </form>
  )
}
