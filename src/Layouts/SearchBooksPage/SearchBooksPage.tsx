import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../../Utils/Pagination";

export const SearchBooksPage = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [lastItem, setLastItem] = useState(0);
  const [indexOfFirstBook, setIndexOfFirstBook] = useState(0);
  const [links, setLinks] = useState('');
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      let url: string;
      if (searchUrl == '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=5`;
      } else {
        url = baseUrl + searchUrl;
        console.log(url)
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      console.log(typeof (responseJson));
      console.log(responseJson);
      setBooks(responseData);
      setLinks(responseJson._links);
      setTotalPages(responseJson.page.totalPages);
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setLastItem((responseJson.page.number + 1) * responseJson.page.size <= responseJson.page.totalElements ? (responseJson.page.number + 1) * responseJson.page.size : responseJson.page.totalElements);
      setIndexOfFirstBook(responseJson.page.number * responseJson.page.size);
      setIsLoading(false);


    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);

  }, [currentPage, searchUrl]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  const searchHandleChange = () => {

    setLastSearch(search);
    if (search == '') {
      setSearchUrl('');
      setCurrentPage(1);
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=5`);
      setCurrentPage(1);
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    if (searchUrl != '') {
      setSearchUrl(`/search/findByTitleContaining?title=${lastSearch}&page=${pageNumber - 1}&size=5`)
    }
  };


  return (
    <div>
      <div className='container'>
        <div>
          <div className='row mt-5'>
            <div className='col-6'>
              <div className='d-flex'>
                <input className='form-control me-2' type='search'
                  placeholder='Search' aria-labelledby='Search'
                  onChange={e => setSearch(e.target.value)} />
                <button className='btn btn-outline-success'
                  onClick={() => searchHandleChange()}>
                  Search
                </button>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ?
            <>
              <div className='mt-3'>
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
              </p>
              {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} links={links} paginate={paginate} />
              }
              {books.map(book => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
            :
            <div className='m-5'>
              <h3>
                Can't find what you are looking for?
              </h3>
              <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                href='#'>Library Services</a>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
