import Anime from './anime';
import Pagination from './pagination';

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
		<>
			<div className="pagination">
				<Pagination pageSelect={props.pageSelect} nextPage={props.nextPage} prevPage={props.prevPage} metaData={props.data.metaData}/>
			</div>
			<div className="recommendations-container">
				{animeDisplay}
			</div>
			<div className="pagination">
				<Pagination pageSelect={props.pageSelect} nextPage={props.nextPage} prevPage={props.prevPage} metaData={props.data.metaData}/>
			</div>
		</>

	)	
}
