import { useState } from "react";
import axios from "axios";

function ReadAsset() {
  const [certValue, setCertValue] = useState<any>("");
  const [idValue, setIdValue] = useState<any>("");

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
      .then(res => console.log(res));
  };

  const onClickAssetAllRead = () => {
    let cert = certValue;
    console.log(cert);
    axios
      .get("http://localhost:8080/assets/", cert)
      .then(res => console.log(res));
  };

  return (
    <div className="container">
      <br />
      <h1>자산조회페이지</h1>
      <p>자산조회에 필요한 정보를 입력하시오</p>
      <br />

      <label className="form-label"> 인증서이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />
      <label className="form-label"> 자산이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeId} />
      <br />
      <br />
      <button className="btn btn-primary" onClick={onClickAssetRead}>
        자산조회
      </button>
      <button className="btn btn-warning" onClick={onClickAssetAllRead}>
        모든자산조회
      </button>
    </div>
  );
}

export default ReadAsset;
