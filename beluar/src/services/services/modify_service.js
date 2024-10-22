
import { API_URL } from '../../config';

function modify_service(id, hotel, name, detail, is_available, price) {

    return (

        fetch(`${API_URL}/modify-service/${id}/`, {
            method: 'PUT',
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

export default modify_service;