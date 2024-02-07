import { IoClose } from "react-icons/io5";
import { Column, Row, Title } from "../../themes/global";
import './modal.css';

export default function Modal({ children, open, setOpen, name = 'titulo' }) {
    if(!open) return null;
    return (
            <Column style={{width: 600, borderRadius: 12, border: '2px solid #303030',  padding: 24, backgroundColor: "#262626" , position: 'absolute', top: 100, alignSelf: 'center', zIndex: 99,}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                <Title style={{fontSize: 32,}}>{name}</Title>
                <Column className="close">
                    <IoClose style={{fontSize: 32,   }} onClick={() => setOpen(false)}/>
                </Column>
            </Row>
            {children}
            </Column>
    )
}