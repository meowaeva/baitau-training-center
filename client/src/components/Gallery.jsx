const galleryItems = [
  {
    icon: 'bi-people-fill',
    title: 'Corporate Groups',
    text: 'Training for teams at the client site, in a classroom, or in an online format.'
  },
  {
    icon: 'bi-clipboard-check',
    title: 'Practical Exercises',
    text: 'Real cases, checklists, simulations and workplace-focused tasks.'
  },
  {
    icon: 'bi-award-fill',
    title: 'Certificates',
    text: 'Course completion documents and preparation for recognised training standards.'
  },
  {
    icon: 'bi-building-check',
    title: 'Consulting Support',
    text: 'Guidance for improving internal procedures, safety culture and staff competence.'
  }
];

const Gallery = () => {
  return (
    <div className="row g-4">
      {galleryItems.map(item => (
        <div className="col-md-6 col-lg-3" key={item.title}>
          <div className="gallery-tile h-100">
            <i className={`bi ${item.icon}`}></i>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
