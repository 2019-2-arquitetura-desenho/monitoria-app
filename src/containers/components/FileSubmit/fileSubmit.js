import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import { 
    Button,
    Dialog,
    DialogContent, 
    DialogTitle, 
    DialogContentText,
    DialogActions
} from '@material-ui/core';

import FileUploadIcon from '@material-ui/icons/CloudUpload';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


registerPlugin(FilePondPluginImagePreview);

class FileSubmit extends React.Component {
    render() {
        const { 
            isFileSubmit, fileSubmit, onButtonUploadClick, isUploadDialogOpen,
            onCloseUploadDialog, onUpdateFileUploadDialog, onClickCancelUploadDialog,
            onClickConfirmUploadDialog, onUpdateFileUploadScreen
        } = this.props

        if (!isFileSubmit || fileSubmit.length===0){
            return(
                <React.Fragment>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        style={ styles.buttonUpload }
                        onClick={ onButtonUploadClick }
                        startIcon={ <FileUploadIcon /> }
                    >
                        Enviar Documento
                    </Button>
                    <Dialog
                        fullWidth={ true }
                        maxWidth="sm"
                        open={ isUploadDialogOpen }
                        onClose={ onCloseUploadDialog }
                        aria-labelledby="max-width-dialog-title"
                        aria-describedby="max-width-dialog-description"
                    >
                        <DialogTitle id="max-width-dialog-title">
                            Enviar Documento
                        </DialogTitle>
                        <DialogContent>
                            <FilePond 
                                files={ fileSubmit }
                                onupdatefiles={ onUpdateFileUploadDialog }
                            />
                            <DialogContentText id="max-width-dialog-description">
                                **Explicações
                            </DialogContentText>
                            <DialogActions>
                                <Button 
                                    onClick={ onClickCancelUploadDialog }
                                    color="primary"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={ onClickConfirmUploadDialog }
                                    color="secondary"
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>
            );
        } else {
            return (
                <div style={ styles.filePondScreen }>
                    <FilePond
                        files={ fileSubmit }
                        onupdatefiles={ onUpdateFileUploadScreen }
                    />
                </div>
            )
        }
    }
}

const styles = {
    buttonUpload: {
        width: "86%",
        marginTop: "4%",
        marginRight: "8%",
        marginLeft: "8%"
    },
    filePondScreen: {
        width: "86%",
        marginTop: "2%",
        marginRight: "8%",
        marginLeft: "8%"
    }
}

export default FileSubmit;
