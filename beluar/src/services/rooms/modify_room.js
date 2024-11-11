
import { API_URL } from '../../config';

function modify_hotel(id, hotel, floor, name, price, state, single_beds_amount, double_beds_amount) {

    return (

        fetch(`${API_URL}/api/modify-room/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({hotel: hotel, floor: floor, name: name, price: price, state: state, single_beds_amount: single_beds_amount, double_beds_amount: double_beds_amount}),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default modify_hotel;