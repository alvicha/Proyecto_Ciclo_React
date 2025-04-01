import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";

const FiltersTemplateList = () => {

    const { contextsList } = useContext(ScreensContext);

    return (
        <div className="row mb-5 mt-2 d-flex justify-content-between align-items-center">
            <div className="col-1">
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-plus"></i>Crear
                </button>
            </div>

            <div className="col-4 d-flex align-items-center justify-content-end">
                <button className="btn btn-secondary dropdown-toggle mr-4"
                    href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Contextos

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {contextsList.map((context) => (
                        <button
                            className="dropdown-item"
                            key={context.code}
                            aria-labelledby="dropdownMenuLink"
                        >
                            {context.code}
                        </button>
                    ))}
                </div>

                <div className="col-10 d-flex justify-content-center align-items-center py-4">
                    <form className="d-flex w-100 shadow-sm">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control px-4"
                                placeholder="Buscar..."
                                aria-label="Buscar"
                            />
                            <button className="input-group-text">
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