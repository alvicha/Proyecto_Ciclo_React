import React from "react";

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar p-0">
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col-12 col-lg-6 col-md-6 col-sm-6 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-md-start">
                            <a className="navbar-brand" href="#">
                                <img src="/images/logo.png" alt="Logo de la aplicación" width="100" height="90" />
                            </a>
                            <h2 className="texto-aplicacion font-weight-bold mb-2 ml-md-3">
                                Demo Hotels
                            </h2>
                        </div>

                        <div className="col-12 col-lg-6 col-md-6 col-sm-6 navegacion d-flex justify-content-md-end justify-content-lg-end justify-content-center">
                            <ul className="navbar-nav d-flex flex-column flex-sm-row flex-wrap justify-content-end">
                                <li className="nav-item mr-3">
                                    <a className="nav-link">
                                        <i className="bi bi-info-circle mx-2"></i>Ayuda
                                    </a>
                                </li>
                                <li className="nav-item mr-3">
                                    <a className="nav-link">
                                        <i className="bi bi-lock mx-2"></i>Contraseña
                                    </a>
                                </li>
                                <li className="nav-item mr-3">
                                    <a className="nav-link">
                                        <i className="bi bi-box-arrow-right mx-2"></i>Cerrar sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
