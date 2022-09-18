import { useState } from "react";
import axios from "axios";
import "../styles/CreateAsset.css";

function CreateAsset() {
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

  const onClickCreateAsset = () => {
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
      .post("http://localhost:8080/asset/", body)
      .then(res => console.log(res));
    console.log(body);
  };

  return (
    <div className="create_wrapper">
      <div className="create_container">
        <br />
        <div className="create_title">옷 등록하기</div>
        <div className="create_description">
          옷장에서 꺼내서 나온 정보를 입력하세요!
        </div>
        <br />

        <label className="form-label">내 아이디</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeCert} />
        <br />

        <label className="form-label">등록할 의류 이름</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeId} />
        <br />

        <label className="form-label">색상</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeColor} />
        <br />

        <label className="form-label">사이즈</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeSize} />
        <br />

        <label className="form-label">소유주 아이디</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeOwner} />
        <br />

        <label className="form-label">금액</label>
        <br />
        <input type="text" className="form-control" onChange={onChangeValue} />
        <br />

        <button className="btn btn-primary" onClick={onClickCreateAsset}>
          옷등록하기
        </button>
      </div>
    </div>
  );
}

export default CreateAsset;
