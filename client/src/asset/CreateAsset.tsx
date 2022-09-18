import { useState } from "react";
import axios from "axios";
import "../styles/CreateAsset.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

function CreateAsset() {
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

  const onClickCreateAsset = async () => {
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

    let closetAdd = await axios.post("http://localhost:8080/asset/", body);

    if (closetAdd.data.result === "failed") {
      Swal.fire({
        title: "이미 등록된 의류 이름 입니다 !",
        text: "이름을 다르게 등록하세요! ex) 후드티1, 후드티2",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#790",
      });
    } else if (closetAdd.data === "noCert") {
      Swal.fire({
        title: "등록 되지 않은 별명입니다 !",
        text: "옷장 별명을 다시 확인해주세요 !",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#910",
      });
    } else {
      Swal.fire({
        title: "옷 등록 완료 ! 👕 🩳",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#0d6efd",
      });
    }
    console.log(closetAdd);
  };

  return (
    <div className="create_wrapper">
      <div className="create_container">
        <br />
        <div className="create_title">옷 등록하기</div>
        <div className="create_description">
          옷장에서 꺼내서 나온 정보를 입력하세요!
        </div>
        <br />
        <br />
        <Row>
          <Col>
            <label className="form-label">옷장 별명 (아이디)</label>
            <br />
            <input
              type="text"
              className="form-control"
              onChange={onChangeCert}
            />
            <br />
            <label className="form-label">등록할 의류 이름 (종류)</label>
            <br />
            <input type="text" className="form-control" onChange={onChangeId} />
            <br />
          </Col>
          <Col>
            <label className="form-label">옷 주인 이름</label>
            <br />
            <input
              type="text"
              className="form-control"
              onChange={onChangeOwner}
            />
            <br />
            <label className="form-label">제조사 (메이커)</label>
            <br />
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
            <label className="form-label">사이즈</label>
            <br />
            <input
              type="number"
              className="form-control"
              onChange={onChangeSize}
            />
            <br />

            <label className="form-label">구매 연도</label>
            <br />
            <input
              type="number"
              className="form-control"
              onChange={onChangeYear}
            />
            <br />
          </Col>
          <Col>
            <label className="form-label">색상</label>
            <br />
            <input
              type="text"
              className="form-control"
              onChange={onChangeColor}
            />
            <br />
            <label className="form-label">금액</label>
            <br />
            <input
              type="number"
              className="form-control"
              onChange={onChangeValue}
            />
            <br />
          </Col>
        </Row>
        <br />
        <button className="btn btn-primary" onClick={onClickCreateAsset}>
          옷 등록하기
        </button>
      </div>
    </div>
  );
}

export default CreateAsset;
