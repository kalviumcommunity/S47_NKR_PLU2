const DestinationCard = ({ title, description, imageUrl }) => (
    <div className="destination-card">
      <img src={imageUrl} alt={`${title} Image`} className="destination-image" />
      <h2 className="destination-title">{title}</h2>
      <p className="destination-description">{description}</p>
    </div>
  );

export default DestinationCard;