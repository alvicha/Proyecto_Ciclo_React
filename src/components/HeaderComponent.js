import React from "react";

const HeaderComponent = () => {
    return (
        <header className="border-b-4 border-gray-300">
            <nav className="navbar navbar-expand-lg p-4 d-flex justify-between align-items-center mx-4 mb-0">
                <h2 className="text-left font-weight-bold">Demo Hotels</h2>
                <div className="collapse navbar-collapse navegacion" id="opciones">
                    <ul className="navbar-nav flex gap-4">
                        <li className="nav-item">
                            <a className="nav-link flex items-center text-gray-700 hover:text-blue-600 transition-all" href="index.html">
                                <i className="bi bi-info-circle mx-2"></i>Ayuda
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link flex items-center text-gray-700 hover:text-blue-600 transition-all" href="sobre_mi(servicios).html">
                                <i className="bi bi-lock mx-2"></i>Contraseña
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link flex items-center text-gray-700 hover:text-blue-600 transition-all" href="contacto.html">
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
