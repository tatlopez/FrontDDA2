import { API_URL } from '../../config';

function get_reservations(id) {

    return (

        fetch(`${API_URL}/reservations/get-reservations/${id}`, {
            method: 'GET',
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

export default get_reservations;