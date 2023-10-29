import { TPlayer } from "../types/types";
import { useNavigate } from "react-router-dom";

function PlayerCard({
  player,
  allPlayers,
}: {
  player: TPlayer;
  allPlayers: TPlayer[];
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-1 flex-col max-md:justify-center cursor-pointer"
      onClick={() => {
        navigate(
          { pathname: `/player-detail/${player.id}` },
          {
            state: {
              player: player,
              allplayers: allPlayers,
            },
          }
        );
      }}
    >
      <div className="h-[70%]">
        <img
          src={"/assets/icons/cricket-player.png"}
          className="h-[100%] object-contain w-full"
          alt={"cricketer"}
        />
      </div>

      <h3 className="mt-4 text-2xl leading-normal font-semibold font-palanquin w-[80%] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {player.name}
      </h3>

      <p className="mt-2 text-lg font-montserrat leading-normal w-[50%]">
        Points : <span>{player.points}</span>
      </p>
      <p className="mt-2 text-lg font-montserrat leading-normal w-[50%]">
        Rank : <span>{player.rank}</span>
      </p>
    </div>
  );
}

export default PlayerCard;
