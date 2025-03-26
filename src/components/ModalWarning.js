const ModalWarning = ({ onConfirmChange, onCancelChange, warningMessage }) => {
    return (
        <>
            <div className="modal-backdrop show"></div>

            <div className="modal show d-block" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Advertencia</h5>
                            <button type="button" className="close" onClick={onCancelChange} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {warningMessage}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={onCancelChange}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={onConfirmChange}>Cambiar Plantilla</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalWarning;
