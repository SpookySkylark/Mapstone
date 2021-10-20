import { Table } from 'react-bootstrap/';
import AdminItem from '../components/AdminItemComponent.js';
import TableLabel from '../components/TableLabelComponent.js';

const AdminTableComponent = ({jsonData, removePin}) => {
    return (
    <Table>
        <TableLabel />
            <tbody>
                {jsonData.map( (pins, index) => <AdminItem title={pins.title} description={pins.description} name={pins.name} removePin={removePin} key={pins.id} {...pins} pinnum={index+1}/>)}
            </tbody>
    </Table>
    )
}

export default AdminTableComponent;