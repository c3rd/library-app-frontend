import React from "react";

export const Pagination: React.FC<{ currentPage: number, totalPages: number, paginate: any, links: any }> = (props) => {

  let firstVisibleNumber: number = props.currentPage == 1 ? props.currentPage : props.currentPage - 1;
  const totalVisibleNumbers: number = props.totalPages < 3 ? props.totalPages : 3;
  if (props.currentPage == props.totalPages && props.totalPages >= totalVisibleNumbers) {
    firstVisibleNumber = props.currentPage - (totalVisibleNumbers - 1);
  }
  const pageNumbers: number[] = [];

  for (let i = 0, n = props.totalPages; i < totalVisibleNumbers && (firstVisibleNumber + i) <= n; i++) {
    pageNumbers.push(firstVisibleNumber + i);
  }

  return (
    <nav aria-label="...">
      <ul className='pagination'>
        <li className='page-item' onClick={() => props.paginate(1)}>
          <button className='page-link'>
            First Page
          </button>
        </li>
        <li className='page-item' >
          <button className='page-link' onClick={() => props.paginate(props.currentPage - 1)} disabled={(props.links.prev ? false : true)}>
            {"<<"}
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => props.paginate(number)}
            className={'page-item ' + (props.currentPage === number ? 'active' : '')}>
            <button className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li className='page-item'>
          <button className='page-link' onClick={() => props.paginate(props.currentPage + 1)} disabled={(props.links.next ? false : true)}>
            {">>"}
          </button>
        </li>
        <li className='page-item' onClick={() => props.paginate(props.totalPages)}>
          <button className='page-link'>
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
}
