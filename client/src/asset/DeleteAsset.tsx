import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Title, Description, Label } from "../styles/Container";

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

  const onClickDeleteAsset = async () => {
    let body = {
      cert: certValue,
      id: idValue,
    };
    console.log(body);
    let closetDelete = await axios.post("http://localhost:8080/delete/", body);

    if (closetDelete.data === "noCert") {
      Swal.fire({
        title: "등록 되지 않은 별명입니다 !",
        text: "옷장 별명을 다시 확인해주세요 !",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#dc3545",
      });
    } else {
      Swal.fire({
        title: "옷 삭제 완료 !",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <Container top="45%">
      <br />
      <Title color="#dc3545">옷 기록삭제</Title>
      <Description color="#555" borderBottom="3px solid #dc3545">
        등록된 옷중에 삭제할 옷을 입력하세요!
      </Description>
      <br />
      <br />
      <Label>옷장 별명 (아이디)</Label>
      <input
        type="text"
        className="form-control"
        onChange={onChangeCertValue}
      />
      <br />
      <Label>등록된 의류 이름 (종류)</Label>
      <input type="text" className="form-control" onChange={onChangeIdValue} />
      <br />
      <br />
      <div className="btn btn-danger" onClick={onClickDeleteAsset}>
        자산 삭제
      </div>
    </Container>
  );
}

export default DeleteAsset;
