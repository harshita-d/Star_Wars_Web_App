import style from "./StarshipDetails.module.css";

function StarshipDetails(props) {
  const { starshipsData } = props;
  console.log("starshipsData", starshipsData);

  return (
    <div className={style.charactersContainer}>
      <div>
        <div>Model-</div>
        <span>{starshipsData.model}</span>
      </div>
      <div>
        <div>Passengers-</div>
        <span>{starshipsData.passengers}</span>
      </div>
      <div>
        <div>Cargo Capacity-</div>
        <span>{starshipsData.cargo_capacity}</span>
      </div>
      <div>
        <div>Hyperdrive Rating-</div>
        <span>{starshipsData.hyperdrive_rating}</span>
      </div>
      <div>
        <div>Length-</div>
        <span>{starshipsData.length}</span>
      </div>
      <div>
        <div>Cost-</div>
        <span>{starshipsData.cost_in_credits}</span>
      </div>
      <div>
        <div>Pilots-</div>
        {starshipsData?.pilots.length > 0 ? (
          starshipsData.pilots.map((item, index) => {
            <span key={index}>{item}</span>;
          })
        ) : (
          <span>Not Mentioned</span>
        )}
      </div>
    </div>
  );
}

export default StarshipDetails;
