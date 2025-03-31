import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";

const TemplatesList = () => {

    return (
        <div className="m-5">
            <h2 class="text-left">Listado de Plantillas</h2>
            <div className="dropdown border border-success d-flex align-items-center justify-content-center m-auto" style={{ width: "350px", height: "150px" }}>
                <button className="btn btn-secondary dropdown-toggle w-50" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Contexto
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                </ul>
            </div>

            <div className="mt-5 d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-plus"></i>Crear
                </button>

                <div className="d-flex justify-content-center align-items-center">
                    <form className="form-inline d-flex">
                        <input className="form-control" type="search" placeholder="Buscar..." />
                        <button className="btn btn-outline-secondary bg-info text-white">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>

            <table className="table table-hover table-bordered mt-5">
                <thead className="table-primary">
                    <tr>
                        <th>Id</th>
                        <th>Contexto</th>
                        <th>Nombre</th>
                        <th>Asunto</th>
                        <th>Contenido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Juan Pérez</td>
                        <td>juan@example.com</td>
                        <td>25</td>
                        <td>28</td>
                        <td>
                            <button className="btn btn-outline-secondary bg-success text-white">
                                <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-primary text-white mx-1">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-danger text-white">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>María López</td>
                        <td>maria@example.com</td>
                        <td>30</td>
                        <td>28</td>
                        <td>
                            <button className="btn btn-outline-secondary bg-success text-white">
                                <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-primary text-white mx-1">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-danger text-white">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Carlos Ruiz</td>
                        <td>carlos@example.com</td>
                        <td>28</td>
                        <td>28</td>
                        <td>
                            <button className="btn btn-outline-secondary bg-success text-white">
                                <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-primary text-white mx-1">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-danger text-white">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Carlos Ruiz</td>
                        <td>carlos@example.com</td>
                        <td>28</td>
                        <td>28</td>
                        <td>
                            <button className="btn btn-outline-secondary bg-success text-white">
                                <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-primary text-white mx-1">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-secondary bg-danger text-white">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default TemplatesList; 