import { useState, useEffect } from "react";
import "../../styles/dashboard-content.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { protectedApi } from "../../authConfig";
import { toast } from "react-hot-toast";
import useApiRequest from "../../hooks/useApiRequest";

const PopupUi = ({ onSubmit, onCancel, updateData }) => {

    const validateForm = () => {
        return (
            trackname.length > 5 &&
            subject.length > 5 &&
            country.length > 5 &&
            skitAudio.length > 5
        )
    }

    const {makeApiRequest} = useApiRequest();

    const [countryList, setCountryList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    const [country, setCountry] = useState('');
    const [subject, setSubject] = useState('');
    const [trackname, setTrackname] = useState('');
    const [level, setLevel] = useState('');
    const [skitAudio, setSkitAudio] = useState('');
    const [isSkitAudio, setIsSkitAudio] = useState(false);
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const countryRes = await makeApiRequest({
                    url: `${protectedApi.api.endpoint}/country`,
                    method: "get",
                });
                console.log(countryRes);
                setCountryList(countryRes.data);
            } catch(err) {
                console.log(err);
            }

        }

        const fetchSubjectData = async () => {
            try {
                const subjectRes = await makeApiRequest({
                    url: `${protectedApi.api.endpoint}/subject`,
                    method: "get",
                });
                console.log(subjectRes);
                setSubjectList(subjectRes.data);
            } catch(err) {
                console.log(err);
            }

        }

        fetchCountryData();
        fetchSubjectData();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("country", country);
        formData.append("subject", subject);
        formData.append("trackname", trackname);
        formData.append("level", level);
        formData.append("isSkitAudio", isSkitAudio);
        formData.append("skitAudio", skitAudio);
        formData.append("files", audioFile);

        onSubmit();

        try {
            const res = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/audio`,
                method: "post",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(res);
            await updateData();
            toast.success("Successfully added new track");
        } catch(err) {
            console.log(err);
        }


    }

    return (
        <Form onSubmit={handleSubmit} className="notif-container notif-container-rows my-4" >
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Track Name</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addaudio-trackname"
                                type="text"
                                value={trackname}
                                onChange={(e) => setTrackname(e.target.value)}
                                style={{ height: "40px", width: "250px" }}
                            />

                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Assign Skit Audio</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Check id="addaudio-skitaudio-toggle" type="switch" value={isSkitAudio} onChange={(e) => setIsSkitAudio(!isSkitAudio)} />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Country</Form.Label>
                        <div className="my-0 py-0 col-8">
                            {countryList.length > 0 ? (
                                <Form.Select id="addaudio-select-country" className="notif-formselect" aria-label="Select Country" onChange={(e) => setCountry(e.target.value)}>
                                    <option>Select Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.countryName}>{country.countryName}</option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled id="addaudio-select-country" className="notif-formselect" aria-label="Select Country">
                                    <option>Select Country</option>
                                </Form.Select>
                            )}
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Skit Audio</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Select id="addaudio-select-skitaudio" className="notif-formselect" aria-label="Select Skit Audio" onChange={(e) => setSkitAudio(e.target.value)}>
                                <option>Select Audio</option>
                                <option value="sixle">One</option>
                                <option value="Eightlet">Two</option>
                                <option value="Sevenle">Three</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Subject</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Select id="addaudio-select-subject" className="notif-formselect" aria-label="Select Subject" onChange={(e) => setSubject(e.target.value)}>
                                <option>Select Subject</option>
                                {subjectList.map((subject, index) => (
                                    <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Subject Audio</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Control
                                id="addaudio-uploadbutton"
                                type="file"
                                onChange={(e) => setAudioFile(e.target.files[0])}
                                style={{ height: "40px", width: "250px" }}
                            />
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Level</Form.Label>
                        <div className="my-0 py-0 col-8">
                            <Form.Select id="addaudio-select-level" className="notif-formselect" aria-label="Select Level" onChange={(e) => setLevel(e.target.value)} >
                                <option>Select Level</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6" />
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-row justify-content-center column-gap-5 ">
                        <Button id="addaudio-submitbutton" disabled={!validateForm()} className="custom-btn" type="submit">
                            Submit
                        </Button>
                        <Button id="addaudio-cancelbutton" className="custom-btn-cancel" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default PopupUi;