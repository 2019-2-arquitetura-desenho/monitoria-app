import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MainError from './components/MainError/mainError';
import SubmitButton from './components/SubmitButton/submitButton';
 
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText, 
    MuiThemeProvider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CssBaseline,
    Grid,
    Typography,
    createMuiTheme,
    Paper,
    Table,    
    TableHead,
    TableRow,
    TableCell,    
    TableBody,
    Button,
} from '@material-ui/core';

import {
    getProfile,
    restartGetProfile
} from '../store/actions';



const host_api = process.env.REACT_APP_URL_API;

class Results extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            isStudent: undefined,

            isRanked: undefined,
            matricula: '',
            materialList: [],
            dataTables: [],

            material:'',
            inscrito:'',
            dataChoice:[],
            nota:'',
            listaNotas:[0,1,2,3,4,5],

            isDialogConfirmOpen: false
        }
        
        //this.ranking = this.ranking.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInscrito = this.handleChangeInscrito.bind(this);
        this.handleChangeNota = this.handleChangeNota.bind(this);
        this.onSubmitConfirm = this.onSubmitConfirm.bind(this);
        this.onCloseDialogConfirm = this.onCloseDialogConfirm.bind(this);
    }

    componentDidMount() {
        axios.post(
            host_api + '/get_student/',
            {
                token: this.props.token
            },
        ).then(response => {
            const matricula = response.data.matricula;

            axios.post(
                'http://localhost:2000/home',
                // host_api, '/get_rankings',
                {
                    token: this.props.token
                }
            ).then(response => {
                const data = response.data.data;
                
                var materialList = [];
                
                if(data.length === 0){
                    this.setState({
                        isRanked: false
                    });
                } else {
                    data.forEach(element => {
                        materialList.push(element.materia + ' - ' + element.turma);
                    });
                    
                    this.setState({
                        matricula: matricula,
                        materialList: materialList,
                        dataTables: data,
                        isStudent: true,
                        isRanked: true
                    });
                }
            }).catch(error => {
                console.log(error)

                this.setState({
                    mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
                })
            });

        }).catch(error => {
            console.log(error);

            this.props.getProfile(this.props.token);
            if (this.props.profileData){
                if (this.props.profileData.is_professor){
                    // Requisição
                    axios.post(
                        'http://localhost:9000/home',
                        // host_api, '/get_rankings',
                        {
                            token: this.props.token
                        }
                    ).then(response => {
                        const data = response.data.data;

                        var materialList = [];

                         
                        data.forEach(element => {
                            materialList.push(element.materia + ' - ' + element.turma);
                        });

                        this.setState({
                            materialList: materialList,
                            dataTables: data,
                            isStudent: false,
                        });
                        
                    }).catch(error => {
                        console.log(error)

                        this.setState({
                            mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
                        })
                    });
                } else {
                    this.setState({
                        mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
                    });
                }
            }
        });
    }

    componentDidUpdate() {
        if (this.props.requisitionError !== undefined) {
            this.props.restartGetProfile();

            this.setState({
                mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
            });
        }
    }


    handleChange(event) {
        let dataChoice = []
        this.state.dataTables.forEach(element =>{
            if((element.materia + ' - ' + element.turma) === event.target.value){
                if(this.state.isStudent === true){
                    dataChoice = element.ranking;
                }
                else{
                    dataChoice = element.inscritos;
                }
            }
        })

        this.setState({
            material: event.target.value,
            dataChoice: dataChoice    
        })
    }

    handleChangeInscrito(event){
        
        this.setState({
            inscrito: event.target.value
        })
    }
    handleChangeNota(event){

        this.setState({
            nota:event.target.value
        })
    }

    tableContent(count,nome,matr,pontu) {
        if(matr !== this.state.matricula){
            return (
                <TableRow key={count}>
                    <TableCell align="center" scope="row">
                        {count++}
                    </TableCell>
                    <TableCell align="center">{matr}</TableCell>
                    <TableCell align="center">{nome}</TableCell>
                    <TableCell align="center">{pontu}</TableCell>
                </TableRow>
            );
        }
        else {
            return (
                <TableRow key={count}>
                    <TableCell align="center" scope="row">
                        <b>{count++}</b>
                    </TableCell>
                    <TableCell align="center"><b>{matr}</b></TableCell>
                    <TableCell align="center" ><b>{nome}</b></TableCell>
                    <TableCell align="center"><b>{pontu}</b></TableCell>
                </TableRow>
            );
        }
    }


    onCloseDialogConfirm(){

        this.setState({
            isDialogConfirmOpen:false
        })
    }

    onSubmitConfirm(){
        
        this.setState({
            isDialogConfirmOpen:true
        });

    }

    confirmButton(){
        if(this.state.nota !==''){
            
            return (
                <SubmitButton
                onClickSubmitButton = {this.onSubmitConfirm}
                buttonColor='secondary'
                titleButton = 'Confirmar'
                ></SubmitButton>
            )
        }
        else{
            return <div></div>
        }
    }
    selectGrade(){
        if(this.state.inscrito !==''){
            return(
                <FormControl style={{ marginTop: '2%', width: "84%", marginLeft: "8%", marginRight: "8%" }}>
                    <InputLabel id="demo-simple-select-label">Escolha a nota</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.nota}
                        onChange={this.handleChangeNota}
                    >
                        {this.state.listaNotas.map((element) => {
                            return <MenuItem value={element}>
                                {element}
                            </MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            )
        }
        else{
            return <div></div>
        }
    }

    selectStudent(){
        if(this.state.material!==''){
            return (
                <FormControl style={{ marginTop: '2%', width: "84%", marginLeft: "8%", marginRight: "8%" }}>
                    <InputLabel id="demo-simple-select-label">Escolha o aluno</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.inscrito}
                        onChange={this.handleChangeInscrito}
                    >
                        {this.state.dataChoice.map((element) => {
                            return <MenuItem value= {element[0] + ' - ' + element[1]}>
                                {element[0]} - {element[1]}
                            </MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
                )
        }
        else{
            return <div></div>
        }
    }
    
    showData() {
        if (this.state.isStudent === true){
            if (!this.state.isRanked) {
                return (
                    <h2 style={{color:"#141414", textAlign: "center", marginTop: "4%"}}>
                        Ops... Você não se inscreveu em nenhuma monitoria.
                    </h2>
                );
            } else {
                var count=0;
                return (
                    <React.Fragment>
                        <FormControl style = {{marginTop:'2%', width: "84%", marginLeft: "8%", marginRight: "8%"}}>
                            <InputLabel id="demo-simple-select-label">Escolha a matéria</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.material}
                                onChange={this.handleChange}
                                
                            >   
                                {this.state.materialList.map((element)=>{
                                    return  <MenuItem value = {element}>
                                                {element}
                                            </MenuItem>
                                })
                                }
                            </Select>
                        </FormControl>
                        <Paper style = {{marginTop:'1%', marginBottom:'2%', width: "84%", marginLeft: "8%", marginRight: "8%"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Posição</TableCell>
                                        <TableCell align="center">Matrícula</TableCell>
                                        <TableCell align="center">Nome</TableCell>
                                        <TableCell align="center">Pontuação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.dataChoice.map(element => (
                                        count++,
                                        this.tableContent(count, element[0],element[1],element[2])
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </React.Fragment>
                );
            }
            
        } else if (this.state.isStudent === false){
            //tela professor
            
            return (
                <React.Fragment>
                    <FormControl style={{ marginTop: '2%', width: "84%", marginLeft: "8%", marginRight: "8%" }}>
                        <InputLabel id="demo-simple-select-label">Escolha a matéria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.material}
                            onChange={this.handleChange}
                        >
                            {this.state.materialList.map((element) => {
                                return <MenuItem value={element}>
                                    {element}
                                </MenuItem>
                            })
                            }
                        </Select>
                        
                    </FormControl>
                    {this.selectStudent()}
                    {this.selectGrade()}
                    {this.confirmButton()}
                    <Dialog
                        fullWidth={true}
                        maxWidth="sm"
                        open={this.state.isDialogConfirmOpen}
                        onClose={this.onCloseDialogConfirm}
                        aria-labelledby="max-width-dialog-title"
                        aria-describedby="max-width-dialog-description"
                    >
                        <DialogTitle id="max-width-dialog-title">
                            Confirmar Indicação
                                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="max-width-dialog-description"
                            >   
                                <b>Atenção! Essa indicação é irreversível.</b><br></br>
                                Disciplina: {this.state.material}<br></br>
                                Aluno: {this.state.inscrito}<br></br>
                                Nota: {this.state.nota}<br></br>
                            </DialogContentText>

                            <DialogActions>
                                <Button
                                    onClick={this.onCloseDialogConfirm}
                                    color="primary"
                                >
                                    Cancelar
                                            </Button>

                                <Button
                                    onClick={this.onClickConfirm}
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
            return <div></div>
        }
    }


    render() {
        return (
            <MuiThemeProvider theme = {theme}>
                <CssBaseline/>
                <Grid container style = {{justifyContent: "center", alignItems: "center", height: "90vh"}}>
                    <Typography component = 'div' style = {{width: "92%", marginTop: "1%", marginBottom: "1%", backgroundColor: "#ffffff", minHeight: "85%"}}>
                        <Grid container spacing = {1}>
                            <Grid item xs = {12}>
                                <div styles={{display: "flex", justifyContent: "center", width: "100%"}}>
                                    <MainError error={this.state.mainError} />
                                </div>
                                {this.showData()}
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>  
            </MuiThemeProvider>
        );
    }
}

const theme = createMuiTheme({
    palette: {
        background: {
        default: "#ffffff"
        },
        primary: {
        main: "#42a0ed",
        contrastText: "white"
        },
        secondary: {
        main: "#267cc1"
        }
    }
});

function mapStateToProps(state) {
    return {
      token: state.authentication.token,
      profileData: state.userProfile.profileData
    }
}

export const resultContainer = connect(
    mapStateToProps,
    { restartGetProfile, getProfile }
)(Results);  

export default resultContainer;
