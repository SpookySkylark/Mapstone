import HeaderComponent from '../components/HeaderComponent.js';
import LoginComponent from '../components/LoginComponent.js';
import FooterComponent from '../components/FooterComponent.js';
import AddPinComponent from '../components/AddPinComponent.js';
import AdminTableComponent from '../components/AdminTableComponent.js';
import RegisterUserComponent from '../components/RegisterUserComponent.js';
import MapDisplay from '../components/MapDisplay.js';
import ky from 'ky-universal';
import {Container, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';

const StyledButton = styled(Button)`
  color: #fff;
  background-color: #91BE37;
  border-color: #7CA12E;
  width: 15%;
  margin: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled(HeaderComponent)`
  width: 100%;
  border-width: 4px 0 0 0;
  border-color: #7CA12E;
  border-style: solid;
  background-color: #91BE37;
  color: #FFFFFF;
  height: 80px;
  line-height: 80px;
`;


export async function getStaticProps() {
    let jsonData
    try {
      jsonData = await ky(`${process.env.NEXT_PUBLIC_HOST}/api/pins`).json();
    } catch (err) {
      console.log('API Error: ' + err);
    }
    //console.log(jsonData);
    return {
      props: {
        jsonData
      }
    }
} 


export default function Home({jsonData}) {
  const [ UserAuth, setUserAuth] = useState(false);
  const [ addPins, setAddPins] = useState(false);
  const [ adminPage, setAdminPanel] = useState(false);
  const [ registerPage, setRegisterPage] = useState(false);
  const usernameRef = useRef(null);
  const adminRef = useRef(false);
  var api = process.env.REACT_APP_GOOGLE_API;
  const logInUser = async (values) => {
    try {
        const response = await ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {json: values}).json();
        const decodedTokenPayload = jwt_decode(response.token);
        usernameRef.current = decodedTokenPayload.username;
        adminRef.current = decodedTokenPayload.admin;
        setUserAuth(true);
        sessionStorage.setItem('token', response.token);
    } catch(err) {
        console.log("Login API Error: " + err);
    }
  };
  const addNewPin = async (values) => {
    try {
        values.name = usernameRef.current;
        /* values.position = new Map([
          [values.lat], [values.lang]
        ]); */
        //locationarr = [values.lat, values.lang]
        values.position = { lat: values.lat,  lng: values.lng };
        console.log("New Pin: " + values);
        const pin = await ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/pins`, {json: values, headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} }).json();
        //window.location.reload();
        setAddPins(false);
    } catch(err) {
        console.log("API Error: " + err);
    }
  };
  const registerNewUser = async (values) => {
    try {
        values.admin = false;
        console.log("New Pin: " + values);
        const pin = await ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/register`, {json: values}).json();
        //window.location.reload();
        setAddPins(false);
    } catch(err) {
        console.log("API Error: " + err);
    }
  };
  const removePin = async (id) => {
    try {
        const pin = await ky.delete(`${process.env.NEXT_PUBLIC_HOST}/api/pins/${id}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} }).json();
    } catch(err) {
        console.log("API Error: " + err);
    }
  };
  const toggleAddPin = () => {
      setAddPins(!addPins);
  }
  const toggleAdminPanel = () => {
    if(adminRef) setAdminPanel(!adminPage);
  }
  const toggleRegisterPanel = () => {
    setRegisterPage(!registerPage);
  }
  if(UserAuth) {
    return (
      <>
      <StyledHeader/>
      <Container>
        {addPins 
          ? (<div><Row> <Col> <AddPinComponent addNewPin={addNewPin} toggleAddPin={toggleAddPin} /> </Col> </Row></div>)
          : (<div><ButtonContainer><StyledButton onClick={ ()=> {toggleAddPin();} }> Add a Pin </StyledButton></ButtonContainer>
          {adminRef.current 
            ? (<div>
              {adminPage 
                ? (<div><Row> <Col> <AdminTableComponent jsonData={jsonData} removePin={removePin}/> </Col> </Row>
                  <ButtonContainer><StyledButton onClick={ ()=> {toggleAdminPanel();} }> Cancel </StyledButton></ButtonContainer></div>)
                : (<ButtonContainer><StyledButton onClick={ ()=> {toggleAdminPanel();} }> Admin Panel </StyledButton></ButtonContainer>)}
              </div>)
            : (<div></div>)
          } 
          <Row> <Col style={{width: '100%', height: '720px'}}> <MapDisplay style="width: 100%; height: 300px;" jsonData={jsonData} /> </Col> </Row></div>)}
      </Container>
      </>
      )
  } else {
    return (
      <>
      <StyledHeader/>
      <Container>
        {!registerPage
              ? (<div>
                <Row> <Col> <LoginComponent logInUser={logInUser}/> </Col> </Row>
                <ButtonContainer><StyledButton onClick={ ()=> {toggleRegisterPanel();} }> Register </StyledButton></ButtonContainer>
                </div>)
              : (<div>
                <Row> <Col> <RegisterUserComponent registerNewUser={registerNewUser}/> </Col> </Row>
                <ButtonContainer><StyledButton onClick={ ()=> {toggleRegisterPanel();} }> Cancel </StyledButton></ButtonContainer>
                </div>)
        }
        <div>
          <Row> <Col style={{width: '100%', height: '720px'}}> <MapDisplay jsonData={jsonData} /> </Col> </Row>
        </div>
      </Container>
      </>
      )
  }

  
  
} 

//FOR ADMIN TABLE
/* {adminRef.current 
          ? (<div>
            {adminPage 
              ? (<div><Row> <Col> <AdminTableComponent addNewPin={addNewPin}/> </Col> </Row>
                <Button onClick={ ()=> {toggleAdminPanel();} }> Cancel </Button></div>)
              : (<Button onClick={ ()=> {toggleAdminPanel();} }> Admin Panel </Button>)}
            </div>)
          : (<div></div>)
        } 
*/