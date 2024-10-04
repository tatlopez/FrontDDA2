import React from 'react';
import { API_URL } from '../config';

function signup(email, name, password) {

    const username = email;

    return (

        fetch(`${API_URL}/signup/`, {
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