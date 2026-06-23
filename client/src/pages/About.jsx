const About = () => {
  return (
    <>
      <section className="page-hero py-5">
        <div className="container">
          <span className="badge text-bg-light text-primary border mb-3">About Baitau Partners</span>
          <h1 className="fw-bold display-6">Training centre for corporate competence and safety culture</h1>
          <p className="lead text-white-75 mb-0">
            Baitau Partners supports companies through professional training, HSE consulting, international course preparation and practical workplace-focused programmes.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold">What the centre does</h2>
              <p className="text-secondary">
                Baitau Partners provides training solutions for organisations in energy, construction, manufacturing, logistics, services and other sectors where competence, safety and compliance matter.
              </p>
              <p className="text-secondary">
                The centre works with corporate groups, managers, technical specialists and HSE teams. Programmes may include theoretical modules, practical exercises, case discussions, tests and recommendations for further competence growth.
              </p>
              <p className="text-secondary">
                The main purpose is to help companies reduce workplace risks, improve decision-making, develop responsible leadership and create a safer working environment.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6"><div className="stat-card"><strong>HSE</strong><span>Training and consulting</span></div></div>
                <div className="col-6"><div className="stat-card"><strong>ISO</strong><span>Management systems</span></div></div>
                <div className="col-6"><div className="stat-card"><strong>IEMA</strong><span>Environmental programmes</span></div></div>
                <div className="col-6"><div className="stat-card"><strong>IOSH</strong><span>Safety leadership</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light-blue">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-primary-subtle text-primary mb-2">Values</span>
            <h2 className="fw-bold">What makes the training useful for clients</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="info-card">
                <i className="bi bi-person-workspace"></i>
                <h5>Workplace relevance</h5>
                <p>Programmes are connected with real roles, daily tasks, workplace risks and practical responsibilities.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <i className="bi bi-shield-check"></i>
                <h5>Safety culture</h5>
                <p>Training helps employees understand risk, follow safe procedures and make responsible decisions.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <i className="bi bi-graph-up-arrow"></i>
                <h5>Measurable improvement</h5>
                <p>Clients can use training results to plan future courses, internal briefings and competence improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2 className="fw-bold">Core areas</h2>
              <div className="accordion" id="aboutAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#itemOne">
                      Occupational health, safety and environment
                    </button>
                  </h2>
                  <div id="itemOne" className="accordion-collapse collapse show" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body text-secondary">
                      Training for HSE specialists, supervisors, managers and employees who need to understand risk control, safe work procedures and environmental responsibility.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itemTwo">
                      International and professional programmes
                    </button>
                  </h2>
                  <div id="itemTwo" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body text-secondary">
                      Preparation and support for recognised programmes such as NEBOSH, IOSH, IEMA and other competence-focused courses.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itemThree">
                      Management, HR and business skills
                    </button>
                  </h2>
                  <div id="itemThree" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body text-secondary">
                      Programmes for leaders, HR teams and departments that need stronger communication, teamwork, planning and staff training practices.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="blue-panel p-4 h-100">
                <h4 className="fw-bold">Client approach</h4>
                <p className="text-secondary">
                  Baitau Partners focuses on practical outcomes. Before training, the client can clarify the objective, audience, schedule and expected result. After training, the company can plan further steps for employee training and internal improvement.
                </p>
                <ul className="list-unstyled text-secondary mb-0">
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Training for different levels of responsibility</li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Programmes for classroom, online and corporate delivery</li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Practical tasks, discussions and knowledge checks</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i>Consulting support for internal safety and management processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
