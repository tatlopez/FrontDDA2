
import { API_URL } from '../../config';

function cancel_reservation(id) {

    return (

        fetch(`${API_URL}/reservations/cancel-reservation/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default cancel_reservation;