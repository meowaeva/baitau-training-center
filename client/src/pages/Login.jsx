import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import { validateAuth } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setAlert(null);
    const validationErrors = validateAuth(form, 'login');
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      localStorage.setItem('baitau_token', response.token);
      localStorage.setItem('baitau_user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-lg-5">
                <h2 className="fw-bold text-center mb-3">Account login</h2>
                <p className="text-secondary text-center">Sign in to view your training information and requests.</p>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form.email} onChange={handleChange} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={form.password} onChange={handleChange} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Signing in...' : 'Log in'}</button>
                </form>
                <p className="text-center mt-3 mb-0">No account yet? <Link to="/register">Create one</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
