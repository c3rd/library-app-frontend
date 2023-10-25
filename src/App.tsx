import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './Components/Footer';
import Navbar from './Components/Navbar';
import { BookCheckoutPage } from './Layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './Layouts/HomePage/HomePage';
import { SearchBooksPage } from './Layouts/SearchBooksPage/SearchBooksPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchBooksPage />} />
          <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
