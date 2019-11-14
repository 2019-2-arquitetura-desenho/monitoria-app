import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  Box
} from '@material-ui/core';

import { ReactComponent as CheckedIcon } from '../../assets/checked.svg';
import { ReactComponent as CancelIcon } from '../../assets/cancel.svg';
import CardButton from '../CardButton/cardButton';

const styles = {
  dialogPaper: {
    height: 250,
    width: 400,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#267CC1'
  },
  title: {
    color: '#267CC1',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
}




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmationDialog({ classes }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button color="secondary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog classes={{ paper: classes.dialogPaper }}
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center"
          classes={{ root: classes.title }}>
          <Typography component='div' className={classes.flexRowBetween}>
            <CheckedIcon width={50} height={50} />
            <Typography variant="h6" className={classes.flexColumnCenter}>
              Sucesso
            </Typography>
            <CancelIcon width={30} height={30} />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align="center" color="primary">
            Você foi inscrito na seleção para a monitoria de
              DESENHO INDUSTRIAL ASSISTIDO POR COMPUTADOR tuma B
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Box width="50" alignSelf="center">
            <CardButton
              titleButton="Acessar Ranking"
              buttonColor="secondary"
            // onClickSubmitButton={}
            />
          </Box>
        </DialogActions>
      </Dialog>
    </div >
  );
}


export default withStyles(styles)(ConfirmationDialog);