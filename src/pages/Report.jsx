import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import tableData from "../data/tableData";
import ReportFilters from "../data/report/ReportFilters";
import ReportTypes from "../data/report/ReportTypes";
import * as XLSX from 'xlsx';


const Report = () => {

    const routes = useRoutes();
    
    const authRequest = {
        ...loginRequest,
    };

    const ExportXL = () => {

        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      
        XLSX.writeFile(workbook, "Report.xlsx");
      };
      

    return ( 
        <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect} 
                authenticationRequest={authRequest}
        >
            <div className="dashboard">
                <div className="dashboard-content">
                    <div className="d-flex align-items-center">
                        <Heading 
                            label={routes[6].label}
                        />
                    </div>
                    <UiContent 
                        children={
                            <>
                                <h2 className="heading">Select Report Type</h2>
                                <ReportTypes />
                                <h2 className="heading">Select Report Type</h2>
                                <ReportFilters />
                            </>
                        }
                    />
                    <UiContent 
                        children={
                            <>
                                <h2 className='heading'>Usage Report</h2>
                                <h6 className='subheading'>Listing</h6>
                                <Table data={tableData} 
                                withLinks={false} 
                                btnFunction={ExportXL} 
                                tblButton="Export Excel"
                                tableSelectControls={true}/>
                            </>}
                    />
                </div>
            </div>
        </MsalAuthenticationTemplate>
     );
}
 
export default Report;