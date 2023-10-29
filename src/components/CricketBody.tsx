import { Checkbox, Pagination, Skeleton, Table } from "antd";
import { playerListColumns } from "../common/colums";
import { TPlayer, TPlayerType } from "../types/types";
import { useEffect, useRef, useState } from "react";
import getPlayers from "../api/get-players";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";

type sortItem = { label: string; value: string };

function CricketBody() {
  const [playersList, setPlayersList] = useState<TPlayer[]>();
  const [showNavMenu, setShowMenu] = useState(false);
  const [showFilterMenu, setFilterMneu] = useState(false);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [playerSearchName, setPlayerSearchName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const sortBy = useRef<any>();
  const filterBy = useRef<any>();
  const allPlayerList = useRef<TPlayer[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers().then((res: TPlayer[]) => {
      let input = window.localStorage.getItem("searchInp");
      let filters = window.localStorage.getItem("filtertags");
      allPlayerList.current = res;
      input ? onSearchPlayer(input) : onSearchPlayer("");
      filters && filters.length > 0 && setFilterTags(JSON.parse(filters));

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("click", e => {
      e.stopPropagation();
      if (e.target !== sortBy.current) {
        setShowMenu(false);
      }
      if (e.target !== filterBy.current) {
        setFilterMneu(false);
      }
    });
  }, []);

  useEffect(() => {
    let filterList;
    if (playerSearchName && playerSearchName?.length <= 0) {
      filterList = allPlayerList.current;
    } else {
      filterList =
        allPlayerList?.current &&
        allPlayerList?.current.filter((player, index) => {
          return player.name && player.name.startsWith(playerSearchName);
        });
    }

    if (filterTags && filterTags.length > 0) {
      filterList = filterList?.filter((player, index) => {
        if (filterTags.length <= 0) {
          return true;
        } else if (player?.type) {
          return filterTags.includes(player?.type);
        }
        return false;
      });
    }

    setPlayersList(filterList);
  }, [playerSearchName, filterTags]);

  const itemRender = (
    _: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <a className="text-white">{"<"}</a>;
    }
    if (type === "next") {
      return <a className="text-white">{">"} </a>;
    }

    return originalElement;
  };
  return (
    <div className="px-[8rem] pt-10 max-md:p-5">
      <div className="flex justify-between max-md:flex-col max-md:gap-3">
        <h1 className=" text-white text-3xl font-semibold ">Cricketers List</h1>
        <div className="flex gap-8 max-sm:gap-3 ">
          <SearchField
            placeholder="Search Player By Name"
            onSearch={onSearchPlayer}
          />
          <div
            ref={filterBy}
            className="flex relative"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="flex gap-2 cursor-pointer items-center"
              onClick={() => {
                setFilterMneu(!showFilterMenu);
              }}
            >
              <span className="text-white font-semibold">{"Filter"}</span>
              <img src={"/assets/icons/filter.svg"} alt="filter" />
            </div>
            {showFilterMenu && (
              <ul className="bg-[#384883] opacity-95 absolute flex-col  list-none shadow-xl py-1 z-20  gap-1  right-[-40px] top-[40px]">
                <div className="py-1 px-7 text-[#d99a29] w-full">
                  Player Type
                </div>
                {[
                  {
                    label: "Batsman",
                    value: "batsman",
                  },
                  {
                    label: "Bowler",
                    value: "bowler",
                  },
                  { label: "Allrounder", value: "allRounder" },
                  { label: "Wicketkeeper", value: "wicketKeeper" },
                ].map((item: sortItem, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-white  hover:text-black hover:bg-[#d99a29] py-1 px-7 front-montserrat leading-normal text-lg whitespace-nowrap "
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterTags.includes(item.value)}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (event.target.checked) {
                            let tags = [...filterTags, item.value];
                            setFilterTags(tags);
                            window.localStorage.setItem(
                              "filtertags",
                              JSON.stringify(tags)
                            );
                          } else {
                            let tags = filterTags.filter((tag, index) => {
                              return tag !== item.value;
                            });
                            setFilterTags(tags);
                            window.localStorage.setItem(
                              "filtertags",
                              JSON.stringify(tags)
                            );
                          }
                        }}
                        className=" cursor-pointer"
                      />{" "}
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            ref={sortBy}
            className="flex gap-2 cursor-pointer items-center relative"
            onClick={e => {
              e.stopPropagation();
              setShowMenu(!showNavMenu);
            }}
          >
            <span className="text-white font-semibold">{"Sort By"}</span>
            <img
              src={"/assets/icons/expand.svg"}
              alt="expand"
              className="h-[15px] w-[15px]"
            />
            {showNavMenu && (
              <ul className="bg-[#384883] opacity-90 absolute flex-col  list-none shadow-xl py-1 z-20  gap-1  right-[-40px] top-[40px]">
                {[
                  {
                    label: "Name",
                    value: "name",
                  },
                  {
                    label: "Rank",
                    value: "rank",
                  },
                  { label: "Age", value: "dob" },
                ].map((item: sortItem, index) => (
                  <li
                    onClick={e => {
                      sortList(e, item);
                    }}
                    key={index}
                    className="text-white hover:text-black hover:bg-[#d99a29] py-1 px-7 front-montserrat leading-normal text-lg hover:text-slate-gray whitespace-nowrap"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {!loading ? (
        <Table
          rowClassName={(record, index) => {
            return index % 2 == 0
              ? "bg-[#0F1939] hover:bg-none"
              : "bg-[#1E2746] hover:bg-none";
          }}
          rowKey={"id"}
          bordered={false}
          className="ln-table mt-5"
          columns={playerListColumns(onclickName)}
          dataSource={playersList}
          pagination={
            playersList && playersList?.length > 10
              ? { itemRender: itemRender }
              : false
          }
        />
      ) : (
        <Skeleton
          active={true}
          className="mt-5"
          paragraph={{ rows: 10, width: ["100%"] }}
        />
      )}
    </div>
  );

  function onclickName(player: TPlayer) {
    navigate(
      { pathname: `/player-detail/${player.id}` },
      {
        state: {
          player: player,
          allplayers: allPlayerList.current,
        },
      }
    );
  }

  function onSearchPlayer(playerName: string) {
    setPlayerSearchName(playerName);
  }

  function sortList(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: sortItem
  ) {
    e.stopPropagation();
    setShowMenu(!showNavMenu);
    if (item?.value == "name") {
      //your logic for name
      let sortedPlayers = playersList?.sort((a: TPlayer, b: TPlayer) => {
        if (a.name && b.name && a.name > b.name) {
          return 1;
        }
        if (a[item?.value] < b[item?.value]) {
          return -1;
        }
        return 0;
      });
      sortedPlayers && setPlayersList([...sortedPlayers]);
    } else {
      //your logic for age
      let sortedPlayers = playersList?.sort((a: TPlayer, b: TPlayer) => {
        if (item?.value == "dob" && b?.["dob"] && a?.["dob"]) {
          return b["dob"] - a["dob"];
        }
        return a[item?.value] - b[item?.value];
      });
      sortedPlayers && setPlayersList([...sortedPlayers]);
    }
  }
}

export default CricketBody;
