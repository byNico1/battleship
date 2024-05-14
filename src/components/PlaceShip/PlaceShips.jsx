import { realPlayer } from "../../utils/playerInstance";
import PlaceShipGameBoard from "./PlaceShipGameBoard";

const PlaceShips = ({ shipSetted, setShipSetted, setStartGame }) => {
  return (
    <div>
      <h2>Place Your Ships</h2>
      <PlaceShipGameBoard
        player={realPlayer}
        //* It re-renders the component when I place a ship
        shipSetted={shipSetted}
        setShipSetted={setShipSetted}
        setStartGame={setStartGame}
      />
    </div>
  );
};

export default PlaceShips;
