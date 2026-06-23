import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const statusMap = {
  new: { text: 'New', className: 'bg-primary' },
  in_progress: { text: 'In progress', className: 'bg-warning text-dark' },
  done: { text: 'Completed', className: 'bg-success' }
};

const courseStatusMap = {
  active: { text: 'Active', className: 'bg-primary' },
  upcoming: { text: 'Upcoming', className: 'bg-info text-dark' },
  completed: { text: 'Completed', className: 'bg-success' }
};

const formatDate = value => {
  if (!value) return 'To be confirmed';
  return new Date(value).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('baitau_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleAuthError = errorMessage => {
    if (errorMessage.toLowerCase().includes('session') || errorMessage.toLowerCase().includes('log in')) {
      localStorage.removeItem('baitau_token');
      localStorage.removeItem('baitau_user');
      navigate('/login');
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const me = await apiRequest('/auth/me');
      setUser(me.user);
      localStorage.setItem('baitau_user', JSON.stringify(me.user));

      if (me.user.role === 'admin') {
        const response = await apiRequest('/leads');
        setLeads(response.data);
      }
    } catch (err) {
      setError(err.message);
      handleAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('baitau_token')) {
      navigate('/login');
      return;
    }
    loadDashboard();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiRequest(`/leads/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      loadDashboard();
    } catch (err) {
      setError(err.message);
      handleAuthError(err.message);
    }
  };

  const counts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    { new: 0, in_progress: 0, done: 0 }
  );

  if (loading) {
    return <div className="container py-5 text-center">Loading account information...</div>;
  }

  const isAdmin = user?.role === 'admin';
  const activeCourses = user?.activeCourses || [];

  return (
    <>
      <section className="page-hero py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <span className="badge text-bg-light text-primary border mb-3">Account</span>
              <h1 className="fw-bold display-6">{isAdmin ? 'Training request management' : 'My active courses'}</h1>
              <p className="lead text-white-75 mb-0">
                {isAdmin
                  ? 'Review client requests, contact details and processing status.'
                  : 'View your current training programmes, schedule and progress.'}
              </p>
            </div>
            <Link className="btn btn-light text-primary fw-semibold" to="/services">View services</Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          {isAdmin ? (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-4"><div className="stat-card"><strong>{counts.new}</strong><span>New requests</span></div></div>
                <div className="col-md-4"><div className="stat-card"><strong>{counts.in_progress}</strong><span>In progress</span></div></div>
                <div className="col-md-4"><div className="stat-card"><strong>{counts.done}</strong><span>Completed</span></div></div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold mb-0">All training requests</h4>
                    <button className="btn btn-outline-primary btn-sm" onClick={loadDashboard}>Refresh</button>
                  </div>

                  {leads.length === 0 ? (
                    <div className="alert alert-info">There are no requests yet.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Contacts</th>
                            <th>Service</th>
                            <th>Message</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map(lead => (
                            <tr key={lead._id}>
                              <td>
                                <strong>{lead.name}</strong><br />
                                <small className="text-secondary">{lead.company || 'Company not provided'}</small>
                              </td>
                              <td>
                                <div>{lead.phone}</div>
                                <small className="text-secondary">{lead.email || 'Email not provided'}</small>
                              </td>
                              <td>{lead.service}</td>
                              <td className="small text-secondary">{lead.message || '—'}</td>
                              <td>
                                <span className={`badge ${statusMap[lead.status]?.className || 'bg-secondary'} mb-2`}>
                                  {statusMap[lead.status]?.text || lead.status}
                                </span>
                                <select
                                  className="form-select form-select-sm"
                                  value={lead.status}
                                  onChange={event => updateStatus(lead._id, event.target.value)}
                                >
                                  <option value="new">New</option>
                                  <option value="in_progress">In progress</option>
                                  <option value="done">Completed</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-4"><div className="stat-card"><strong>{activeCourses.length}</strong><span>Assigned courses</span></div></div>
                <div className="col-md-4"><div className="stat-card"><strong>{activeCourses.filter(course => course.status === 'active').length}</strong><span>Currently active</span></div></div>
                <div className="col-md-4"><div className="stat-card"><strong>{activeCourses.filter(course => course.status === 'completed').length}</strong><span>Completed</span></div></div>
              </div>

              {activeCourses.length === 0 ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="fw-bold">No active courses yet</h4>
                    <p className="text-secondary mb-3">Your training programmes will appear here after enrolment is confirmed by the training centre.</p>
                    <Link className="btn btn-primary" to="/services">Choose a course</Link>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  {activeCourses.map(course => (
                    <div className="col-lg-6" key={course._id || course.title}>
                      <div className="card border-0 shadow-sm service-card h-100">
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                            <span className="badge bg-primary-subtle text-primary">{course.category}</span>
                            <span className={`badge ${courseStatusMap[course.status]?.className || 'bg-secondary'}`}>
                              {courseStatusMap[course.status]?.text || course.status}
                            </span>
                          </div>
                          <h4 className="fw-bold">{course.title}</h4>
                          <p className="text-secondary">{course.description}</p>
                          <div className="row g-3 small text-secondary mb-3">
                            <div className="col-sm-6"><i className="bi bi-calendar-event text-primary me-2"></i>{formatDate(course.startDate)} - {formatDate(course.endDate)}</div>
                            <div className="col-sm-6"><i className="bi bi-geo-alt text-primary me-2"></i>{course.location || 'Location to be confirmed'}</div>
                            <div className="col-sm-6"><i className="bi bi-person-badge text-primary me-2"></i>{course.trainer || 'Trainer to be confirmed'}</div>
                            <div className="col-sm-6"><i className="bi bi-mortarboard text-primary me-2"></i>{course.format || 'Format to be confirmed'}</div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small fw-semibold">Course progress</span>
                            <span className="small text-secondary">{course.progress || 0}%</span>
                          </div>
                          <div className="progress" role="progressbar" aria-label="Course progress" aria-valuenow={course.progress || 0} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: `${course.progress || 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
