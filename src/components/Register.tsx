import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Cargando...</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@company.com"
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>Registrar</button>
      </form>
    </div>
  );
};

export default Register;
