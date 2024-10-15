
import { API_URL } from '../../config';

function delete_hotel(id, name, address, city, phone, email, description, stars, latitude, longitude) {

    return (

        fetch(`${API_URL}/delete-hotel/${id}/`, {
            method: 'DELETE',
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

export default delete_hotel;