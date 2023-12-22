import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { protectedApi } from "../authConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [centerName, setCenterName] = useState('');
  const [addedBy, setAddedBy] = useState('');

  const [countries, setCountries] = useState([]);
  const [centers, setCenters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${protectedApi.api.endpoint}/public/country`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.countryName === country);
      if (selectedCountry) {
        const countryId = selectedCountry.sNo;
        axios.get(`${protectedApi.api.endpoint}/public/center/${countryId}`)
          .then((centerResponse) => setCenters(centerResponse.data))
          .catch((centerError) => console.error("Error fetching centers:", centerError));
      }
    }
  }, [country, countries]);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        city,
        country,
        stateProvince,
        streetAddress,
        dateOfBirth,
        contactNumber,
        zipCode,
        centerName,
        roleName: "Parent",
        addedBy,
      };

      // console.log(userData);
  
      const response = await axios.post(`${protectedApi.api.endpoint}/public/userRegister`, userData);
      
      console.log(response);
      console.log("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Registration">
      <div className="form-container">
        <Form>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            id="register-fname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            id="register-lname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            id="register-dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <Form.Label>Contact Number:</Form.Label>
          <Form.Control
            id="register-contact"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Control
            id="register-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Form.Label>Country:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="country-dropdown">
              {country || "Select Country"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {countries.map((countryOption) => (
                <Dropdown.Item
                  key={countryOption.sNo}
                  onClick={() => {
                    setCountry(countryOption.countryName);
                    setCenterName('');
                  }}
                >
                  {countryOption.countryName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label>Center:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="center-dropdown">
              {centerName || "Select Center"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {centers.map((centerOption) => (
                <Dropdown.Item
                  key={centerOption.centerId}
                  onClick={() => setCenterName(centerOption.centerName)}
                >
                  {centerOption.centerName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label>State/Province:</Form.Label>
          <Form.Control
            id="register-stateprovince"
            type="text"
            value={stateProvince}
            onChange={(e) => setStateProvince(e.target.value)}
          />
          <Form.Label>City:</Form.Label>
          <Form.Control
            id="register-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Form.Label>Street Address:</Form.Label>
          <Form.Control
            id="register-streetaddress"
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control
            id="register-zipcode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          {/* <Form.Label>Role: Parent</Form.Label> */}
          <Form.Label>Added By:</Form.Label>
          <Form.Control
            id="register-addedby"
            type="text"
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
          />
          <Button id="register-submit-btn" disabled={!validateForm()} type="submit" onClick={handleRegistration}>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
