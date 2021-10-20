import { Jumbotron } from 'react-bootstrap/';
import styled from 'styled-components';

//import logo from '../img/camosun-logo-white-480w.png';

const StyledH1 = styled.h1`
  float: right;
  font-size: 24px;
  font-weight: 300;
`;

const HeaderComponent = ({className}) => {
    return (<Jumbotron className={className}><StyledH1>Camosun Alumni Career Map</StyledH1> </Jumbotron>);
}

export default HeaderComponent;