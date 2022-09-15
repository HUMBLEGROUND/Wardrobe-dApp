import { useState } from "react";
import axios from "axios";

function DeleteAsset() {
  const [certValue, setCertValue] = useState("");
  const [idValue, setIdValue] = useState("");

  const onChangeCertValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertValue((e.target as HTMLInputElement).value);
    console.log(certValue);
  };

  const onChangeIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onClickDeleteAsset = () => {
    let body = {
      cert: certValue,
      id: idValue,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/delete/", body)
      .then(res => console.log(res));
  };

  return (
    <div className="container">
      <br />
      <h1>자산삭제페이지</h1>
      <p>자산조회에 필요한 정보를 입력하시오</p>
      <br />
      <label className="form-label"> 인증서이름 </label>
      <br />
      <input
        type="text"
        className="form-control"
        onChange={onChangeCertValue}
      />
      <br />
      <label className="form-label"> 자산이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeIdValue} />
      <br />
      <br />
      <div className="btn btn-danger" onClick={onClickDeleteAsset}>
        자산 삭제
      </div>
    </div>
  );
}

export default DeleteAsset;
