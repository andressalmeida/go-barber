import * as C from "./styles";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

export const ToastContainer = () => {
    return (
        <C.Container>
            <C.Toast hasDescription>
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Ocorreu um erro</strong>
                    <p>Descrição do erro</p>
                </div>

                <button>
                    <FiXCircle size={18} />
                </button>
            </C.Toast>

            <C.Toast type='success' hasDescription={false}>
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Ocorreu um erro</strong>
                </div>

                <button>
                    <FiXCircle size={18} />
                </button>
            </C.Toast>

            <C.Toast type='error' hasDescription>
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Ocorreu um erro</strong>
                    <p>Descrição do erro</p>
                </div>

                <button>
                    <FiXCircle size={18} />
                </button>
            </C.Toast>
        </C.Container>
    );
};
