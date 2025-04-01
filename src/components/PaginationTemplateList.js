import { useState } from "react";

const PaginationTemplateList = () => {
    const itemsOptions = [10, 20, 50, 100, 200];
    const [itemsPerPage, setItemsPerPage] = useState(itemsOptions[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageBlock, setPageBlock] = useState(0);  // Bloque de páginas actual

    const totalItems = 200;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Cambiar el número de elementos por página
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
        setPageBlock(0);
    };

    const generatePageNumbers = () => {
        const pagesList = [];
        const startPage = pageBlock * 4 + 1;  // Determinamos el primer número de página en el bloque
        console.log(startPage);
        for (let i = startPage; i < startPage + 4; i++) {
            pagesList.push(i);
        }
        return pagesList;
    };
    const handleNextBlock = () => {
        if ((pageBlock + 1) * 4 < totalPages) {
            setPageBlock(pageBlock + 1);
        }
    };

    const handlePreviousBlock = () => {
        if (pageBlock > 0) {
            setPageBlock(pageBlock - 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="d-flex justify-content-end align-items-center">
            <div className="mr-4">
                <select className="mr-2" name="numberPages" id="page" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                    {itemsOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span>por página</span>
            </div>

            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={"page-item"}>
                            <button
                                className="page-link"
                                onClick={handlePreviousBlock}
                                aria-label="Previous"
                                disabled={pageBlock === 0}
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {generatePageNumbers().map((page, index) => (
                            <li key={index} className="page-item">
                                <button className="page-link"
                                    onClick={() => setCurrentPage(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${pageBlock + 1 >= Math.ceil(totalPages / 4) ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={handleNextBlock}
                                aria-label="Next"
                                disabled={pageBlock + 1 >= Math.ceil(totalPages / 4)}
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default PaginationTemplateList;