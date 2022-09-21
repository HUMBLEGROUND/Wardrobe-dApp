import { FC } from "react";

export interface ListProps {
  id: string;
  value: number;
  color: string;
  maker: string;
  owner: string;
  size: number;
  year: number;
}

const ReadList: FC<ListProps> = ({
  id,
  value,
  color,
  maker,
  owner,
  size,
  year,
}) => {
  return (
    <tbody>
      <tr>
        <th>옷 주인 이름</th>
        <td>{owner}</td>
      </tr>
      <tr>
        <th>의류 이름(종류)</th>
        <td>{id}</td>
      </tr>
      <tr>
        <th>제조사(메이커)</th>
        <td>{maker}</td>
      </tr>
      <tr>
        <th>색상</th>
        <td>{color}</td>
      </tr>
      <tr>
        <th>사이즈</th>
        <td>{size}</td>
      </tr>
      <tr>
        <th>구매 연도</th>
        <td>{year} 년</td>
      </tr>
      <tr>
        <th>금액</th>
        <td>{value} 원</td>
      </tr>
    </tbody>
  );
};

export default ReadList;
