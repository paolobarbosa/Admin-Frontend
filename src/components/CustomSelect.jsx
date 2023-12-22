import { useState, useEffect } from "react";
import styles from "../styles/customselect.module.css";

const CustomSelect = ({ multiple, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    }

    const selectOption = (option) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    }

    const isOptionSelected = (option) => {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    return ( 
        <div 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)} 
            tabIndex="0" 
            className={styles["customselect-container"]}
        >
            <span className={styles.value}>{multiple ? 
                value.map((v, index) => (
                    <button 
                        type="button" 
                        key={index} 
                        className={styles["option-badge"]}
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(v)
                        }}
                    >
                        {v}
                        <span className={styles["remove-btn"]}>&times;</span>
                    </button>
            )) : value?.centerName}</span>
            <button type="button" onClick={e => {
                e.stopPropagation();
                clearOptions();
            }} 
            className={styles["clear-btn"]}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li onClick={e => {
                            e.stopPropagation();
                            selectOption(option.centerName)
                            setIsOpen(false)
                        }} 
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.centerName} 
                        className={`${styles.option} ${
                            isOptionSelected(option) ? styles.selected : ""
                        } ${
                            index === highlightedIndex ? styles.highlighted : ""
                        }`}>
                        {option.centerName}
                    </li>
                ))}
            </ul>
        </div>
     );
}
 
export default CustomSelect;