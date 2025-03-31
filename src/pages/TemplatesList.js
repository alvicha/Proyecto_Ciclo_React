import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import FiltersTemplateList from '../components/FiltersTemplateList';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TemplatesList = () => {
    const [idTemplate, setIdTemplate] = useState("2");

    return (
        <div className="m-5">
            <h2 className="text-left mb-4">Listado de Plantillas</h2>

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
                    {[
                        { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", asunto: "25", contenido: "28" },
                        { id: 2, nombre: "María López", correo: "maria@example.com", asunto: "30", contenido: "28" },
                        { id: 3, nombre: "Carlos Ruiz", correo: "carlos@example.com", asunto: "28", contenido: "28" }
                    ].map((template) => (
                        <tr key={template.id}>
                            <td>{template.id}</td>
                            <td>{template.nombre}</td>
                            <td>{template.correo}</td>
                            <td>{template.asunto}</td>
                            <td>{template.contenido}</td>
                            <td>
                                <button className="btn btn-outline-secondary bg-success text-white">
                                    <i className="bi bi-eye"></i>
                                </button>

                                <Link to={`/template/${template.id}`}>
                                    <button className="btn btn-outline-secondary bg-primary text-white mx-1">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </Link>

                                <button className="btn btn-outline-secondary bg-danger text-white">
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TemplatesList; 