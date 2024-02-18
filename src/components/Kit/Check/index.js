import { Column, Row } from '../../../themes/global';
import './style.css';


export default function Check({ value, onClick }) {
    const handle = () => {
        onClick(!value);
    };
    return (
        <Column>
            <Row onClick={handle} className='check' style={{backgroundColor: value ? '#ED274A' : '#404040'}}>
                <Column onClick={handle} className={`ball ${value ? 'active' : 'disabled'}`} />
            </Row>
        </Column>
    );
}