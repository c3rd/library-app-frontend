import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../Models/Book";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const BookCheckoutPage = () => {

  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const book: Book = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        category: responseJson.category,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        description: responseJson.description,
        img: responseJson.img,
      };
      setBook(book);
      setIsLoading(false);


    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <div>
      <div className='container d-none d-lg-block'>
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {book?.img ?
              <img src={book?.img} width='226' height='349' alt='Book' />
              :
              <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                height='349' alt='Book' />
            }
          </div>
          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center alighn-items-center'>
          {book?.img ?
            <img src={book?.img} width='226' height='349' alt='Book' />
            :
            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
              height='349' alt='Book' />
          }
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>

  );
}
