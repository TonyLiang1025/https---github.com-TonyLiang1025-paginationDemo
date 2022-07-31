import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'

function App() {

  const [items, setItems] = useState([])
  const [pageCount, setpageCount] = useState(0)

  const limit = 8

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      )
      const data = await res.json()
      const total = res.headers.get('x-total-count')
      setpageCount(Math.ceil(total/limit))
      // console.log(total)
      setItems(data)
    }
    getComments()
  },[])

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    )
    const data = await res.json();
    return data
  }

  const handlePageClick = async (data) => {
    console.log(data.selected)

    let currentPage = data.selected + 1
    const commentsFromServer = await fetchComments(currentPage)
    setItems(commentsFromServer)
  }

  return (
    <div className="container">
      <div className="row m-2">
      {items.map((item) => {
        return<div key={item.id} className='col-sm-6 col-md-4 v my-2'>
          <div className='card shadow-sm w-100' style={{ minHeight: 225}}>
            <h5>Id: {item.id}</h5>
            <h6>Email: {item.email}</h6>
            <p>{item.body}</p>
          </div>

        </div>
      })}
      </div> 

      <ReactPaginate 
      previousLabel={"< previous"}
      nextLabel={"next >"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={'active'}

      />
    </div>
  );
}

export default App;
