import { ReactNode } from "react";
import * as C from "./styles";

interface TooltipProps {
    title: string;
    className?: string;
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
    return (
    <C.Container className={className}>
        {children}
        <span>{title}</span>
    </C.Container>
    )
};

export default Tooltip;
