import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MainError from './components/MainError/mainError';
import { 
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
            dataChoice:[],
        }
        
        //this.ranking = this.ranking.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                        materialList.push(element.materia);
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
                    this.setState({
                        isStudent: false,
                    });
    
                    // Requisição
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
            if(element.materia === event.target.value){
                dataChoice = element.ranking;
            }
        })

        this.setState({
            material: event.target.value,
            dataChoice: dataChoice    
        })
    }

    tableContent(count,nome,matr,pontu) {
        if(matr !== this.state.matricula){
            return (
                <TableRow key={matr}>
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
                <TableRow key={matr}>
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
            return <div>Tela professor</div>
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
