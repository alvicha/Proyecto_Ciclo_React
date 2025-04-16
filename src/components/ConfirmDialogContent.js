import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmDialogContent = ({ visible, setVisible, acceptModalAcceptContent, rejectModalDeleteContent }) => {
    return (
        <ConfirmDialog
            group="declarative"
            visible={visible}
            onHide={() => setVisible(false)}
            message="¿Desea eliminar el contenido del editor?"
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            acceptLabel='Sí'
            rejectLabel='No'
            accept={acceptModalAcceptContent}
            reject={rejectModalDeleteContent}
            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
        />
    )
};

export default ConfirmDialogContent; 