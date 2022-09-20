import { useState } from "react";
import axios from "axios";
import { Container, Title, Description, Label } from "../styles/Container";

function ReadAsset() {
  const [certValue, setCertValue] = useState<any>("");

  const onChangeCert = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertValue((e.target as HTMLInputElement).value);
    console.log(certValue);
  };

  const onClickAssetRead = () => {
    axios
      .get("http://localhost:8080/assets/", {
        params: {
          cert: certValue,
        },
      })
      .then(res => console.log(res));
  };

  return (
    <Container top="40%">
      <br />
      <Title color="#ffc107">옷 목록 조회</Title>
      <Description color="#555" borderBottom="3px solid #ffc107">
        등록된 모든 옷을 조회 해보세요!
      </Description>
      <br />
      <br />
      <Label>옷장 별명 (아이디)</Label>
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />
      <br />
      <button className="btn btn-warning" onClick={onClickAssetRead}>
        옷 목록 조회
      </button>
    </Container>
  );
}

export default ReadAsset;
