import { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading: isLoading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUserData, loading: oneUserLoading } = useQuery(
    GET_ONE_USER,
    {
      variables: {
        id: 1,
      },
    }
  );
  const [newUser] = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: Number(age),
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) {
    return 'Loading';
  }

  return (
    <div className='App'>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type='number'
        />

        <div>
          <button onClick={(event) => addUser(event)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>

      <div>
        {data.getAllUsers.map((user) => (
          <div className='user'>
            {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
