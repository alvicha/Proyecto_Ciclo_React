const ModalError = ({ alert, setVisibleAlert }) => {
    return (
        <>
            <div className="modal-backdrop show"></div>

            <div className="modal show d-block" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Error</h5>
                            <button type="button" className="close" onClick={() => setVisibleAlert(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {alert}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setVisibleAlert(false)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalError;
