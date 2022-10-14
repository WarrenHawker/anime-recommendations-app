import Anime from './anime';
import Pagination from './pagination';

export default function AnimeList(props) {
	console.log(props.data.metaData)
	const animeDisplay = props.data.animeData.map((item) => {
		return (
			<Anime
				key={item.id}
				data={item}
			/>
		)
	})

	return (
		<>
			<Pagination currentPage={props.data.metaData.currentPage} totalPages={props.data.metaData.totalPages}/>
			<div className="recommendations-container">
				{animeDisplay}
			</div>
			<Pagination currentPage={props.data.metaData.currentPage} totalPages={props.data.metaData.totalPages}/>
		</>

	)	
}
