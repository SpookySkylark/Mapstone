import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  color: #fff;
  background-color: #91BE37;
  border-color: #7CA12E;
  margin: 12px;
`;

const AdminItem = ({className, title, description, name, id, removePin}) => {
    return <tr className={className}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{name}</td>
        <td>
            <StyledButton onClick={ ()=> {
          removePin(id);
        } }>
            Remove
        </StyledButton>
        </td>
    </tr>
}

export default AdminItem;