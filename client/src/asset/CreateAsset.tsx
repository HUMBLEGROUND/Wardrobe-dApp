import { useState } from "react";
import axios from "axios";

function CreateAsset() {
  // const [body, setBody] = useState<{}>({
  //   cert: "",
  //   id: "",
  //   color: "",
  //   size: "",
  //   owner: "",
  //   value: "",
  // });
  const [certValue, setCertValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [colorValue, setColerValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [ownerValue, setOwnerValue] = useState("");
  const [value, setValue] = useState("");

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

  const onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeValue((e.target as HTMLInputElement).value);
    console.log(sizeValue);
  };

  const onChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerValue((e.target as HTMLInputElement).value);
    console.log(ownerValue);
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
    console.log(value);
  };

  // const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBody((e.target as HTMLInputElement).value);
  //   console.log(body);
  // };

  const onClickCreateAsset = () => {
    let body = {
      cert: certValue,
      id: idValue,
      color: colorValue,
      size: sizeValue,
      owner: ownerValue,
      value: value,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/asset/", body)
      .then(res => console.log(res));
    console.log(body);
  };

  return (
    <div className="container">
      <br />
      <h1>자산생성페이지</h1>
      <p>자산생성에 필요한 정보를 입력하세요!</p>
      <br />

      <label className="form-label">인증서이름</label>
      <br />
      <input
        type="text"
        name="cert"
        className="form-control"
        onChange={onChangeCert}
      />
      <br />

      <label className="form-label">자산이름</label>
      <br />
      <input
        type="text"
        name="id"
        className="form-control"
        onChange={onChangeId}
      />
      <br />

      <label className="form-label">색상</label>
      <br />
      <input
        type="text"
        name="color"
        className="form-control"
        onChange={onChangeColor}
      />
      <br />

      <label className="form-label">크기</label>
      <br />
      <input
        type="text"
        name="size"
        className="form-control"
        onChange={onChangeSize}
      />
      <br />

      <label className="form-label">소유주</label>
      <br />
      <input
        type="text"
        name="owner"
        className="form-control"
        onChange={onChangeOwner}
      />
      <br />

      <label className="form-label">금액(자산값)</label>
      <br />
      <input
        type="text"
        name="value"
        className="form-control"
        onChange={onChangeValue}
      />
      <br />

      <button className="btn btn-primary" onClick={onClickCreateAsset}>
        관리자인증서생성
      </button>
    </div>
  );
}

export default CreateAsset;
