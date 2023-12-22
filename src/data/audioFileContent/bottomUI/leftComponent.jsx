import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap';

function LeftComponent() {
  // Inline CSS for the dropdown buttons
  const dropdownButtonStyles = {
    width: '8.75rem', // Width
    height: '2.5rem', // Height
    flexShrink: 0, // Flex shrink
    borderRadius: '0.3125rem', // Border radius
    border: '1px solid #D9D9D9', // Border style
    backgroundColor: 'white', // Background color
    color: 'black', // Text color
    // Add any additional styles you want here
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          {/* First Column */}
          <div style={{ marginBottom: '20px' }}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Form.Label>Starting Level</Form.Label>
                  </Col>
                  <Col>
                    <Dropdown>                  
                        <Form.Control as="select" id="dropdown-starting-level"  style={dropdownButtonStyles}>
                          <option>Select Level</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </Form.Control>          
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br /> {/* Add a line break here */}
            <Row>
              <Col>
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
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LeftComponent;
