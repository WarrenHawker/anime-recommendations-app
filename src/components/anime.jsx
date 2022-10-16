import { useState } from "react"

export default function Anime(props) {
	const [showInfo, setShowInfo] = useState(false)

	const handleClick = (e) => {
		setShowInfo((prev) => !prev)
		e.target.parentElement.scrollIntoView({behavior: "smooth", block: "start"})
	}
	
	//prettier-ignore
	return (
		<article style={showInfo? {gridRow: 'span 3'} : null} className="anime-card">
			<div className="title">
				<h1>{props.data.title}</h1>
				<p>{props.data.type=='TV'? 'TV Series' : 'Movie'}</p>
				<p>score: {props.data.score}</p>
			</div>
			<div className="genres-image-container">
				<h3 className="genres">Genres: <span>{props.data.genres.join(', ')}</span></h3>
				<h3 className="themes">Themes: <span>{props.data.themes.join(', ')}</span></h3>
				<img src={props.data.image}></img>
			</div>

			{showInfo ?
				<div className="anime-info">
					<p className="synopsis">{props.data.synopsis}</p>
					<div className="anime-meta-data">	
						<p>Episodes: {props.data.episodes}</p>
						<p>Status: {props.data.status}</p>
						<p>Year: {props.data.year}</p>
						<p>{props.data.rating}</p>
					</div>
				</div> : null
			}
			<button className="btn btn-secondary" onClick={(event) => handleClick(event)}>{showInfo ? "hide info" : "show info"}</button>
		</article>
	)
}
