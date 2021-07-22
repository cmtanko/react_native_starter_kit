import axios from 'axios';

class Account {
  async get() {
    const options = {
      method: 'GET',
      timeout: 600000,
      url: 'http://localhost:3000/accounts',
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

export default new Account();
