
import { API_URL } from '../../config';

function create_hotel(name, address, city, phone, email, description, stars, latitude, longitude) {

    return (

        fetch(`${API_URL}/create-hotel/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({name: name, address: address, city: city, phone: phone, email: email, description: description, stars: stars, latitude: latitude, longitude: longitude }),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default create_hotel;