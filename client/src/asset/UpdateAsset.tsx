import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { Container, Title, Description, Label } from "../styles/Container";

function UpdateAsset() {
  const [certValue, setCertValue] = useState("");
  const [idValue, setIdValue] = useState<string>("");
  const [colorValue, setColerValue] = useState<string>("");
  const [sizeValue, setSizeValue] = useState<number>();
  const [ownerValue, setOwnerValue] = useState<string>("");
  const [value, setValue] = useState<number>();
  const [makerValue, setMakerValue] = useState<string>();
  const [yearValue, setYearValue] = useState<number>();

  const onChangeCert = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertValue((e.target as HTMLInputElement).value);
    console.log(certValue);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColerValue((e.target as HTMLInputElement).value);
    console.log(colorValue);
  };

  const onChangeSize = (e: { target: { value: string } }): void => {
    setSizeValue(Number(e.target.value));
    console.log(sizeValue);
  };

  const onChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerValue((e.target as HTMLInputElement).value);
    console.log(ownerValue);
  };

  const onChangeValue = (e: { target: { value: string } }): void => {
    setValue(Number(e.target.value));
    console.log(value);
  };

  const onChangeMaker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMakerValue((e.target as HTMLInputElement).value);
    console.log(makerValue);
  };

  const onChangeYear = (e: { target: { value: string } }): void => {
    setYearValue(Number(e.target.value));
    console.log(yearValue);
  };

  const onClickUpdateAsset = async () => {
    let body = {
      cert: certValue,
      id: idValue,
      color: colorValue,
      size: sizeValue,
      owner: ownerValue,
      value: value,
      maker: makerValue,
      year: yearValue,
    };
    console.log(body);
    let closetUpdate = await axios.post("http://localhost:8080/update/", body);
    console.log(body);

    Swal.fire({
      title: "옷 정보수정 완료 ! 👕 🩳",
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#0dcaf0",
    });
    console.log(closetUpdate);
  };

  return (
    <Container top="50%">
      <br />
      <Title color="#0dcaf0">옷 정보 수정</Title>
      <Description borderBottom="3px solid #0dcaf0">
        등록된 옷중에 수정할 정보를 입력하세요!
      </Description>
      <br />
      <br />
      <Row>
        <Col>
          <Label>옷장 별명 (아이디)</Label>
          <input type="text" className="form-control" onChange={onChangeCert} />
          <br />
          <Label>등록할 의류 이름 (종류)</Label>
          <input type="text" className="form-control" onChange={onChangeId} />
          <br />
        </Col>
        <Col>
          <Label>옷 주인 이름</Label>
          <input
            type="text"
            className="form-control"
            onChange={onChangeOwner}
          />
          <br />
          <Label>제조사 (메이커)</Label>
          <input
            type="text"
            className="form-control"
            onChange={onChangeMaker}
          />
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>사이즈</Label>
          <input
            type="number"
            className="form-control"
            onChange={onChangeSize}
          />
          <br />
          <Label>구매 연도</Label>
          <input
            type="number"
            className="form-control"
            onChange={onChangeYear}
          />
          <br />
        </Col>
        <Col>
          <Label>색상</Label>
          <input
            type="text"
            className="form-control"
            onChange={onChangeColor}
          />
          <br />
          <Label>금액</Label>
          <input
            type="number"
            className="form-control"
            onChange={onChangeValue}
          />
          <br />
        </Col>
      </Row>
      <br />
      <button className="btn btn-info" onClick={onClickUpdateAsset}>
        옷 정보 수정
      </button>
    </Container>
  );
}

export default UpdateAsset;
