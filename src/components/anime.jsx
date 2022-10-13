export default function Anime(props) {
	
	//prettier-ignore
	return (
		<div className="anime-card">
			<h1>{props.data.title}<span>{props.data.type=='TV'? 'TV Series' : 'Movie'}</span></h1>
			<p>{props.data.rating}</p>
			<p>score:{props.data.score}</p>
			<h3>Genres: {props.data.genres.join(', ')}</h3>
			<h3>Themes: {props.data.themes.join(', ')}</h3>
			<p>{props.data.synopsis}</p>	
			<p>Episodes: {props.data.episodes}</p>
			<p>Year: {props.data.year}</p>
			<p>{props.data.status}</p>
			<img src={props.data.image}></img>
		</div>
	)
}
