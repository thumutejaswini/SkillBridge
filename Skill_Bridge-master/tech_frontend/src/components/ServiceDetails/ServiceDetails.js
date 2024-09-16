import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { name } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/service/${name}`);
        const data = response.data;
        setServices(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to fetch service details');
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (services.length === 0) return <div>No services found for {name}</div>;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
        <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '27px' }}>
</h1>
        </div>
        <div className="nav-right">
          <ul className={`nav-links`} id="navLinks">
            <li><Link to="/Home">Home</Link></li>
      
            <li><Link to="/shorts">Shorts</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booked-services">Booked Services</Link></li>
          </ul>
          <div className="profile">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>
      </nav>

      {/* Service Details */}
      <div className="service-details-container">
        <h1>{name}</h1>
        <h3>Number of {name}: {services.length}</h3>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-box">
              <div className="media-section">
                <div className="media-column">
                  <h4>Images:</h4>
                  {service.demoImages && service.demoImages.length > 0 ? (
                    service.demoImages.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`http://localhost:5000/uploads/${image}`}
                        alt={`Image ${imgIndex}`}
                        className="service-image"
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>

                <div className="media-column">
                  <h4>Videos:</h4>
                  {service.demoVideos && service.demoVideos.length > 0 ? (
                    service.demoVideos.map((video, videoIndex) => (
                      <video
                        key={videoIndex}
                        controls
                        src={`http://localhost:5000/uploads/${video}`}
                        className="service-video"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ))
                  ) : (
                    <p>No videos available</p>
                  )}
                </div>
              </div>

              <div className="details-section">
                <h2>{service.fullName}</h2>
                <p><strong>Email:</strong> {service.email}</p>
                <p><strong>Gender:</strong> {service.gender}</p>
                <p><strong>Price:</strong> {service.price}</p>
                <p><strong>About:</strong> {service.about}</p>
              </div>

              <Link to={`/booked-services`} state={{ service }}>
                <button className="btncal">Book Service</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
