
import { API_URL } from '../../config';

function create_service(hotel, name, detail, is_available, price) {

    return (

        fetch(`${API_URL}/services/create-service/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({hotel: hotel, name: name, detail: detail, is_available: is_available, price: price}),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default create_service;