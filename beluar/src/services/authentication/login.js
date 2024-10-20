
import { API_URL } from '../../config.js';

function login(email, password) {

    return (

        fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: email, password: password }),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );

}

export default login;
