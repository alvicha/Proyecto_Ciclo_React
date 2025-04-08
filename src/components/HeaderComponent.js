import React from "react";

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar p-1">
                <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">

                    <div class="d-flex align-items-center">
                        <a className="navbar-brand" href="#">
                            <img src="/images/logo.png" alt="Logo de la aplicación" width="100" height="90" />
                        </a>
                        <h2 className="text-left font-weight-bold" style={{ fontSize: "35px" }}>Demo Hotels</h2>
                    </div>

                    <div className="navegacion" id="opciones">
                        <ul className="navbar-nav d-flex flex-row flex-wrap justify-content-end">
                            <li className="nav-item mr-2">
                                <a className="nav-link text-gray-700 hover:text-blue-600 transition-all">
                                    <i className="bi bi-info-circle mx-2"></i>Ayuda
                                </a>
                            </li>
                            <li className="nav-item mr-2">
                                <a className="nav-link">
                                    <i className="bi bi-lock mx-2"></i>Contraseña
                                </a>
                            </li>
                            <li className="nav-item mr-2">
                                <a className="nav-link text-gray-700 hover:text-blue-600 transition-all">
                                    <i className="bi bi-box-arrow-right mx-2"></i>Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default HeaderComponent;
