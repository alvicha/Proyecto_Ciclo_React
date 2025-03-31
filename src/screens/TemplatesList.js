import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import FiltersTemplateList from '../components/FiltersTemplateList';

const TemplatesList = () => {

    return (
        <div className="m-5">
            <h2 class="text-left mb-4">Listado de Plantillas</h2>
            <FiltersTemplateList />

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

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TemplatesList; 