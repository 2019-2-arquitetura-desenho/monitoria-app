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
import { ReactComponent as WarningIcon } from '../../assets/warning.svg';
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

function ConfirmationDialog({
  classes, isOpen, handleClose, title, description,
  type, handleConfirmNextPath,
}) {

  const renderStatusIcon = () => {
    if (type === "success")
      return <CheckedIcon width={50} height={50} />;
    else if (type === "warning")
      return <WarningIcon width={50} height={50} />;
    else
      return <div></div>
  }

  const renderConfirmButton = () => {
    if (type === "success")
      return (
        <CardButton
          titleButton="Acessar Ranking"
          buttonColor="secondary"
          onClickSubmitButton={handleConfirmNextPath}
        />
      );
    else
      return (
        <div></div>
      );
  }

  return (
    <div >
      <Dialog classes={{ paper: classes.dialogPaper }}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center"
          classes={{ root: classes.title }}>
          <Typography component='div' className={classes.flexRowBetween}>
            {renderStatusIcon()}
            <Typography variant="h6" className={classes.flexColumnCenter}>
              {title}
            </Typography>
            <Button onClick={handleClose}>
              <CancelIcon width={30} height={30} />
            </Button>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align="center" color="primary">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Box width="50" alignSelf="center">
            {renderConfirmButton()}
          </Box>
        </DialogActions>
      </Dialog>
    </div >
  );
}


export default withStyles(styles)(ConfirmationDialog);