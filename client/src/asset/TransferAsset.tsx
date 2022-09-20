import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Title, Description, Label } from "../styles/Container";

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

  const onClickTransferAsset = async () => {
    let body = {
      cert: certValue,
      id: idValue,
      owner: ownerValue,
    };
    console.log(body);
    let closetSale = await axios.post("http://localhost:8080/transfer/", body);
    console.log(body);

    if (closetSale.data.result === "failed") {
      Swal.fire({
        title: "등록 되지 않은 별명입니다 !",
        text: "옷장 별명을 다시 확인해주세요 !",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#910",
      });
    } else {
      Swal.fire({
        title: "옷 판매 완료 ! 👕 🩳",
        text: "옷 주인이 변경되었습니다 !",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#212529",
      });
    }

    console.log(closetSale);
  };

  return (
    <Container top="50%">
      <br />
      <Title color="#212529">옷 판매하기</Title>
      <Description color="#555" borderBottom="3px solid #212529">
        등록된 옷중에 판매할 옷을 입력하세요!
      </Description>
      <br />
      <br />

      <Label>옷장 별명 (아이디)</Label>
      <input type="text" className="form-control" onChange={onChangeCert} />
      <br />

      <Label>등록된 의류 이름 (종류)</Label>
      <input type="text" className="form-control" onChange={onChangeId} />
      <br />

      <Label>변경될 주인 이름</Label>
      <input
        type="text"
        id="owner"
        className="form-control"
        onChange={onChangeOwner}
      />
      <br />

      <br />
      <br />
      <button className="btn btn-dark" onClick={onClickTransferAsset}>
        옷 판매하기
      </button>
    </Container>
  );
}

export default TransferAsset;
