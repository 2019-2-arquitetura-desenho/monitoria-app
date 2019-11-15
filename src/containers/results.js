import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
        MuiThemeProvider,
        FormControl,
        InputLabel,
        Select,
        MenuItem,
        CircularProgress,
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
    } 
from '@material-ui/core';

class Results extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            loading: true,
            isData: false,

            materialList:[],
            material:'',
            isRanked: true,

            dataTables:[],
            dataChoice:[],
            
            

        }
        
        this.ranking = this.ranking.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event){
        let dataChoice = []
        this.state.dataTables.forEach(element =>{
            if(element.materia === event.target.value){
                dataChoice = element.ranking;
            }
        })
        this.setState({
            material:event.target.value,
            dataChoice:dataChoice    
        })
    }

    ranking() {
        

        axios.post(
            'http://localhost:8000/home',
            {
            // document: document
            }
        ).then(response => {

            console.log(response);
            const data = response.data.data;
            
            var materialList = []; 
            
            if(data.length === 0){
                this.setState({
                    isRanked:false
                })
            }
            data.forEach(element => {
                materialList.push(element.materia);
            });

            console.log(materialList);
            this.setState({
                materialList:materialList,
                isData:true,
                dataTables:data
            }
            )

        }).catch(error => {
            console.log(error);
        });
    }

    
    showData(){
        if(!this.state.isData){
            this.ranking();
            return (
               
                    <div style={styles.progress}>
                        <CircularProgress color="secondary" />
                    </div>
                
            );
        }
        else if(!this.state.isRanked){
            return <div>To com sono</div>
        }
        else{
            var count = 1;
            return(
                <React.Fragment>
                    <FormControl style = {{marginTop:'2%',width: "84%",marginLeft: "8%",marginRight: "8%"}}>
                        <InputLabel id="demo-simple-select-label">Escolha a matéria</InputLabel>
                        <Select 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.material}
                            onChange={this.handleChange}
                            
                        >   
                            {this.state.materialList.map((element)=>{
                                return <MenuItem value = {element}>
                                    {element}
                                </MenuItem>
                            })
                            }
                        </Select>
                    </FormControl>
                    <Paper style = {{marginTop:'1%',marginBottom:'2%',width: "84%",marginLeft: "8%",marginRight: "8%"}}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell align="center">posicao</TableCell>
                            <TableCell align="center">nome</TableCell>
                            <TableCell align="center">matrícula</TableCell>
                            <TableCell align="center">pontuação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {this.state.dataChoice.map(element => (
                            <TableRow key={element[1]}>
                                <TableCell align = "center" scope="row">
                                    {count++}
                                </TableCell>
                                <TableCell align ="center" >{element[0]}</TableCell>
                                <TableCell align="center">{element[1]}</TableCell>
                                <TableCell align="center">{element[2]}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </Paper>
                </React.Fragment>
            )
        }
    }


    render() {
        const { classes } = this.props
        
        
        return (
            <MuiThemeProvider theme = {theme}>
                <CssBaseline/>
                <Grid container style = {{justifyContent: "center",alignItems: "center",height: "90vh"}}>
                    <Typography component = 'div' style = {{width: "92%",marginTop: "1%",marginBottom: "1%",backgroundColor: "#ffffff",minHeight: "85%"}}>
                        <Grid container spacing = {1}>
                            <Grid item xs = {12}>
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
        default: "#42a0ed"
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

const styles = {
    root: {
        backgroundColor: '#42a0ed',
        height: '100vh',
        paddingTop: theme.spacing(3),
    },
   
    select:{
        marginLeft: '8%',
        marginRight: '36%',
        height: '100%',
        width: '100%',

    },
    progress:{
        textAlign: "center", 
        marginRight:"8%",
        marginLeft:"8%",
        marginTop:"20%",
        marginBottom:"20%"
       
        
    }
};

function mapStateToProps(state) {
    return {
      token: state.authentication.token,
    }
}
export const resultContainer = connect(
    mapStateToProps
)(Results);
  

export default resultContainer;
