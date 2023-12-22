import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap';

function rightComponent() {
  // Inline CSS for the dropdown buttons
  const dropdownButtonStyles = {
    width: '8.75rem',
    height: '2.5rem',
    flexShrink: 0,
    borderRadius: '0.3125rem',
    border: '1px solid #D9D9D9',
    backgroundColor: 'white',
    color: 'black',
    // Add any additional styles you want here
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <div style={{ marginBottom: '20px' }}>
            <Row>
              <Col>
                <Form.Label>Report B Level</Form.Label>
              </Col>
              <Col>
                <Dropdown>
                  <Form.Control as="select" id="dropdown-starting-level" style={dropdownButtonStyles}>
                    <option>Select Level</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </Form.Control>
                </Dropdown>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Label>Unlock Limit</Form.Label>
              </Col>
              <Col>
                <Dropdown>
                  <Form.Control as="select" id="dropdown-starting-level" style={dropdownButtonStyles}>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </Form.Control>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default rightComponent;
