import { API_URL } from '../../config';

function get_rooms(id_hotel) {

    return (

        fetch(`${API_URL}/rooms/${id_hotel}`, {
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

export default get_rooms;