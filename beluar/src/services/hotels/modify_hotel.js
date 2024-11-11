
import { API_URL } from '../../config';

function modify_hotel(id, name, address, city, phone, email, description, stars, latitude, longitude, country) {

    return (
        fetch(`${API_URL}/api/modify-hotel/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({name: name, address: address, city: city, phone: phone, email: email, description: description, stars: stars, latitude: latitude, longitude: longitude, country: country}),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default modify_hotel;