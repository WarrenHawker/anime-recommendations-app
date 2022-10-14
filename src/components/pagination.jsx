import { useEffect, useState } from "react"

export default function Pagination(props) {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(props.currentPage)

  useEffect(()=> {
    calcPageNumbers();
  }, [])
  console.log(pageNumbers)
  const calcPageNumbers = () => {
    setPageNumbers(props.totalPages / 9)
  }
  return (
    <div className="pagination">
        <li><i className="fas fa-chevron-left"></i></li>
        <li>1</li>
        <li className="no-click"><i className="fas fa-ellipsis"></i></li>
        <li>5</li>
        <li>6</li>
        <li className="active">7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li className="no-click"><i className="fas fa-ellipsis"></i></li>
        <li>2558</li>
        <li><i className="fas fa-chevron-right"></i></li>
    </div>
  )
}