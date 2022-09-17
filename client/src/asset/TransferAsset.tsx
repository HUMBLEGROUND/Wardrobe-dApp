import { useState } from "react";
import axios from "axios";

function TransferAsset() {
  const [certValue, setCertValue] = useState<any>("");
  const [idValue, setIdValue] = useState<any>("");
  const [ownerValue, setOwnerValue] = useState<any>("");

  const onChangeCert = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertValue((e.target as HTMLInputElement).value);
    console.log(certValue);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerValue((e.target as HTMLInputElement).value);
    console.log(ownerValue);
  };

  const onClickTransferAsset = () => {
    let body = {
      cert: certValue,
      id: idValue,
      owner: ownerValue,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/transfer/", body)
      .then(res => console.log(res));
    console.log(body);
  };

  return (
    <div className="container">
      <br />
      <h1>소유주변경페이지</h1>
      <p>소유주변경에 필요한 정보를 입력하시오</p>
      <br />

      <label className="form-label"> 인증서이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />

      <label className="form-label"> 자산이름 </label>
      <br />
      <input type="text" className="form-control" onChange={onChangeId} />
      <br />

      <label className="form-label"> 변경소유주 </label>
      <br />
      <input
        type="text"
        id="owner"
        className="form-control"
        onChange={onChangeOwner}
      />
      <br />

      <br />
      <br />
      <button className="btn btn-danger" onClick={onClickTransferAsset}>
        소유주변경
      </button>
    </div>
  );
}

export default TransferAsset;
