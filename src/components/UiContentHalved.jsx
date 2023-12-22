import "../styles/ui-content.css";

const UiContent = ({children}) => {
    return ( 
        <div className="ui-content-halved">
            {children}
        </div>
     );
}
 
export default UiContent;