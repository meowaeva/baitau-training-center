import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { validateLead } from '../utils/validation';

const initialState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  service: '',
  message: ''
};

const LeadForm = ({ selectedService = '' }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setForm(prev => ({ ...prev, service: selectedService }));
      const formElement = document.getElementById('lead-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedService]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = () => {
    setErrors(validateLead(form));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setAlert(null);
    setServerErrors([]);

    const validationErrors = validateLead(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setAlert({ type: 'danger', message: 'Please correct the highlighted fields.' });
      return;
    }

    try {
      setLoading(true);
      const response = await apiRequest('/leads', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setAlert({ type: 'success', message: response.message });
      setForm(initialState);
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
      setServerErrors(error.details || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-form" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card border-0 shadow-lg form-card">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <span className="badge bg-primary-subtle text-primary mb-2">Consultation request</span>
                  <h2 className="fw-bold">Request a training programme</h2>
                  <p className="text-secondary mb-0">Complete the form and a Baitau Partners representative will contact you to discuss the most suitable course.</p>
                </div>

                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

                {serverErrors.length > 0 && (
                  <div className="alert alert-danger">
                    <strong>Please check:</strong>
                    <ul className="mb-0 mt-2">
                      {serverErrors.map(error => <li key={`${error.field}-${error.message}`}>{error.field}: {error.message}</li>)}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full name *</label>
                      <input
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Example: Aigerim Sadykova"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone number *</label>
                      <input
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+7 777 123 45 67"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        placeholder="name@company.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Company</label>
                      <input
                        className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Company name"
                      />
                      {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Service or course *</label>
                      <input
                        className={`form-control ${errors.service ? 'is-invalid' : ''}`}
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Select a course or enter a training request"
                      />
                      {errors.service && <div className="invalid-feedback">{errors.service}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        rows="4"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about the number of participants, preferred format and training goals."
                      ></textarea>
                      <div className="form-text">Maximum 500 characters.</div>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg w-100 mt-4" disabled={loading}>
                    {loading ? 'Sending...' : 'Submit request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
