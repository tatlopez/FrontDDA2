
import { API_URL } from '../../config';

function create_room(hotel, floor, name, price, state) {

    return (

        fetch(`${API_URL}/create-room/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({hotel: hotel, floor: floor, name: name, price: price, state: state}),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default create_room;