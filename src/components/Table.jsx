import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaRegCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import '../styles/table.css';
import ClipLoader from 'react-spinners/ClipLoader';

const Table = ({
  data,
  withLinks,
  btnFunction,
  tblButton,
  tblButton2,
  btnFunction2,
  actionVisible,
  loading,
  disable,
  enable,
  selectAllVisible,
  tableSelectControls,
  isCenterMgmt,
}) => {
  const [filterText, setFilterText] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [3, 5, 10];
  const [searchInput, setSearchInput] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDataEmpty = data.length === 0;

  const headers = isDataEmpty ? [] : Object.keys(data[0]);
  const status = headers[headers.length - 1];

  // Function to handle column sorting
  const handleSort = (column) => {
    if (column === sortColumn) {
      // Toggle sort direction if the same column is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set a new column for sorting
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Function to apply sorting to the data
  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      const direction = sortDirection === 'asc' ? 1 : -1;

      // Use localeCompare for sorting strings and simple comparison for numbers
      if (isNaN(aValue) || isNaN(bValue)) {
        return aValue.localeCompare(bValue) * direction;
      } else {
        return (aValue - bValue) * direction;
      }
    }
    return 0;
  });


  // Function to filter data based on filter values
  const filteredData = sortedData.filter((row) => {
    return (
      headers.every((header) => {
        const value = row[header];
        const filterValue = filterText[header];

        if (typeof value === 'string' || typeof value === 'number') {
          const formattedValue = typeof value === 'string' ? value.toLowerCase() : value;
          const formattedFilterValue = typeof filterValue === 'string' ? filterValue.toLowerCase() : filterValue;

          if (!filterValue) {
            return true; // If no filter applied, include the row
          }

          return formattedValue.toString().includes(formattedFilterValue.toString());
        }

        return true; // If not a string or number, include the row
      }) &&
      headers.some((header) => {
        const value = row[header];
        if (typeof value === 'string' || typeof value === 'number') {
          const formattedValue = typeof value === 'string' ? value.toLowerCase() : value;
          return formattedValue.toString().includes(searchInput.toLowerCase());
        }
        return false;
      })
    );
  });

  // Function to handle row selection
  const handleRowSelect = (row) => {
    // Check if the row is already selected
    const isSelected = selectedRows.includes(row);

    if (isSelected) {
      // Deselect the row
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row));
    } else {
      // Select the row
      setSelectedRows([...selectedRows, row]);
    }
  };

  // Function to handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // If not all rows are selected, select all
      setSelectedRows(data);
    }
  };

  // Function to go to the next page
  const nextPage = () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  // Calculate the index of the first and last row for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const firstItem = (currentPage - 1) * rowsPerPage + 1;
  const lastItem = Math.min(currentPage * rowsPerPage, filteredData.length);

  const tableContents = () => (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', marginTop: '0.8rem' }}>
      <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '100%', width: '100%' }}>
        <table className="table table-bordered" style={{ width: '100%' }}>
          <thead className="thead-dark">
            <tr>
              {selectAllVisible && (
                <td rowSpan="2">
                  <input
                    id="table-selectall"
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={() => handleSelectAll()}
                  />
                </td>
              )}
              {isCenterMgmt ? (
                  headers.filter((header, index) => header !== "id").map((header, index) => (
                    <th id={`table-headersort-${header}`} key={index} onClick={() => handleSort(header)}
                      style={{ marginLeft: '4px', cursor: 'pointer' }}>
                      <span>{header}</span>
                      <span>{sortColumn === header ? (
                        sortDirection === 'asc' ? '▲' : '▼'
                      ) : (
                        ' ↕'
                      )}</span>
                    </th>
                  ))
                ) : (
                  headers.map((header, index) => (
                    <th id={`table-headersort-${header}`} key={index} onClick={() => handleSort(header)}
                      style={{ marginLeft: '4px', cursor: 'pointer' }}>
                      <span>{header}</span>
                      <span>{sortColumn === header ? (
                        sortDirection === 'asc' ? '▲' : '▼'
                      ) : (
                        ' ↕'
                      )}</span>
                    </th>
                  ))
              )}
              {actionVisible && (
                <th rowSpan="2">Action</th>
              )}
            </tr>
            <tr>
              {isCenterMgmt ? (
                headers.filter((header, index) => header !== "id").map((header, index) => (
                <th key={index}>
                  <Form.Control
                    id={`table-headerfilterinput-${header}`}
                    className='filter-input'
                    type="text"
                    value={filterText[header] || ''}
                    onChange={(e) =>
                      setFilterText({
                        ...filterText,
                        [header]: e.target.value,
                      })
                    }
                  // style={{ width: `${header.length}ch` }}
                  />
                </th>
                ))
              ) : (
                headers.map((header, index) => (
                  <th key={index}>
                    <Form.Control
                      id={`table-headerfilterinput-${header}`}
                      className='filter-input'
                      type="text"
                      value={filterText[header] || ''}
                      onChange={(e) =>
                        setFilterText({
                          ...filterText,
                          [header]: e.target.value,
                        })
                      }
                    // style={{ width: `${header.length}ch` }}
                    />
                  </th>
                  ))
              )}
            </tr>

          </thead>
          <tbody>
            {filteredData.slice(indexOfFirstRow, indexOfLastRow).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {selectAllVisible && (
                  <td>
                    <input
                      id={`table-rowcheckbox-${rowIndex}`}
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                )}
                {isCenterMgmt ? (
                  headers.filter((header, index) => header !== "id").map((header, index) => (
                    <td key={index}>
                      {withLinks && index === 0 ? (
                        <Link id={`table-withlinks-${row[header]}`} to={`${pathname}/${row[header]}`}>
                          {row[header]}
                        </Link>
                      ) : (row[header])}

                    </td>
                  ))
                ) :
                  (
                    headers.map((header, index) => (
                      <td key={index}>
                        {withLinks && index === 0 ? (
                          <Link id={`table-withlinks-${row[header]}`} to={`${pathname}/${row[header]}`}>
                            {row[header]}
                          </Link>
                        ) : (row[header])}

                      </td>
                    ))
                  )
                }
                {actionVisible && (
                  <td>
                    {row[status] === "Disabled" ? (
                      headers.map((header, index) => (
                        index === 1 ? (
                          <div key={index}>
                            <FaRegCheckCircle id={`table-enable-${row[header]}`} style={{ cursor: "pointer", marginRight: '5px' }} onClick={() => enable(row[header])} />
                          </div>
                        ) : (
                          null
                        )
                      ))
                    ) : row[status] === "Enabled" ? (
                      headers.map((header, index) => (
                        index === 1 ? (
                          <div key={index}>
                            <FaTimesCircle id={`table-disable-${row[header]}`} style={{ cursor: "pointer", marginRight: '5px' }} onClick={() => disable(row[header])} />
                          </div>
                        ) : (
                          null
                        )
                      ))
                    ) : null}
                  </td>
                )}
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )


  return (
    <div className='custom-table'>
      <div className="table-controls">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {tableSelectControls && (
            <div className="rows-per-page-dropdown">
              <Form.Select id="table-select-rowperpage" className='table-formselect' value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
              <span> items - Showing {firstItem} - {lastItem} of {filteredData.length}</span>
            </div>
          )}


          <div className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
            {tblButton2 ? (
              <>
                <button id="table-button2" className="pill-button" 
                  onClick={tblButton2 === "Add Instructor" ? (
                    () => {
                        btnFunction2("Instructor");
                        navigate("/usermgmt/newuser");
                      }
                  ) : (btnFunction2)}>
                    {tblButton2}
                </button>
                <button id="table-button1" className="pill-button" 
                  onClick={btnFunction}>
                    {tblButton}
                </button>
              </>
            ) : (tblButton ? (
                  <button id="table-button1" className="pill-button" 
                    onClick={tblButton === "Add Country Admin" ? (
                      () => {
                          btnFunction("CountryAdmin");
                          navigate("/usermgmt/newuser");
                        }
                    ) : (btnFunction)}>
                      {tblButton}
                  </button>
                ) : null)}
            {tableSelectControls && (
              <Form.Control
                id="table-searchbar"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            )}
          </div>
        </div>


        {selectedRows.length > 0 && (
          <div className="selected-count">Selected {selectedRows.length} rows</div>
        )}
      </div>
      {!loading ? tableContents() : <div className='text-center my-5'><ClipLoader color="#4E4E4E" /></div>}

      <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <button id="table-prevpage" className="pagination-button-prev-button" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button id={`table-pagenumber-${number}`} className={`pagination-button-number ${currentPage === number ? 'active' : ''}`} key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>

        ))}
        <button id="table-nextpage" className="pagination-button-next-button"
          onClick={nextPage}
          disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

