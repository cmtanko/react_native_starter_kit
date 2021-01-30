import axios from 'axios';

class Category {
  async get() {
    const options = {
      method: 'GET',
      timeout: 600000,
      url: 'http://localhost:3000/categories',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Category();
