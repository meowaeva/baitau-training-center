const ServiceCard = ({ service, onApply }) => {
  return (
    <div className="card service-card h-100 border-0 shadow-sm">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <span className="badge bg-primary-subtle text-primary">{service.category}</span>
          {service.isPopular && <span className="badge text-bg-warning">Popular</span>}
        </div>
        <h5 className="fw-bold">{service.title}</h5>
        <p className="text-secondary flex-grow-1">{service.description}</p>
        <ul className="list-unstyled small text-secondary mb-4">
          <li><i className="bi bi-clock text-primary me-2"></i>{service.duration}</li>
          <li><i className="bi bi-mortarboard text-primary me-2"></i>{service.format}</li>
          <li><i className="bi bi-bar-chart text-primary me-2"></i>{service.level}</li>
        </ul>
        <button className="btn btn-outline-primary w-100" onClick={() => onApply(service.title)}>
          Request this course
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
