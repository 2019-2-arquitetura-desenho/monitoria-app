import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
        MuiThemeProvider,
        FormControl,
        InputLabel,
        Select,
        MenuItem,
        Container,
        CssBaseline,
        Grid,
        Typography,
        createMuiTheme} 
from '@material-ui/core';

class Results extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            loading: true,
            isData: false,

            studentName: '',
            matricula: '',
            points:'',
            materialList:[],
            disciplineName: '',
            material:''

            

        }
        
        this.ranking = this.ranking.bind(this);
        //this.handleChange = this.handleChange.bind(this);

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
            
            
            data.forEach(element => {
                materialList.push(element.materia);
            });
            console.log(materialList);
            this.setState({
                materialList:materialList,
                isData:true
            }
            )

        }).catch(error => {
            console.log(error);
        });
    }

    
    showData(){
        if(!this.state.isData){
            this.ranking();
            return <div>loading</div>;
        }
        else{
            return(
                <FormControl style = {{marginTop:'2%',width: "84%",marginLeft: "8%",marginRight: "8%"}}>
                                    <InputLabel id="demo-simple-select-label">Escolha a matéria</InputLabel>
                                    
                </FormControl>
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

const styles = theme => ({
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

    }
    
});

function mapStateToProps(state) {
    return {
      token: state.authentication.token,
    }
}
export const resultContainer = connect(
    mapStateToProps
)(Results);
  

export default resultContainer;
