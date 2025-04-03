import React from "react";

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg d-flex align-items-center mx-2">
                <a className="navbar-brand" href="#">
                    <img src="./images/logo.png" alt="Logo de la aplicación" width="100" height="100" />
                </a>
                <h2 className="text-left font-weight-bold">Demo Hotels</h2>
                <div class="d-flex justify-content-end justify-content-sm-center align-items-sm-center">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#opciones"
                        aria-controls="opciones" aria-expanded="false" aria-label="Navegación hamburguesa">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse navegacion" id="opciones">
                    <ul className="navbar-nav flex gap-4">
                        <li className="nav-item">
                            <a className="nav-link flex items-center text-gray-700 hover:text-blue-600 transition-all">
                                <i className="bi bi-info-circle mx-2"></i>Ayuda
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link flex items-center">
                                <i className="bi bi-lock mx-2"></i>Contraseña
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link flex items-center text-gray-700 hover:text-blue-600 transition-all">
                                <i className="bi bi-box-arrow-right mx-2"></i>Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
