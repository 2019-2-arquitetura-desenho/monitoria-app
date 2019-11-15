import React from 'react';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    LinearProgress,
    IconButton,
    Box,
    Toolbar,
    AppBar
} from '@material-ui/core';

import FileUploadIcon from '@material-ui/icons/CloudUpload';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';

import { DropzoneArea } from 'material-ui-dropzone'


class FileSubmit extends React.Component {

    switchButtonFile() {
        const {
            isConfirmFileSubmit, onButtonUploadClick, fileName,
            onClickViewFileUpload, onClickDeleteFileUpload,
            label
        } = this.props

        if (!isConfirmFileSubmit){
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
                <div style={ styles.fileScreen }>
                    <b style={{ color:"#267cc1" }}>Histórico Escolar</b>
                    <Typography style={{ display:"flex" }}>
                        <b>{fileName}</b>
                        <VisibilityIcon
                            onClick={ onClickViewFileUpload }
                            style={ styles.visibilityIcon }
                        />
                        <HighlightOffIcon
                            onClick={onClickDeleteFileUpload}
                            style={ styles.highlightOffIcon }
                        />
                    </Typography>
                </div>
            );
        }
    }

    fileUpload() {
        const {
            isUploadFileLoading, isFileSubmit, error, onFileUpload,
            fileName, onClickDeleteFileUpload
        } = this.props

        if (isUploadFileLoading){
            return (
                <LinearProgress />
            );
        } else if (isFileSubmit){
            return (
                <React.Fragment>
                    <Typography
                        variant="subtitle2"
                        style={ styles.errorText }
                    >
                        { error }
                    </Typography>
                    <Typography style={{ display:"flex" }}>
                        <b>{fileName}</b>
                        <HighlightOffIcon 
                            onClick={ onClickDeleteFileUpload }
                            style={ styles.highlightOffIcon }
                        />
                    </Typography>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Typography 
                        variant="subtitle2"
                        style={ styles.errorText }
                    >
                        { error }
                    </Typography>
                    <DropzoneArea
                        acceptedFiles={ ['application/pdf'] }
                        onChange={ onFileUpload }
                        dropzoneText='Arraste e Solte seu arquivo ou Clique'
                        showPreviewsInDropzone={ false }
                        showAlerts={ false }
                    />
                </React.Fragment>
            );
        }
    }

    blobUrl(blob) {
        if (!blob.url){
            blob.url = URL.createObjectURL(blob)
        }
        return blob.url
    }

    render() {

        const {
            isUploadDialogOpen, onCloseUploadDialog, file, isFileSubmit,
            onClickConfirmUploadDialog, isViewDialogOpen,
            onCloseViewFileUpload
        } = this.props

        let url = file && this.blobUrl(file)

        return(
            <React.Fragment>
                { this.switchButtonFile() }
                <Dialog
                    fullWidth={true}
                    maxWidth="sm"
                    open={isUploadDialogOpen}
                    onClose={onCloseUploadDialog}
                    aria-labelledby="max-width-dialog-title"
                    aria-describedby="max-width-dialog-description"
                >
                    <DialogTitle id="max-width-dialog-title">
                        Escolher Documento
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="max-width-dialog-description"
                        >
                            Envie-nos, em <b>formato PDF</b>, o seu 
                            histórico escolar universitário.
                        </DialogContentText>
                        { this.fileUpload() }
                        <DialogActions>
                            <Button
                                disabled={ !isFileSubmit }
                                onClick={ onClickConfirmUploadDialog }
                                color="secondary"
                            >
                                Confirmar
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullScreen
                    open={ isViewDialogOpen }
                    onClose={ onCloseViewFileUpload }
                >
                    <Box style={{ backgroundColor: "#42a0ed" }}>
                        <AppBar position="relative">
                            <Toolbar>
                                <Typography
                                    edge="end"
                                    variant="h6"
                                    style={{ flex:1 }}
                                >
                                    Histórico Escolar
                                </Typography>
                                <IconButton
                                    color="inherit" 
                                    aria-label="close"
                                    onClick={ onCloseViewFileUpload }
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <object
                        style={{height: '100vh'}}
                        data={url}
                        type="application/pdf"
                        width='100%'
                        height='100%'
                        aria-label="Histórico Escolar"
                    />
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
    errorText: {
        marginBottom: "1%",
        color: "#ff0000", // vermelho
        fontWeigth: "bold"
    },
    highlightOffIcon: {
        color:"#ff0000",
        marginLeft:"2%"
    },
    visibilityIcon: {
        color: "#5e1dad",
        marginLeft:"3%"
    },
    fileScreen: {
        width: "86%",
        marginTop: "4%",
        marginRight: "8%",
        marginLeft: "8%"
    }
}

export default FileSubmit;
