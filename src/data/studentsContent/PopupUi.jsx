import { useState, useEffect } from "react";
import "../../styles/dashboard-content.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { protectedApi } from "../../authConfig";
import { toast } from "react-hot-toast";
import useApiRequest from "../../hooks/useApiRequest";

const PopupUi = ({ onSubmit, onCancel, updateData, }) => {


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
    const [centerParentsList, setCenterParentsList] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [centerName, setCenterName] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [grade, setGrade] = useState('');

    const settingCountry = (e) => {
        setCountry(e.target.value);
        fetchCenterData().then((data) => setCenterList(data));
    }

    const settingCenter = (e) => {
        setCenterName(e.target.value);
        console.log("You chose ", e.target.value);
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
                roleName: "Student",
                addedBy: "1",
                centerName,
                guardianName,
                grade
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
                toast.success("Successfully added new Student");
            } catch(err) {
                console.log('Error in adding new Instructor', err);
            }
    }

    const fetchCenterParents = async (centerParent) => {

        try {
            const centerParentsResponse = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/center/${centerParent.sNo}/parents`,
                method: 'get',
            })

            setCenterParentsList(centerParentsResponse.data);
        } catch(err) {
            console.log('Error in adding new Instructor', err);
        }

    }

    useEffect(() => {
        fetchCountryData().then((data) => setCountryList(data));
    }, []);

    useEffect(() => {

        if (centerList.length > 0) {
            const centerIndv = centerList.filter((center) => center.countryName === country);
            setFilteredCenter(centerIndv);
        }

        if (centerName.length > 0) {
            const centerParent = filteredCenter.filter((fCenter) => fCenter.centerName === centerName);
            fetchCenterParents(centerParent[0]);
        }

    }, [centerList, centerName]);

    return (
        <Form onSubmit={handleSubmit} className="notif-container notif-container-rows my-4" >
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">First Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addstudent-firstname"
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
                                id="addstudent-lastname"
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
                                id="addstudent-password"
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
                                id="addstudent-email"
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
                                id="addstudent-dob"
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
                                id="addstudent-contactno"
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
                                id="addstudent-streetaddress"
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
                                id="addstudent-stateprovince"
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
                                id="addstudent-city"
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
                                <Form.Select id="addstudent-select-country" className="notif-formselect" aria-label="Select Country" onChange={(e) => settingCountry(e)}>
                                    <option>Select Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.countryName}>{country.countryName}</option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled id="addstudent-select-country" className="notif-formselect" aria-label="Select Country">
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
                                id="addstudent-zipcode"
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
                                <Form.Select id="addstudent-select-center" className="notif-formselect" aria-label="Select Center" onChange={(e) => settingCenter(e)}>
                                    <option>Select Center</option>
                                    {filteredCenter.map((center, index) => (
                                        <option key={index} value={center.centerName}>{center.centerName}</option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled id="addstudent-select-center" className="notif-formselect" aria-label="Select Center">
                                    <option>Select Center</option>
                                </Form.Select>
                            )}
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Guardian Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            {centerParentsList.length > 0 ? (
                                <Form.Select id="addstudent-select-guardian" className="notif-formselect" aria-label="Select Center" onChange={(e) => setGuardianName(e.target.value)}>
                                    <option>Select Guardian</option>
                                    {centerParentsList.map((centerParent, index) => (
                                        <option key={index} value={centerParent.fullName}>{centerParent.fullName}</option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled id="addstudent-select-guardian" className="notif-formselect" aria-label="Select Center">
                                    <option>Select Center</option>
                                </Form.Select>
                            )}

                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Grade</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addstudent-grade"
                                type="number"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-row justify-content-center column-gap-5 ">
                        <Button id="addstudent-submitbutton" disabled={!validateForm()} className="custom-btn" type="submit">
                            Submit
                        </Button>
                        <Button id="addstudent-cancelbutton" className="custom-btn-cancel" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default PopupUi;