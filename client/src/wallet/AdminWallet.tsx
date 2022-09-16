import { useState } from "react";
import axios from "axios";

function AdminWallet() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue((e.target as HTMLInputElement).value);
    console.log(pwValue);
  };

  const onClickAdminCert = () => {
    let body = {
      id: idValue,
      password: pwValue,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/admin/", body)
      .then(res => console.log(res));
  };

  return (
    <div className="container">
      <br />
      <h1>관리자 인증서 발급 페이지</h1>
      <p>관리자 인증서 발급에 필요한 정보를 입력해주세요</p>
      <br />
      <label className="form-label">ID</label>
      <input className="form-control" type="text" onChange={onChangeId} />
      <br />
      <br />
      <label className="form-label">PASSWORD</label>
      <input className="form-control" type="password" onChange={onChangePw} />
      <br />
      <button className="btn btn-danger" onClick={onClickAdminCert}>
        관리자인증서생성
      </button>
    </div>
  );
}

export default AdminWallet;
