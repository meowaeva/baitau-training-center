import { useEffect, useMemo, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import LeadForm from '../components/LeadForm';
import { apiRequest } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [serviceResponse, categoryResponse] = await Promise.all([
          apiRequest('/services'),
          apiRequest('/services/categories')
        ]);
        setServices(serviceResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = category === 'all' || service.category === category;
      const text = `${service.title} ${service.description} ${service.category}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [services, category, query]);

  return (
    <>
      <section className="page-hero py-5">
        <div className="container">
          <span className="badge text-bg-light text-primary border mb-3">Services</span>
          <h1 className="fw-bold display-6">Baitau Partners training services</h1>
          <p className="lead text-white-75 mb-0">Choose a training direction, review the programme and request a consultation.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="row g-3 align-items-end">
                <div className="col-md-7">
                  <label className="form-label">Search course</label>
                  <input className="form-control" value={query} onChange={event => setQuery(event.target.value)} placeholder="NEBOSH, IOSH, HSE, ISO..." />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={category} onChange={event => setCategory(event.target.value)}>
                    <option value="all">All categories</option>
                    {categories.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">Loading services...</div>
          ) : filteredServices.length === 0 ? (
            <div className="alert alert-info">No services found.</div>
          ) : (
            <div className="row g-4">
              {filteredServices.map(service => (
                <div className="col-md-6 col-lg-4" key={service._id}>
                  <ServiceCard service={service} onApply={setSelectedService} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LeadForm selectedService={selectedService} />
    </>
  );
};

export default Services;
