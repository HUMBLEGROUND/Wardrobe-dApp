import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <Link to="/users">
        <div className="btn btn-success">사용자 지갑 생성</div>
      </Link>
    </>
  );
}

export default Main;
