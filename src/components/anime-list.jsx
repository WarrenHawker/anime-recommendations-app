import Anime from './anime';

export default function AnimeList(props) {
	const animeDisplay = props.data.animeData.map((item) => {
		return (
			<Anime
				key={item.id}
				data={item}
			/>
		)
	})

	return (
		<div>
			{animeDisplay}
		</div>

	)
	
	
}
