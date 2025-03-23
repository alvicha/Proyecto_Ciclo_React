const ModalWarning = ({ setVisibleModalWarning, onConfirmChange, warningMessage }) => {
    return (
        <>
            <div className="modal-backdrop show"></div>

            <div class="modal show d-block" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Advertencia</h5>
                            <button type="button" class="close" onClick={() => setVisibleModalWarning(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {warningMessage}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={() => setVisibleModalWarning(false)}>Cancelar</button>
                            <button type="button" class="btn btn-primary" onClick={onConfirmChange}>Cambiar Plantilla</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalWarning;
