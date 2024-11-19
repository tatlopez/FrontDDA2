import { API_URL } from '../../config';

function get_locations() {

    return (

        fetch(`${API_URL}/api/get-close-locations/`, {
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

export default get_locations;