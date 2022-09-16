import { useState } from "react";
import axios from "axios";

function UpdateAsset() {
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

  const onClickUpdateAsset = () => {
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
      .post("http://localhost:8080/update/", body)
      .then(res => console.log(res));
    console.log(body);
  };

  return (
    <div className="container">
      <br />
      <h1>자산변경페이지</h1>
      <p>자산변경에 필요한 정보를 입력하시오</p>
      <br />

      <label className="form-label"> 인증서이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />

      <label className="form-label"> 자산이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeId} />
      <br />

      <label className="form-label"> 색상 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeColor} />
      <br />

      <label className="form-label"> 크기 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeSize} />
      <br />

      <label className="form-label"> 소유주 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeOwner} />
      <br />

      <label className="form-label"> 금액(자산값) </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeValue} />

      <br />
      <br />
      <button className="btn btn-primary" onClick={onClickUpdateAsset}>
        자산변경
      </button>
    </div>
  );
}

export default UpdateAsset;
