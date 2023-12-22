import { useState } from "react";
import "../styles/ui-content.css";

const UiContent = ({
    children, 
    withTab, 
    firstTab, 
    secondTab,
    onFirstTabClick,
    onSecondTabClick,
    firstTabOpen,
    secondTabOpen
}) => {

    return ( 
        <div className={withTab ? "ui-content-container-tabs" : "ui-content-container"}>
            {withTab ? (
                <div className="tabs">
                    <div id="ui-content-tab1" onClick={() => onFirstTabClick(true)} className={firstTabOpen ? "active-tab" : "inactive-tab"}>{firstTab}</div>
                    <div id="ui-content-tab2" onClick={() => onSecondTabClick(true)} className={secondTabOpen ? "active-tab" : "inactive-tab"}>{secondTab}</div>
                </div>
            ) : null }
            
            <div className="ui-content">
                {children}
            </div>
        </div>
        
     );
}
 
export default UiContent;