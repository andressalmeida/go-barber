import { ButtonHTMLAttributes } from 'react'
import * as C from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
    return (
      
            <C.Container {...rest}>{children}</C.Container>

    )
}

export default Button