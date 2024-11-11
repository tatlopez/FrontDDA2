
import { API_URL } from '../../config';

function delete_service(id) {

    return (

        fetch(`${API_URL}/services/delete-service/${id}/`, {
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

export default delete_service;