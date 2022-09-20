import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Title, Description, Label } from "../styles/Container";

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
    <Container top="40%">
      <br />
      <Title color="#198754;">옷장등록 (회원가입)</Title>
      <Description color="#555" borderBottom="3px solid #198754">
        옷을 등록하기 위해 내 옷장을 등록하세요 !
      </Description>
      <br />
      <br />
      <Label>옷장 별명 (아이디)</Label>
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
    </Container>
  );
}

export default UserWallet;
