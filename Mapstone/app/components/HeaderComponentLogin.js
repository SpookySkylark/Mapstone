import { Jumbotron } from 'react-bootstrap/';

const HeaderComponent = ({className}) => {
    return (<Jumbotron><h1 className={className}>Camosun Alumni Career Map</h1></Jumbotron>);
}

export default HeaderComponent;