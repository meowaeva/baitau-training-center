import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge rounded-pill text-bg-light text-primary border mb-3">Training • Consulting • HSE</span>
            <h1 className="display-5 fw-bold mb-3">
              Corporate training and consulting for safer, stronger teams
            </h1>
            <p className="lead text-white-75 mb-4">
              Baitau Partners helps organisations improve staff competence, strengthen safety culture and prepare teams for international training standards.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-light btn-lg text-primary fw-semibold">Explore services</Link>
              <a href="#lead-form" className="btn btn-outline-light btn-lg">Request consultation</a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-card bg-white text-dark shadow-lg">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="hero-card-icon"><i className="bi bi-shield-check"></i></div>
                <div>
                  <h5 className="mb-1">Integrated training support</h5>
                  <p className="text-secondary mb-0">From training needs review to course delivery and follow-up recommendations</p>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-6"><div className="mini-stat"><strong>HSE</strong><span>Health, safety and environment</span></div></div>
                <div className="col-6"><div className="mini-stat"><strong>NEBOSH</strong><span>International programmes</span></div></div>
                <div className="col-6"><div className="mini-stat"><strong>ISO</strong><span>Management systems</span></div></div>
                <div className="col-6"><div className="mini-stat"><strong>TMS</strong><span>Languages and translation support</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
