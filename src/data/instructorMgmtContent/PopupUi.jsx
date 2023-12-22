import { useState, useEffect } from "react";
import "../../styles/dashboard-content.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { protectedApi } from "../../authConfig";
import CustomSelect from "../../components/CustomSelect";
import { toast } from "react-hot-toast";

import useApiRequest from "../../hooks/useApiRequest";

const PopupUi = ({ onSubmit, onCancel, updateData,  }) => {

    const {makeApiRequest, fetchCenterData, fetchCountryData} = useApiRequest();

    const validateForm = () => {
        return (
            email.length > 6 &&
            password.length > 7
        )
    }

    const [centerList, setCenterList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [filteredCenter, setFilteredCenter] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [centerNameList, setCenterNameList] = useState([]);

    console.log(filteredCenter.length > 0);
    console.log(filteredCenter);
    console.log(centerNameList);

    const settingCountry = (e) => {
        setCountry(e.target.value);
        setCenterNameList([]);
        fetchCenterData().then((data) => setCenterList(data));
    }

    const handleSubmit = async (event) => {
        
        event.preventDefault();

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
                roleName: "Instructor",
                addedBy: "1",
                centerNameList
            };

            onSubmit();
            console.log(userData);

            try {
                await makeApiRequest({
                    url: `${protectedApi.api.endpoint}/users`,
                    method: 'post',
                    data: userData
                })

                await updateData();
                toast.success("Successfully added new Instructor");
            } catch(err) {
                console.log('Error in adding new Instructor', err);
            }
    }



    useEffect(() => {
        if (countryList.length === 0) {
           fetchCountryData().then((data) => setCountryList(data));
        }

        if (centerList.length > 0) {
            const centerIndv = centerList.filter((center) => center.countryName === country);
            setFilteredCenter(centerIndv);
            setCenterNameList([centerIndv[0].centerName]);
        }

    }, [countryList, centerList]);

    return (
        <Form onSubmit={handleSubmit} className="notif-container notif-container-rows my-4" >
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">First Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-firstname"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />

                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Last Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-lastname"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Password</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />

                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Email</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />

                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Date of Birth</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-dob"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Contact No.</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-contactno"
                                type="text"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Street Address</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-streetaddress"
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">State Province</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-stateprovince"
                                type="text"
                                value={stateProvince}
                                onChange={(e) => setStateProvince(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">City</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Country</Form.Label>
                        <div className="my-0 py-0 col-8">
                            {countryList.length > 0 ? (
                                <Form.Select id="addinstructor-select-country" className="notif-formselect" aria-label="Select Country" onChange={(e) => settingCountry(e)}>
                                    <option>Select Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.countryName}>{country.countryName}</option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled id="addinstructor-select-country" className="notif-formselect" aria-label="Select Country">
                                    <option>Select Country</option>
                                </Form.Select>
                            )}
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Zip Code</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addinstructor-zipcode"
                                type="number"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />

                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Center Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            {filteredCenter.length > 0 ? (
                                <CustomSelect multiple={true} options={filteredCenter} value={centerNameList} onChange={o => setCenterNameList(o)}/>
                            ) : (
                                <Form.Select disabled id="addparent-select-center" className="notif-formselect" aria-label="Select Center">
                                    <option>Select Center</option>
                                </Form.Select>
                            )}
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-row justify-content-center column-gap-5 ">
                        <Button id="addinstructor-submitbutton" disabled={!validateForm()} className="custom-btn" type="submit">
                            Submit
                        </Button>
                        <Button id="addinstructor-cancelbutton" className="custom-btn-cancel" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default PopupUi;