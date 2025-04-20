import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmDialogContent = ({ visible, setVisible, acceptModalAcceptContent, rejectModalDeleteContent }) => {
    return (
        <ConfirmDialog
            group="declarative"
            visible={visible}
            onHide={() => setVisible(false)}
            message="¿Desea eliminar el contenido de la plantilla?"
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            acceptLabel='Sí'
            rejectLabel='No'
            acceptClassName='rounded-pill buttons mt-3'
            rejectClassName='button-reject'
            accept={acceptModalAcceptContent}
            reject={rejectModalDeleteContent}
            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
        />
    )
};

export default ConfirmDialogContent; 