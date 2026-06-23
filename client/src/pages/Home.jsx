import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import ServiceCard from '../components/ServiceCard';
import LeadForm from '../components/LeadForm';
import { apiRequest } from '../utils/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    apiRequest('/services')
      .then(response => setServices(response.data.slice(0, 3)))
      .catch(() => setServices([]));
  }, []);

  return (
    <>
      <Hero />

      <section className="py-5 bg-light-blue">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col-lg-8 mx-auto">
              <span className="badge bg-primary-subtle text-primary mb-2">Key directions</span>
              <h2 className="fw-bold">Training programmes designed for real workplace needs</h2>
              <p className="text-secondary">
                Baitau Partners offers training and consulting solutions for organisations that need competent staff,
                reliable safety practices and clear compliance support.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {services.map(service => (
              <div className="col-md-6 col-lg-4" key={service._id}>
                <ServiceCard service={service} onApply={setSelectedService} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-2">Client support</span>
              <h2 className="fw-bold">A complete training pathway for corporate clients</h2>
              <p className="text-secondary">
                Each course can be selected according to the industry, staff responsibilities, internal standards and
                required level of preparation. The training centre supports clients before, during and after the course.
              </p>

              <div className="row g-3 mt-2">
                <div className="col-sm-6">
                  <div className="feature-box">
                    <i className="bi bi-check-circle"></i>
                    <span>Programme selection by industry</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="feature-box">
                    <i className="bi bi-people"></i>
                    <span>Training for corporate groups</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="feature-box">
                    <i className="bi bi-award"></i>
                    <span>Certificates and course documents</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="feature-box">
                    <i className="bi bi-headset"></i>
                    <span>Consultation before enrolment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="blue-panel p-4 p-lg-5">
                <h4 className="fw-bold mb-3">How cooperation works</h4>

                <div className="timeline-item">
                  <strong>1. Training need review</strong>
                  <p>The client chooses a course direction or sends a request for a tailored consultation.</p>
                </div>

                <div className="timeline-item">
                  <strong>2. Programme recommendation</strong>
                  <p>A specialist clarifies goals, preferred format, number of participants and required competence level.</p>
                </div>

                <div className="timeline-item">
                  <strong>3. Course delivery</strong>
                  <p>Training is delivered in a classroom, online, at the client site or in a corporate format.</p>
                </div>

                <div className="timeline-item">
                  <strong>4. Results and next steps</strong>
                  <p>The client receives course outcomes, practical recommendations and options for further staff competence growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-5 bg-light-blue">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-primary-subtle text-primary mb-2">Formats</span>
            <h2 className="fw-bold">Training formats and consulting support</h2>
            <p className="text-secondary col-lg-8 mx-auto mb-0">
              Programmes can be delivered for individual specialists, project teams and large corporate groups. The format is selected according to the company schedule and operational requirements.
            </p>
          </div>

          <Gallery />
        </div>
      </section>

      <LeadForm selectedService={selectedService} />
    </>
  );
};

export default Home;
