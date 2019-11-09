import React from 'react';
import { connect } from 'react-redux';

import { Card, CardContent, Typography} from '@material-ui/core';

import Menu from './components/NavigationMenu/navigationMenu';
import { logout } from '../store/actions';


class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {}

        this.onPressLogoutButton = this.onPressLogoutButton.bind(this);
    }

    onPressLogoutButton(){
        this.props.logout();
    }

    content() {
        const { userData } = this.props

        if (userData.profile.user.is_superuser){
            return (
                <div>Professor</div>
            );
        } else {
            return (
                <React.Fragment>
                    <div style = {styles.topic}>
                        <h2><b>Datas Importantes</b></h2>
                    </div>
                    <Card style={ styles.card }>
                        <CardContent>
                            <Typography variant="h5">
                                - Início do período de inscrição: <b>20/08/2019</b><br></br>
                                - Término do período de inscrição: <b>26/08/2019</b>
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style = {styles.topic}>
                        <h2><b>Requerimentos para Monitoria</b></h2>
                    </div>
                    <Card style={ styles.card }>
                        <CardContent>
                            <Typography variant="h5">
                                1) Ser aluno regularmente matriculado em curso de graduação da Universidade;<br></br>
                                2) Ter obtido aprovação na disciplina na qual pleiteia a monitoria, demonstrando domínio da mesma;<br></br>
                                3) Ter disponibilidade de tempo para atender às atividades programadas;<br></br>
                                4) Não estar usufruindo de qualquer outro tipo de bolsa remunerada oferecida pela Universidade; (para monitores remunerados)<br></br>
                                5) Os alunos deverão estar matriculados no número mínimo de créditos do seu curso, com exceção dos candidatos:<br></br>
                                <Typography variant="h5" style = {{marginLeft : "2%"}}>
                                    5.1) Os bolsistas externos de pesquisa e ensino, dos Programas CAPES e CNPq, exclusivamente no caso de monitoria não remunerada, e de Mestrado e Doutorado;<br></br>
                                    5.2) Os alunos de outras universidades nacionais ou estrangeiras, em caráter excepcional e na monitoria não remunerada, somente durante o tempo de permanência na UnB e em virtude de convênios que assim o permitam.<br></br>
                                </Typography>
                                6) Para efeito de seleção e exercício da monitoria, os alunos deverão estar matriculados no número mínimo de créditos do seu curso.<br></br>
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style = {styles.topic}>
                        <h2><b>Cálculo</b></h2>
                    </div>
                    <Card style={styles.card}>
                        <CardContent>
                            <Typography variant="h5">
                                Nota Final com recomendação = 0.3A1 + 0.2A2 + 0.5A3<br></br>
                                Nota Final sem recomendação = 0.6A1 +0.4A2<br></br>
                                Em que:<br></br>
                                <Typography variant="h5" style = {{marginLeft : "3%"}}>
                                    A1 = Menção(SS=5,MS=4,MM=3)<br></br>
                                    A2 = IRA<br></br>
                                    A3 = Avaliação do professor(carta de referência)<br></br>
                                    0 &le; A1,A2,A3 &le; 5<br></br>
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={ styles.screen }>
                    <Menu position={0} onPressLogoutButton={ this.onPressLogoutButton }/>
                    { this.content() }
                </div>
            </React.Fragment>
        );
    }
}

const styles = {
    screen: {
        backgroundColor: "#eeeeee"
    },
    topic: {
        marginTop: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        color: "#141414"
    },
    card: {
        marginTop: "1%",
        marginLeft: "2%",
        marginRight: "2%",
        marginBottom: "2%",
        color: "white",
        backgroundColor: "#267cc1",
        boxShadow: "1px 1px 10px 2px #141414"
    }
}

function mapStateToProps(state) {
    return {
        userData: state.authentication.userData
    }
}

export const homeContainer = connect(
    mapStateToProps,
    { logout }
)(Home)

export default homeContainer;