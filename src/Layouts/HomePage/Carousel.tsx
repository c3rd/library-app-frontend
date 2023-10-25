import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnBooks } from "./ReturnBooks";

export const Carousel = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      setBooks(responseData);
      setIsLoading(false);


    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className="container mt-5">
        <div className='homepage-carousel-title'>
          <h3>Find your next "I stayed up too late reading" book.</h3>
        </div>
        <div className="row d-flex justify-content-center mt-5 m-auto">
          {httpError}
        </div>
      </div>
    )
  }

  return (
    <div className='container mt-5' style={{ height: 555 }}>
      <div className='homepage-carousel-title'>
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

        {/* Desktop */}
        <div className='carousel-inner'>

          <div className='carousel-item active'>
            <div className='row d-flex justify-content-center align-items-center'>
              {books.slice(0, 3).map(book => (
                <ReturnBooks book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              {books.slice(3, 6).map(book => (
                <ReturnBooks book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              {books.slice(6, 9).map(book => (
                <ReturnBooks book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <button className='carousel-control-prev' type='button'
          data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button className='carousel-control-next' type='button'
          data-bs-target='#carouselExampleControls' data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>

    </div>
  );
}
