import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Countries from '../Countries'; // Adjust the path accordingly
import "../../styles/dashboard-content.css";

const Lvlulcfg = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLevelType, setSelectedLevelType] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleLevelTypeChange = (event) => {
    setSelectedLevelType(event.target.value);
  };

  return (
    <Form className="dataUnlckCfg-container dataUnlckCfg-container-rows my-4">
      <div className="row">
        <div className="col-4">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4" style={{ fontWeight: 700 }}>
              Country
            </Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className=""
                aria-label="Select Country"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value=""><strong>Select Country</strong></option>
                {Countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4" style={{ fontWeight: 700 }}>
              Subject
            </Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select

                aria-label="Select User Role"
              >
                <option>Select Subject</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4" style={{ fontWeight: 700 }}>
              Level Type
            </Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className=""
                aria-label="Select Level Type"
                value={selectedLevelType}
                onChange={handleLevelTypeChange}
              >
                <option>Select Level Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Lvlulcfg;
