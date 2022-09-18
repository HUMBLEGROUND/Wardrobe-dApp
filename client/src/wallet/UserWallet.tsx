import { useState } from "react";
import axios from "axios";
import "../styles/UserWallet.css";
import Swal from "sweetalert2";

function UserWallet() {
  const [idValue, setIdValue] = useState<any>("");

  const onChangeTargetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue((e.target as HTMLInputElement).value);
    console.log(idValue);
  };

  const userrole = "client";

  const onClickUserCert = async () => {
    let body = {
      id: idValue,
      userrole,
    };
    console.log(body);
    let userCert = await axios.post("http://localhost:8080/user/", body);
    if (userCert.data.result === "failed") {
      Swal.fire({
        title: "이미 등록된 별명입니다 !",
        text: "옷을 등록하세요 ! 🥼 👖",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#198754",
      });
    } else {
      Swal.fire({
        title: "옷장등록 완료 !",
        text: "옷을 등록하세요 ! 🥼 👖",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#198754",
      });
    }
  };

  return (
    <div className="user_container">
      <br />
      <div className="user_title">옷장등록 (회원가입)</div>
      <div className="user_description">
        옷을 등록하기 위해 내 옷장을 등록하세요 !
      </div>
      <br />
      <br />
      <label className="form-label">옷장 별명 (아이디)</label>
      <input
        type="text"
        className="form-control"
        onChange={onChangeTargetValue}
      />
      <br />
      <br />
      <button className="btn btn-success" onClick={onClickUserCert}>
        옷장 등록하기
      </button>
    </div>
  );
}

export default UserWallet;
