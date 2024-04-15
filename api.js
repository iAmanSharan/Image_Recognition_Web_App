import axios from 'axios';

// Assuming Vue 3 composition API
export default {
  name: 'ImageUpload',
  methods: {
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Handle response here
        console.log(response.data);
        // Update your Vue component's data or state as needed
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error here
      }
    },
  },
};