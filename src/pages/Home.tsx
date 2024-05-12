import React, { useState } from 'react';
import axios from 'axios';

interface User {
  first_name: string;
  last_name: string;
  age: string;
}

const CreateUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    last_name: '',
    first_name: '',
    age: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users', user);
      if (response.status === 201) {
        alert('User created successfully');
        setUser({ first_name: '', last_name: '', age: '' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Lastname:
        <input
          type="text"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          name="age"
          value={user.age}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
