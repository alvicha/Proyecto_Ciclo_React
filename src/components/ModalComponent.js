import $ from 'jquery';
import { useContext } from 'react';
import ScreensContext from '../screens/ScreensContext';

const ModalComponent = ({ setVisible }) => {

    const { context } = useContext(ScreensContext);

    const handleConfirmDelete = () => {
        $(context.current).summernote("code", "");
        setVisible(false);
    };

    return (
        <>
            <div className="modal-backdrop show"></div>

            <div className="modal show d-block" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmación</h5>
                            <button type="button" className="close" onClick={() => setVisible(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar el contenido del editor?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setVisible(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent;
