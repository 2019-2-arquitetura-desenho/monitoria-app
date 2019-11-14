import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';

import FileUploadIcon from '@material-ui/icons/CloudUpload';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class FileSubmit extends React.Component {

    switchButtonFilePond() {
        const {
            isFileSubmit, fileSubmit, onButtonUploadClick, onUpdateFileUploadScreen,
            label
        } = this.props

        if (!isFileSubmit || fileSubmit.length === 0) {
            return (
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={styles.buttonUpload}
                    onClick={onButtonUploadClick}
                    startIcon={<FileUploadIcon />}
                >
                    {label}
                </Button>
            );
        } else {
            return (
                <div style={styles.filePondScreen}>
                    <FilePond
                        files={fileSubmit}
                        onupdatefiles={onUpdateFileUploadScreen}
                    />
                </div>
            );
        }
    }

    render() {
        const {
            fileSubmit, isUploadDialogOpen, onCloseUploadDialog, onUpdateFileUploadDialog, onClickCancelUploadDialog,
            onClickConfirmUploadDialog
        } = this.props

        return (
            <React.Fragment>
                {this.switchButtonFilePond()}
                <Dialog
                    fullWidth={true}
                    maxWidth="sm"
                    open={isUploadDialogOpen}
                    onClose={onCloseUploadDialog}
                    aria-labelledby="max-width-dialog-title"
                    aria-describedby="max-width-dialog-description"
                >
                    <DialogTitle id="max-width-dialog-title">
                        Enviar Documento
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="max-width-dialog-description">
                            Envie-nos, em <b>formato PDF</b>, o seu histórico escolar universitário.
                        </DialogContentText>
                        <FilePond
                            files={fileSubmit}
                            onupdatefiles={onUpdateFileUploadDialog}
                            labelIdle='Arraste e Solte seu arquivo ou <span class="filepond--label-action">Escolha</span>'
                            acceptedFileTypes={['application/pdf']}
                        />
                        <DialogActions>
                            <Button onClick={onClickCancelUploadDialog} color="primary">Cancelar</Button>
                            <Button onClick={onClickConfirmUploadDialog} color="secondary">Confirmar</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

const styles = {
    buttonUpload: {
        width: "86%",
        marginTop: "%",
        marginRight: "8%",
        marginLeft: "8%"
    },
    filePondScreen: {
        width: "86%",
        marginTop: "4%",
        marginRight: "8%",
        marginLeft: "8%"
    }
}

export default FileSubmit;
