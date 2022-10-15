import { usePagination, DOTS } from "../hooks/usePagination";

export default function Pagination(props) {
  if(props.metaData) {
    const paginationRange = usePagination(props.metaData.totalPages, props.metaData.currentPage)
  
  if(props.metaData.currentPage == 0 || paginationRange.length < 2) {
    return null;
  } else {
      let lastPage = paginationRange[paginationRange.length -1];

      const paginationDisplay = paginationRange.map((pageNumber, index) => {
        if(pageNumber == DOTS) {
          return <li key={index} className="dots"><i className="fas fa-ellipsis"></i></li>
        } else if(pageNumber == props.metaData.currentPage) {
          return <li key={index} onClick={()=>props.pageSelect(pageNumber)} className="selected">{pageNumber}</li>
        } else {
          return <li key={index} onClick={()=>props.pageSelect(pageNumber)}>{pageNumber}</li>
        }
      })
      
      return (
        <div className="pagination">
          <li className={props.metaData.currentPage==1 ? "disabled" : null} onClick={props.prevPage}><i className="fas fa-chevron-left"></i></li>
          {paginationDisplay}  
          <li className={props.metaData.currentPage==lastPage ? "disabled" : null} onClick={props.nextPage}><i className="fas fa-chevron-right"></i></li>
        </div>
      )
    } 
  }
}