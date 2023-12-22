import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";

const AddAudioFile = () => {

    const routes = useRoutes();

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <div className="d-flex align-items-center">
                    <Heading
                        label={`${routes[4].label} > ${routes[4].children[0].label} > Add Audio File`}
                    />
                </div>
                <UiContent />
            </div>
        </div>
    );
}

export default AddAudioFile;