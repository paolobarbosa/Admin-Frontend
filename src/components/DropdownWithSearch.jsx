import { useState, useEffect } from "react";
import styles from "../styles/dropdownwithsearch.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

const DropdownWIthSearch = ({ value, onChange, options }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const selectOption = (option) => {
        if (option !== value) onChange(option);
    }

    const isOptionSelected = (option) => {
        return option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    return ( 
        <div className={styles.dropdowncontainer}>
            <div onClick={() => setIsOpen(!isOpen)}  className=" w-100 p-2 d-flex align-items-center justify-content-between ">
                {value.length < 1 ? "Select Parent" : value.length > 24 ? value.substring(0, 24) + "..." : value }
                <FaChevronDown size={12} color="#3d4042"/>
            </div>
            <ul className={`m-0 p-0 position-absolute w-100 bg-white list-unstyled overflow-y-auto ${styles.options} ${isOpen ? styles.show : ""}`}>
                <div className="d-flex align-items-center px-2 sticky-top top-0 bg-white ">
                    <AiOutlineSearch style={{ color: "#8e8e8e" }}/>
                    <input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        type="text" 
                        placeholder="Enter Parent Name" 
                        className={`w-100 ${styles.searchfield}`} 
                    />
                </div>
                {options.map((option, index) => 
                    <li 
                        key={option.fullName}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(option)
                            setIsOpen(false)
                            setInputValue("");
                        }} 
                        className={`${styles.option} 
                        ${option.fullName.toLowerCase().includes(inputValue) ? "d-block" : "d-none"}
                        ${
                            isOptionSelected(option) ? styles.selected : ""
                        } ${
                            index === highlightedIndex ? styles.highlighted : ""
                        }`}
                    >{option.fullName.length > 26 ? option.fullName.substring(0, 26) + "..." : option.fullName}</li>
                )}
            </ul>
        </div>
     );
}
 
export default DropdownWIthSearch;