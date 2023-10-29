import { ColumnType } from "antd/es/table";
import { TPlayer } from "../types/types";
import { playerType } from "./enums";

export const playerListColumns: Function = (
  onCLickName: Function
): ColumnType<TPlayer>[] => {
  return [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: TPlayer) => (
        <a onClick={() => onCLickName(record)}>{text}</a>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      render: (text: string, record: TPlayer) => <a>{playerType[text]}</a>,
    },
    {
      title: "POINTS",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "AGE",
      dataIndex: "age",
      key: "age",
      render: (text: string, record: TPlayer) => {
        return (
          <span>
            {record?.dob &&
              new Date().getFullYear() -
                new Date(record?.dob).getFullYear()}{" "}
            Years
          </span>
        );
      },
    },
    {
      title: "RANK",
      dataIndex: "rank",
      key: "rank",
    },
  ];
};
