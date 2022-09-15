import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="container">
      <br />
      <h1>Welcome to Simple Asset Transfer Basic !</h1>
      <p>자산관리 사이트에 오신것을 환영합니다!</p>
      <Link to="/admin">
        <div className="btn btn-danger">관리자 지갑 생성</div>
      </Link>
      <br />
      <br />
      <Link to="/users">
        <div className="btn btn-success">사용자 지갑 생성</div>
      </Link>
      <br />
      <br />
      <Link to="/create">
        <div className="btn btn-success">자산 생성</div>
      </Link>
      <br />
      <br />
      <Link to="/delete">
        <div className="btn btn-danger">자산 삭제</div>
      </Link>
    </div>
  );
}

export default Main;
