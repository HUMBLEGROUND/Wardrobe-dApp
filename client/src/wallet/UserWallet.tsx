import { useState } from "react";
import axios from "axios";

function UserWallet() {
  const [idValue, setIdValue] = useState("");
  const [rollValue, setRollValue] = useState("");

  const onChangeTargetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const onChangeTargetValueClient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRollValue((e.target as HTMLInputElement).value);
    console.log(rollValue);
  };

  const onClickUserCert = () => {
    let body = {
      id: idValue,
      userrole: rollValue,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/user/", body)
      .then(res => console.log(res));
  };

  return (
    <div className="container">
      <br />
      <h1>사용자 인증서 발급 페이지</h1>
      <p>관리자 인증을 위한 ID와 Role을 입력하시오.</p>
      <br />
      <label className="form-label">ID</label>
      <input
        type="text"
        className="form-control"
        onChange={onChangeTargetValue}
      />
      <br />
      <label className="form-label">ROLE</label>
      <input
        type="text"
        className="form-control"
        onChange={onChangeTargetValueClient}
      />
      <br />
      <button className="btn btn-primary" onClick={onClickUserCert}>
        사용자 인증서 생성
      </button>
    </div>
  );
}

export default UserWallet;
