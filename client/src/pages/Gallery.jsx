import Gallery from '../components/Gallery';

const GalleryPage = () => {
  return (
    <>
      <section className="page-hero py-5">
        <div className="container">
          <span className="badge text-bg-light text-primary border mb-3">Training formats</span>
          <h1 className="fw-bold display-6">Flexible formats for different company needs</h1>
          <p className="lead text-white-75 mb-0">
            Baitau Partners delivers courses for individual specialists, teams and corporate groups in formats that match the client schedule and training goals.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <Gallery />
        </div>
      </section>

      <section className="py-5 bg-light-blue">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="info-card">
                <i className="bi bi-display"></i>
                <h5>Online training</h5>
                <p>Convenient for distributed teams, remote specialists and employees who need a flexible schedule.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-card">
                <i className="bi bi-building"></i>
                <h5>Classroom training</h5>
                <p>Structured learning with trainer support, group discussions, practical exercises and knowledge checks.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-card">
                <i className="bi bi-briefcase"></i>
                <h5>Corporate training</h5>
                <p>Programmes adapted to company needs, internal standards, workplace risks and team responsibilities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
