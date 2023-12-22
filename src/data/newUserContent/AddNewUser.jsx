import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DataContext } from "../../App";
import { useContext, useEffect, useState, useRef } from "react";
import "../../styles/dashboard-content.css";
import { protectedApi } from "../../authConfig";
import useApiRequest from "../../hooks/useApiRequest";
import CustomSelect from "../../components/CustomSelect";
import DropdownWIthSearch from "../../components/DropdownWithSearch";
import { toast } from "react-hot-toast";

const AddNewUser = ({ latestSentUserType }) => {

    const [countryList, setCountryList] = useState([]);
    const [centerList, setCenterList] = useState([]);
    const [filteredCenter, setFilteredCenter] = useState([]);
    const [centerParentsList, setCenterParentsList] = useState([]);

    const [sentUserType, setSentUserType] = useState(latestSentUserType);
    console.log(latestSentUserType);
    const [userType, setUserType] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [parentName, setParentName] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');
    const [centerName, setCenterName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [grade, setGrade] = useState('');
    const [centerNameList, setCenterNameList] = useState([]);
    const [stateProvince, setStateProvince] = useState('');

    const data = useContext(DataContext);

    const prevUserType = useRef();

    const { makeApiRequest, fetchCountryData, fetchCenterData } = useApiRequest();

    const fetchCenterParents = async (centerParent) => {

        try {
            const centerParentsResponse = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/center/${centerParent.sNo}/parents`,
                method: 'get',
            })

            setCenterParentsList(centerParentsResponse.data);
        } catch (err) {
            console.log('Error in adding new Instructor', err);
        }

    }

    const settingUserType = (e) => {
        setSentUserType('');
        setUserType(e.target.value);
    }

    const settingCountry = (e) => {
        setCountry(e.target.value);
        setFilteredCenter([]);
        fetchCenterData().then((data) => setCenterList(data));
    }

    const settingParentName = (e) => {
        setParentName(e.fullName);
        setParentEmail(e.email);
    }

    const validateForm = () => {
        if (userType !== "Instructor" && userType !== "CountryAdmin" && userType !== "Student") {
            return (
                userType.length > 0 &&
                stateProvince.length > 2 &&
                city.length > 2 &&
                email.length > 5 &&
                password.length > 7 &&
                confirmPassword === password &&
                firstName.length > 2 &&
                lastName.length > 2 &&
                country.length > 4 &&
                centerName.length > 4
            )
        } else if (userType === "Student") {
            return (
                userType.length > 0 &&
                stateProvince.length > 2 &&
                city.length > 2 &&
                email.length > 5 &&
                password.length > 7 &&
                confirmPassword === password &&
                firstName.length > 2 &&
                lastName.length > 2 &&
                country.length > 4 &&
                centerName.length > 4 &&
                parentName.length > 0 &&
                grade.length > 0
            )
        } else if (userType === "Instructor") {
            return (
                userType.length > 0 &&
                stateProvince.length > 2 &&
                city.length > 2 &&
                email.length > 5 &&
                password.length > 7 &&
                confirmPassword === password &&
                firstName.length > 2 &&
                lastName.length > 2 &&
                country.length > 4 &&
                centerNameList.length > 0
            )
        } else {
            return (
                userType.length > 0 &&
                stateProvince.length > 2 &&
                city.length > 2 &&
                email.length > 5 &&
                password.length > 7 &&
                confirmPassword === password &&
                firstName.length > 2 &&
                lastName.length > 2 &&
                country.length > 4
            )
        }
    }

    const clearAll = () => {
        setFirstName("");
        setLastName("");
        setCountry("");
        setStateProvince("");
        setContactNumber("");
        setParentEmail("");
        setParentName("");
        setStreetAddress("");
        setCity("");
        setZipCode("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDateOfBirth("");
        setCenterName("");
        setCenterNameList([]);
        setGrade("");
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
            contactNumber,
            zipCode,
            roleName: userType,
            addedBy: "1",
            dateOfBirth,
        }

        if (userType === "Parent" || userType === "Assistant") {
            userData.centerName = centerName;
        } else if (userType === "Student") {
            userData.centerName = centerName;
            userData.guardianName = parentName;
            userData.grade = grade;
        } else if (userType === "Instructor") {
            userData.centerNameList = centerNameList;
        }

        console.log(userData)

        try {
            const res = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users`,
                method: 'post',
                data: userData
            })
            console.log(res);
            clearAll();
            toast.success("Successfully added new Instructor");
        } catch (err) {
            console.log('Error in adding new Instructor', err);
            if (err.response.data === "Email is already exist") {
                toast.error("Parent already linked");
            }
        }
    }

    useEffect(() => {
        fetchCountryData().then(countries => setCountryList(countries));
    }, []);

    useEffect(() => {
        
        if (sentUserType.length > 0) {
            setUserType(sentUserType);
        }

        if (centerList.length > 0) {
            const centerIndv = centerList.filter((center) => center.countryName === country);
            console.log(centerIndv);
            setFilteredCenter(centerIndv);
        }

        if (centerName.length > 0) {
            const centerParent = filteredCenter.filter((fCenter) => fCenter.centerName === centerName);
            fetchCenterParents(centerParent[0]);
        }

        if (prevUserType.current !== undefined && prevUserType.current !== userType) {
            clearAll();
        }

        prevUserType.current = userType;

    }, [centerList, centerName, userType, sentUserType]);

    return (
        <Form onSubmit={handleSubmit} className="newuser-container newuser-container-rows my-4">
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Type of User</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Select
                                className="newuser-formselect"
                                aria-label="Select User Type"
                                onChange={(e) => settingUserType(e)}
                                value={sentUserType.length > 0 ? sentUserType : userType}
                            >
                                <option value="">Select User Type</option>
                                <option value="Student">Student</option>
                                <option value="Parent">Parent/Guardian</option>
                                <option value="Instructor">Instructor</option>
                                <option value="Assistant">Assistant</option>
                                <option value="CountryAdmin">Country Admin</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    {Object.keys(data).length !== 0 ? (
                        Object.keys(data.moduleData["Countries"]).length != 0 ? (
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Country</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    {countryList.length > 0 ? (
                                        <Form.Select
                                            disabled={userType === ""}
                                            className="newuser-formselect"
                                            aria-label="Select Country"
                                            onChange={(e) => settingCountry(e)}
                                            value={country}
                                        >
                                            <option>Select Country</option>
                                            {countryList.map((country, index) => (
                                                <option key={index} value={country.countryName}>{country.countryName}</option>
                                            ))}
                                        </Form.Select>
                                    ) : (
                                        <Form.Select disabled className="newuser-formselect" aria-label="Select Country">
                                            <option>Select Country</option>
                                        </Form.Select>
                                    )}

                                </div>
                            </Form.Group>
                        ) : (null)
                    ) : (null)
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Province / State</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                disabled={userType === ""}
                                type="text"
                                aria-label="Select Province/State"
                                value={stateProvince}
                                onChange={(e) => setStateProvince(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                {userType !== "CountryAdmin" ? (
                    <div className="col-6">
                        <Form.Group className={`${userType === "Instructor" ? "d-flex flex-row" : "d-flex flex-row row-centeritems"}`}>
                            <Form.Label className={`${userType === "Instructor" ? "my-0 py-0 col-4 fw-bold mt-2" : "my-0 py-0 col-4 fw-bold"}`}>{userType === "Instructor" ? "Centers" : "Center"}</Form.Label>
                            <div className="my-0 py-0 col-8">
                                {filteredCenter.length > 0 ? (
                                    userType === "Instructor" ? (
                                        <CustomSelect multiple={true} options={filteredCenter} value={centerNameList} onChange={o => setCenterNameList(o)} />
                                    ) : (
                                        <Form.Select disabled={userType === ""} className="newuser-formselect" aria-label="Select Center" onChange={(e) => setCenterName(e.target.value)}>
                                            <option>Select Center</option>
                                            {filteredCenter.map((center, index) => (
                                                <option key={index} value={center.centerName}>{center.centerName}</option>
                                            ))}
                                        </Form.Select>
                                    )
                                ) : (
                                    <Form.Select disabled className="newuser-formselect" aria-label="Select Center">
                                        <option>Select Center</option>
                                    </Form.Select>
                                )}
                            </div>
                        </Form.Group>
                    </div>
                ) : (
                    <div className="col-6">
                        <Form.Group className="d-flex flex-row row-centeritems">
                            <Form.Label className="my-0 py-0 col-4 fw-bold">City</Form.Label>
                            <div className="my-0 py-0 col-8">
                                <Form.Control
                                    disabled={userType === ""}
                                    type="text"
                                    aria-label="Enter City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={{ height: "40px", width: "250px" }}
                                />
                            </div>
                        </Form.Group>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Street Address</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                disabled={userType === ""}
                                type="text"
                                aria-label="Enter Street Address"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                {userType !== "CountryAdmin" ? (
                    <div className="col-6">
                        <Form.Group className="d-flex flex-row row-centeritems">
                            <Form.Label className="my-0 py-0 col-4 fw-bold">City</Form.Label>
                            <div className="my-0 py-0 col-8">
                                <Form.Control
                                    disabled={userType === ""}
                                    type="text"
                                    aria-label="Enter City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={{ height: "40px", width: "250px" }}
                                />
                            </div>
                        </Form.Group>
                    </div>
                ) : (
                    <div className="col-6">
                        <Form.Group className="d-flex flex-row row-centeritems">
                            <Form.Label className="my-0 py-0 col-4 fw-bold">Zip Code</Form.Label>
                            <div className="my-0 py-0 col-8">
                                <Form.Control
                                    disabled={userType === ""}
                                    type="number"
                                    aria-label="Enter Zip Code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    style={{ height: "40px", width: "250px" }}
                                />
                            </div>
                        </Form.Group>
                    </div>
                )}

            </div>
            {userType !== "CountryAdmin" ? (
                <div className="row">
                    <div className="col-6">
                        <Form.Group className="d-flex flex-row row-centeritems">
                            <Form.Label className="my-0 py-0 col-4 fw-bold">Zip Code</Form.Label>
                            <div className="my-0 py-0 col-8">
                                <Form.Control
                                    disabled={userType === ""}
                                    type="number"
                                    aria-label="Enter Zip Code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    style={{ height: "40px", width: "250px" }}
                                />
                            </div>
                        </Form.Group>
                    </div>
                    {userType === "Student" ? (
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Grade</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        disabled={userType === ""}
                                        type="number"
                                        aria-label="Enter Grade"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    ) : (null)}
                </div>
            ) : (null)}
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">First Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                disabled={userType === ""}
                                type="text"
                                aria-label="Enter First Name"
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
                                disabled={userType === ""}
                                type="text"
                                aria-label="Enter Last Name"
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
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Date of Birth</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                disabled={userType === ""}
                                type="date"
                                aria-label="Select Date of Birth"
                                className={`${userType === "" ? "formdisabled" : ""}`}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Email Address</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                disabled={userType === ""}
                                type="email"
                                aria-label="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            {(userType === "Parent" || userType === "Assistant" || userType === "Instructor" || userType === "CountryAdmin") ? (
                <>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Contact</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        type="text"
                                        aria-label="Enter Contact"
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
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Password</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        type="password"
                                        aria-label="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Confirm Password</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        type="password"
                                        aria-label="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                </>
            ) : userType === "Student" ? (
                <>
                    <h2 className="heading">Parent/Guardian's Detail:</h2>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Parent's Name</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    {centerParentsList.length > 0 ? (
                                        <DropdownWIthSearch value={parentName} options={centerParentsList} onChange={o => settingParentName(o)} />
                                    ) : (
                                        <Form.Select disabled className="newuser-formselect" aria-label="Select Parent">
                                            <option>Select Parent</option>
                                        </Form.Select>
                                    )}
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Parent's Email</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        disabled
                                        type="email"
                                        value={parentEmail}
                                        onChange={(e) => setParentEmail(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Contact</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
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
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Password</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        type="password"
                                        aria-label="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="d-flex flex-row row-centeritems">
                                <Form.Label className="my-0 py-0 col-4 fw-bold">Confirm Password</Form.Label>
                                <div className="my-0 py-0 col-8">
                                    <Form.Control
                                        type="password"
                                        aria-label="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ height: "40px", width: "250px" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                </>
            ) : (null)}
            <div className="row my-4">
                <div className="col-6" />
                <div className="col-6">
                    <div className="d-flex flex-row row-centeritems">
                        <div className="my-0 py-0 col-4" />
                        <div className="my-0 py-0 col-8" style={{ width: "250px" }}>
                            <Button disabled={!validateForm()} className="custom-btn ms-auto" type="submit" >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default AddNewUser;