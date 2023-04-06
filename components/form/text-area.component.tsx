import {FormControl, FormLabel, Textarea} from "@chakra-ui/react";
import {getString} from "configs/strings";
import {InputHTMLAttributes} from "react";

interface TextAreaProps {
    name: string;
    label: string;
    value?: string;
    isRequired?: boolean;
    defaultValue?: string;
    errors?: string;
    touched?: boolean;
    handleChange: (e: any) => void;
}

const TextAreaComponent = ({
    name,
    label,
    value,
    isRequired,
    defaultValue,
    handleChange,
}: TextAreaProps) => {

    return (
        <FormControl>
            <FormLabel>
                {label}
            </FormLabel>
            <Textarea
                name={name}
                onChange={handleChange}

                isRequired={isRequired}
                value={value}
                placeholder={label}
            >
                {defaultValue}
            </Textarea>
        </FormControl>

    );
};

export default TextAreaComponent;
