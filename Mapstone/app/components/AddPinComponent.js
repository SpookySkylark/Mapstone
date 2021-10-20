import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Formik, useField } from 'formik';
import NewPinDisplay from '../components/MapNewPin.js';
import { useState, useRef } from 'react';
import * as yup from "yup";

import styled from 'styled-components';

const StyledButton = styled(Button)`
  color: #fff;
  background-color: #91BE37;
  border-color: #7CA12E;
  width: 15%;
  margin: 6px;
`;

const sub = styled.sub`
  color: #71716f;
  margin: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .min(2, 'Your title must be at least ${min} characters.')
      .max(30, 'Your title must be no more than ${max} characters')
      .required('A title is required.'),
    description: yup
      .string()
      .trim()
      .min(2, 'Your description must be at least ${min} characters.')
      .max(512, 'Your description must be no more than ${max} characters')
      .required('A description is required.')
});

const AddPinComponent = ({ addNewPin, toggleAddPin}) => {
  const [ defaultPos, setDefaultPos] = useState({ lat: 0.0,  lng: 0.0});
  const applyClicked = (x, y) => {
    setDefaultPos({ lat: x,  lng: y});
  }
  const handleFormData = ( values, { restForm, setSubmitting }) => {
      if(defaultPos.lat != 0 && defaultPos.lat != 0) {
        values.lat = defaultPos.lat;
        values.lng = defaultPos.lng;
        addNewPin(values);
        //restForm();
        setSubmitting(false);
      }
  }
  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Add a Your Career:</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={handleFormData}
            initialValues={{ title: '', position: {}, description: ''}}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Form.Group as={Col} md={12} controlId="title">
                    <Form.Label>Name of Location:</Form.Label>
                    <Form.Control
                      placeholder="Place of Work"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.title && !errors.title}
                      isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.messageText}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={12} controlId="description">
                    <Form.Label>Describe your Work:</Form.Label>
                    <Form.Control
                      placeholder="Description of Work"
                      as="textarea"
                      rows="6"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.description && !errors.description}
                      isInvalid={touched.description && errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.messageText}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="lat">
                    <Form.Label>Latitude: </Form.Label>
                    <Form.Control
                      valuedefault={0.0}
                      value={defaultPos.lat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lat && !errors.lat}
                      isInvalid={touched.lat && errors.lat}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.messageText}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="lng">
                    <Form.Label>Longitude: </Form.Label>
                    <Form.Control
                      valuedefault={0.0}
                      value={defaultPos.lng}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lng && !errors.lng}
                      isInvalid={touched.lng && errors.lng}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.messageText}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col>
                    <ButtonContainer><p /><sub>Quickly set location by clicking the map below!</sub></ButtonContainer>
                    <ButtonContainer>
                      <StyledButton variant="primary" type="submit" className="mt-3">
                        Submit
                      </StyledButton>
                    </ButtonContainer>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      <ButtonContainer> <StyledButton onClick={toggleAddPin}> Cancel </StyledButton> </ButtonContainer>
      <Row> <Col style={{width: '100%', height: '720px'}}> <NewPinDisplay applyClicked={applyClicked}/> </Col> </Row>
    </div>
    );
}

export default AddPinComponent;