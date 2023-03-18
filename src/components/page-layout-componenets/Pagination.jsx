const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
  return (
    <div className="m-10">
      <ul className="w-full flex justify-center">
        <li className="mx-2">
          <a href="#">Prev.</a>
        </li>
        <li className="mx-2">
          <a href="#">1</a>
        </li>
        <li className="mx-2">
          <a href="">2</a>
        </li>
        <li className="mx-2">
          <a href="#">Next</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
