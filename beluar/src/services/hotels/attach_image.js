
import { API_URL } from '../../config';

function attach_image(id, formData) {

    return (

        fetch(`${API_URL}/api/attach-image-hotel/${id}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })
        .then(response => response.json())
        .then((res) => res)
        .catch(error => console.error('Error:', error))
    );
    
}

export default attach_image;

