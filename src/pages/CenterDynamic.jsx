import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import { protectedApi } from "../authConfig";
import CenterDetails from "../data/centerDynamicContent/CenterDetails";
import { useParams } from "react-router-dom";
import CenterSubjects from "../data/centerDynamicContent/CenterSubjects";
import { ClipLoader } from "react-spinners";
import useApiRequest from "../hooks/useApiRequest";

const CenterDynamic = () => {

    const { dynamicCenter } = useParams();
    const { makeApiRequest } = useApiRequest();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstTabOpen, setFirstTabOpen] = useState(true);
    const [secondTabOpen, setSecondTabOpen] = useState(false);

    const onFirstTabClick = (bool) => {
        setFirstTabOpen(bool);
        setSecondTabOpen(false);
    }

    const onSecondTabClick = (bool) => {
        setSecondTabOpen(bool);
        setFirstTabOpen(false);
    }

    const routes = useRoutes();

    const fetchData = async () => {
        try {
            const res = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/center/${dynamicCenter}`, 
                method: "get" 
            })
            setData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="dashboard">
            {data.length > 0 ? (
                <div className="dashboard-content">
                    <div className="d-flex align-items-center">
                        <Heading
                            label={`${routes[2].label} > ${data[0].centerName}`}
                        />
                    </div>
                    <UiContent
                        children={
                            <>
                                <CenterDetails
                                    col11={data[0].centerName}
                                    col12={data[0].centerId}
                                    col13={data[0].branchName}
                                    col14={data[0].countryName}
                                    col21={data[0].instructorName}
                                    col22={data[0].instructorId}
                                />
                            </>
                        }
                    />
                    <UiContent
                        children={<CenterSubjects header1="EFL(101)" header2="Thai(110)" />} />
                    <UiContent
                        children={firstTabOpen ? (<Table id="centerdynamic-firsttab-table" data={data[0].assistants} withLinks={false} loading={loading} />) : secondTabOpen ? (<Table id="centerdynamic-secondtab-table" data={data[0].students} loading={loading} withLinks={false} />) : (null)}
                        withTab={true}
                        firstTab="Assistants"
                        secondTab="Students"
                        onFirstTabClick={onFirstTabClick}
                        onSecondTabClick={onSecondTabClick}
                        firstTabOpen={firstTabOpen}
                        secondTabOpen={secondTabOpen}
                        tableSelectControls={true}
                    />
                </div>
            ) : (
                <div className="d-flex justify-content-center align-content-center h-100">
                    <div className="mx-auto w-auto h-auto my-auto">
                        <ClipLoader color="#4E4E4E" size={75} />
                    </div>
                </div>

            )}

        </div>
    );
}

export default CenterDynamic;