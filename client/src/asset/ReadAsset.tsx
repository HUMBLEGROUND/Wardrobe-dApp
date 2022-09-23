import { useState } from "react";
import axios from "axios";
import { Container, Title, Description, Label } from "../styles/Container";
import ReadList from "../pages/ReadList";
import { Table } from "react-bootstrap";

function ReadAsset() {
  const [certValue, setCertValue] = useState<any>("");
  const [idValue, setIdValue] = useState<any>("");
  const [response, setResponse] = useState<any>("failed");
  const [list, setList] = useState<any>([]);

  const onChangeCert = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertValue((e.target as HTMLInputElement).value);
    console.log(certValue);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onClickAssetRead = () => {
    axios
      .get("http://localhost:8080/assets/", {
        params: {
          cert: certValue,
          id: idValue,
        },
      })
      .then(res => {
        if (res.data.result == "success") {
          for (let i = 0; i < res.data.msg.length; i++) {
            setList(res.data.msg[i]);
          }
          setResponse(res.data.result);
        }
      });
  };

  console.log(response);

  console.log(list);

  return (
    <Container top="50%">
      <br />
      <Title color="#ffc107">옷 정보 조회</Title>
      <Description color="#555" borderBottom="3px solid #ffc107">
        등록된 옷을 조회 해보세요!
      </Description>
      <br />
      <br />
      <Label>옷장 별명 (아이디)</Label>
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />
      <Label>등록된 의류 이름 (종류)</Label>
      <input type="text" className="form-control" onChange={onChangeId} />
      <br />
      <button className="btn btn-warning" onClick={onClickAssetRead}>
        옷 정보 조회
      </button>
      <br />
      <br />
      {/* <div>
        {response === "failed"
          ? null
          : list.map((res: any, index: number) => {
              <ReadList
                key={index}
                id={res.ID}
                value={res.appraisedValue}
                color={res.color}
                maker={res.maker}
                owner={res.owner}
                size={res.size}
                year={res.year}
              />;
            })}
      </div> */}
      <Description borderBottom="3px solid #ffc107"></Description>
      <br />
      <Table>
        {response === "failed" ? null : (
          <ReadList
            id={list.ID}
            value={list.appraisedValue}
            color={list.color}
            maker={list.maker}
            owner={list.owner}
            size={list.size}
            year={list.year}
            image={list.image}
          />
        )}
      </Table>
    </Container>
  );
}

export default ReadAsset;
