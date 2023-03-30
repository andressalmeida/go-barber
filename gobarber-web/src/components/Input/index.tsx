import {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import * as C from "./styles";
import { useField } from "@unform/core";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, error, defaultValue, registerField } = useField(name);

    const handleInputBlur = () => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    };

    const handleInputFocus = () => {
        setIsFocused(true)
    };

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <C.Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                {...rest}
            />

            {error &&
            <C.Error title={error} >
                <FiAlertCircle color="#c53030" size={20}/>
            </C.Error>
            }
        </C.Container>
    );
};

export default Input;
