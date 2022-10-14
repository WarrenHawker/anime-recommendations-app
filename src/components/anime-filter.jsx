import { useState } from "react"
import { genres, scores, ratings, statuses, types } from "../searchParams"

export default function AnimeFilter(props) {
  const [genresSelected, setGenresSelected] = useState(genres)
  const [minScore, setMinScore] = useState()
  const [minRating, setMinRating] = useState()
  const [chosenStatus, setChosenStatus] = useState()
  const [chosenType, setChosenType] = useState()
  const [pageLimit, setPageLimit] = useState(props.pageLimit)

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
      <label className="filter-container checkbox" key={genre.id} htmlFor={`genre-${genre.id}`}>{genre.name}
        <input onChange={genreSelectToggle} type="checkbox" id={`genre-${genre.id}`} name={`genre-${genre.id}`}></input>
        <span className="checkmark square"></span>
      </label>
    )
  })

  const scoreSelectToggle = (e) => {
    setMinScore(e.target.value.slice(6))
  }

  const scoresDisplay = scores.map((score) => {
    return (
      <label className="filter-container radio" key={score.id} htmlFor={`score-${score.id}`}>
        {`(${score.id}) ${score.name}`}
        
          <input 
            onChange={scoreSelectToggle} type="radio" id={`score-${score.id}`} name="score" value={`score-${score.id}`}>
          </input>

          <span className="checkmark circle"></span>
      </label>
    )
  })

  const ratingSelectToggle = (e) => {
    setMinRating(e.target.value.slice(7))
  }

  const ratingsDisplay = ratings.map((rating) => {
    return (
      <label className="filter-container radio" key={rating.id} htmlFor={`rating-${rating.id}`}>
        {`${rating.name} (${rating.description})`}
          <input 
            onChange={ratingSelectToggle} type="radio" id={`rating-${rating.id}`} name="rating" value={`rating-${rating.id}`}>
          </input>

          <span className="checkmark circle"></span>
      </label>
    )
  })

  const statusSelectToggle = (e) => {
    setChosenStatus(e.target.id.slice(7))
  }

  const statusesDisplay = statuses.map((status)=> {
    return ( 
      <label className="filter-container radio" key={status.id} htmlFor={`status-${status.id}`}>{status.name}
        <input 
          onClick={statusSelectToggle} type="radio" id={`status-${status.id}`} name="status" value={`status-${status.name}`}>
        </input>

        <span className="checkmark circle"></span>
      </label>
    )
  })

  const typeSelectToggle = (e) => {
    setChosenType(e.target.id.slice(5))
  }

  const typesDisplay = types.map((type) => {
    return (
      <label className="filter-container radio" key={type.id} htmlFor={`type-${type.id}`}>{type.name}
        <input onChange ={typeSelectToggle} type="radio" id={`type-${type.id}`} name="type" value={`type-${type.name}`}></input>
        <span className="checkmark circle"></span>
      </label>
    )
  })

  const limitSelectToggle = (e) => {
    setPageLimit(e.target.value)
  }

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const genres = genresSelected.filter(genre => genre.isChecked)
    const searchOptions = {
      type: chosenType,
      status: chosenStatus,
      rating: minRating,
      score: minScore,
      limit: pageLimit,
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
    <form className="anime-filter" onSubmit={handleFormSubmission}>
      <fieldset className="double-column">
        <legend>Genres</legend>
        {genresDisplay}
        <button className="btn btn-secondary" id="btn-clear-genres" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset>
        <legend>Minimum Score</legend>
        <div className="scores-filter-container">{scoresDisplay}</div>
        <button className="btn btn-secondary" id="btn-clear-score" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <fieldset className="single-column">
        <legend>Minimum Age Rating</legend>
        {ratingsDisplay}
        <button className="btn btn-secondary" id="btn-clear-rating" onClick={clearFilter}>Clear Filter</button>
      </fieldset>
      <div className="fieldset-container">
        <fieldset>
          <legend>Status</legend>
          {statusesDisplay}
          <button className="btn btn-secondary" id="btn-clear-status" onClick={clearFilter}>Clear Filter</button>
        </fieldset>
        <fieldset>
          <legend>Movie or TV Series</legend>
          {typesDisplay}
          <button className="btn btn-secondary" id="btn-clear-type" onClick={clearFilter}>Clear Filter</button>
        </fieldset>
      </div>
      <fieldset className="slider-container">
        <legend>Number of items per page</legend>
        <input onInput={limitSelectToggle} name="limit" type="range" min="1" max="25" step="1" defaultValue={pageLimit}></input>
        <p>{pageLimit}</p>
      </fieldset>
      <button className="btn btn-primary">Search</button>
    </form>
  )
}
