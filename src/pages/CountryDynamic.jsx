import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import { protectedApi } from "../authConfig";
import CountryDetails from "../data/countryDynamicContent/CountryDetails";
import { useParams } from "react-router-dom";
import { ClipLoader } from 'react-spinners'
import useApiRequest from "../hooks/useApiRequest";


const CountryDynamic = () => {

    const { dynamicCountry } = useParams();
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

    console.log(data);

    const routes = useRoutes();

    const fetchData = async () => {
        try {
            const res = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/country/${dynamicCountry}`, 
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
                            label={`${routes[3].label} > ${data[0].countryName}`}
                        />
                    </div>
                    <UiContent
                        children={<CountryDetails col1={data[0].countryName} col2={data[0].centers} col3={data[0].status} />}
                    />
                    <UiContent
                        children={firstTabOpen ? (<Table id="countrydynamic-firsttab-table" data={data[0].subjects} loading={loading} withLinks={false} actionVisible={true} />) : secondTabOpen ? (<Table id="countrydynamic-secondtab-table" data={data[0].branches} loading={loading} withLinks={false} actionVisible={true} />) : (null)}
                        withTab={true}
                        firstTab="Subjects"
                        secondTab="Branches"
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
                        <ClipLoader color="#4E4E4E" size={75}/>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CountryDynamic;