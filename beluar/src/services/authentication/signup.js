
import { API_URL } from '../../config.js';

function signup(email, name, password) {

    return (

        fetch(`${API_URL}/api/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: email, email: email, first_name: name, password: password }),
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default signup;