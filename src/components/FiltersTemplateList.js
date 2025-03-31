
const FiltersTemplateList = () => {
    return (
        <div className="mt-5 d-flex justify-content-between align-items-center">
            <div>
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-plus"></i>Crear
                </button>
            </div>

            <div>
                <button className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Contextos
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                </ul>

                <div className="d-flex justify-content-center align-items-center py-3">
                    <form className="d-flex w-100 shadow-sm">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control px-3"
                                placeholder="Buscar..."
                                aria-label="Buscar"
                                style={{ backgroundColor: "#f8f9fa" }}
                            />
                            <button className="btn btn-dark rounded-end-pill" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default FiltersTemplateList; 