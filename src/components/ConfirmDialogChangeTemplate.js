import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmDialogChangeTemplate = ({ visibleModalWarning, onCancelChange, message, acceptModalWarning, rejectModalWarning }) => {
    return (
        <ConfirmDialog
            group="declarative"
            visible={visibleModalWarning}
            onHide={onCancelChange}
            message={message}
            header="Advertencia"
            icon="pi pi-exclamation-triangle"
            acceptLabel='Cambiar Plantilla'
            rejectLabel='Cancelar'
            accept={acceptModalWarning}
            reject={rejectModalWarning}
            style={{ width: '50vw' }}
            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            acceptClassName='buttons rounded-pill'
            rejectClassName='button-reject'
        />
    )
};

export default ConfirmDialogChangeTemplate; 