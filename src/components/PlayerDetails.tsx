import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TPlayer } from "../types/types";
import { playerType } from "../common/enums";
import PlayerCard from "./PlayerCard";

function PlayerDetails() {
  const location = useLocation();
  const [details, setDetails] = useState<TPlayer>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [playersList, setPlayersList] = useState<TPlayer[]>();
  useEffect(() => {
    setDetails(location?.state?.player);
    let sameTypeProducts = location?.state?.allplayers?.filter(
      (item: TPlayer, index: number) =>
        item.type === location?.state?.player.type &&
        item.id !== location?.state?.player.id
    );
    setPlayersList(sameTypeProducts);
  }, [id]);

  return (
    <section className=" text-white px-10 py-5">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center gap-2 justify-end cursor-pointer"
      >
        <img
          className="w-[33px] h-[33px]"
          src={"/assets/icons/left-arrow.png"}
        ></img>
        <span className="text-xl">{"Back To Players"}</span>
      </div>
      <div className="flex gap-10 mt-16">
        <div className="max-w-[20rem]">
          <img src={"/assets/icons/cricket-player.png"}></img>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{details?.name}</h1>
          <p className="mt-4 w-[80%] leading-relaxed">{details?.description}</p>
          <div className="flex flex-row flex-wrap mt-4 gap-10">
            <p className="  leading-relaxed">
              <strong>Role : </strong>
              {details?.type && playerType[details?.type]}
            </p>
            <p className="">
              <strong>Points : </strong>
              {details?.points}
            </p>
            <p className="">
              <strong>Rank : </strong>
              {details?.rank}
            </p>
            <p className="">
              <strong>DOB : </strong>
              {details?.dob &&
                new Date(details?.dob).getDay() +
                  " / " +
                  new Date(details?.dob).getMonth() +
                  " / " +
                  new Date(details?.dob).getFullYear()}
            </p>
            <p className="">
              <strong>Age : </strong>
              {details?.dob &&
                new Date().getFullYear() - new Date(details?.dob).getFullYear()}
              {" Years"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-32">
        <h3 className="text-3xl leading-loose">People Also Viewed</h3>
        <div className="gap-3 mt-5 grid lg:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {playersList &&
            playersList.slice(0, 5).map((player, index) => {
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  allPlayers={location.state.allplayers}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default PlayerDetails;
