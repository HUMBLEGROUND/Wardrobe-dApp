// 1. 모듈포함
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const FabricCAServices = require("fabric-ca-client");
const { Gateway, Wallets } = require("fabric-network");

// 2. connection.json 객체화
const ccpPath = path.resolve(__dirname, "ccp", "connection-org1.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

// 3. 서버 설정
const app = express();
const PORT = 8080;
const HOST = "0.0.0.0";

app.use(bodyParser.json({ limit: 5000000 }));
// 에러코드 413 👉 PayloadTooLargeError: request entity too large
// Node.js에서 bodyParser는 아래와 같이 기본으로 100kb까지 저장가능
// 5MB 로 용량을 늘려준다
// 👉 이미지파일이 담길공간

app.use(cors()); // cors 에러수정

app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  "/" GET 라우팅
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

//-----------------------------------
// 관리자 인증서 발급
// /admin POST 라우팅 ( id, password )
app.post("/admin", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;

  console.log(id, pw);

  try {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(id);
    if (identity) {
      console.log(
        `An identity for the admin user ${id} already exists in the wallet`
      );
      const res_str = `{"result":"failed","msg":"An identity for the admin user ${id} already exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: id,
      enrollmentSecret: pw,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put(id, x509Identity);

    // response to client
    console.log(
      'Successfully enrolled admin user "admin" and imported it into the wallet'
    );
    const res_str = `{"result":"success","msg":"Successfully enrolled admin user ${id} in the wallet"}`;
    res.status(200).json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to enroll admin user ${id}`);
    const res_str = `{"result":"failed","msg":"failed to enroll admin user - ${id} : ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//-----------------------------------
// 유저 인증서 발급
// /user POST 라우팅 ( id, userrole )
app.post("/user", async (req, res) => {
  const id = req.body.id;
  const userrole = req.body.userrole;

  console.log(id, userrole);

  try {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userIdentity = await wallet.get(id);
    if (userIdentity) {
      console.log(
        `An identity for the user "${id}" already exists in the wallet`
      );
      const res_str = `{"result":"failed","msg":"An identity for the user ${id} already exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get("admin");
    if (!adminIdentity) {
      console.log(
        'An identity for the admin user "admin" does not exist in the wallet'
      );
      const res_str = `{"result":"failed","msg":"An identity for the admin user ${id} does not exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // build a user object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, "admin");

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register(
      {
        affiliation: "org1.department1",
        enrollmentID: id,
        role: userrole,
      },
      adminUser
    );
    const enrollment = await ca.enroll({
      enrollmentID: id,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put(id, x509Identity);

    // response to client
    console.log(
      'Successfully registered and enrolled admin user "appUser" and imported it into the wallet'
    );

    const res_str = `{"result":"success","msg":"Successfully enrolled user ${id} in the wallet"}`;
    res.status(200).json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to enroll admin user ${id}`);
    const res_str = `{"result":"failed","msg":"failed to register user - ${id} : ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//-----------------------------------
// POST (자산생성)
// post : "/asset" 경로 body(cert / id / color / size / owner / value) 라우팅
app.post("/asset", async (req, res) => {
  const cert = req.body.cert;
  const id = req.body.id;
  const color = req.body.color;
  const size = req.body.size;
  const owner = req.body.owner;
  const value = req.body.value;
  const maker = req.body.maker;
  const year = req.body.year;
  const image = req.body.image;

  console.log(cert, id, color, size, owner, value, maker, year, image);

  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, "ccp", "connection-org1.json");
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(cert);
    // form 에서 작성된 cert 가져오기 체크(인증서 이름)
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      const res_str = `noCert`;
      res.send(res_str);

      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // Gateway 👉 블록체인 네트워크에 접속할 수 있는 모듈
    await gateway.connect(ccp, {
      // 블록체인 네트워크 접속 함수 connect
      wallet,
      identity: cert,
      discovery: { enabled: true, asLocalhost: true },
      // 디스커버리 서비스 옵션
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");
    // mychannel 채널 접속(연결)

    // Get the contract from the network.
    const contract = network.getContract("basic");
    // 사용할 체인코드 가져오기

    // 사용할 체인코드 기능 호출하기
    await contract.submitTransaction(
      "createAsset", // 불러올 함수이름
      id, // 인자
      color,
      size,
      owner,
      value,
      maker,
      year,
      image
    );
    const res_str = `success`;
    res.send(res_str);
    console.log("Transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();

    // const res_str = `Transaction has been submitted`;
    // res.send(res_str)
  } catch (error) {
    console.error(
      `{"result":"failed","msg":"Failed to submit transaction: ${error}"}`
    );
    const res_str = {
      result: "failed",
      msg: "Failed to submit transaction: ${error}",
    };
    res.send(res_str);
    res.json(JSON.parse(res_str));
  }
});
// console.error(`Failed to submit transaction: ${error}`);

// const res_str = `{"result":"failed","msg":"Failed to submit transaction: ${error}"}`;
// res.json(JSON.parse(res_str));

//-----------------------------------
// /asset GET (자산조회)
// get : "/asset" 경로 query (cert / id / color / size / owner / value) 라우팅
// ⭐ post 는 body로 오지만 ⭐ get은 query로 온다
app.get("/asset", async (req, res) => {
  const cert = req.query.cert;
  const id = req.query.id;

  console.log(cert, id);

  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, "ccp", "connection-org1.json");
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(cert);
    // form 에서 작성된 cert 가져오기 체크(인증서 이름)
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");

      const res_str = `{"result":"failed","msg":"An identity for the user does not exist in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // Gateway 👉 블록체인 네트워크에 접속할 수 있는 모듈
    await gateway.connect(ccp, {
      // 블록체인 네트워크 접속 함수 connect
      wallet,
      identity: cert,
      discovery: { enabled: true, asLocalhost: true },
      // 디스커버리 서비스 옵션
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");
    // mychannel 채널 접속(연결)

    // Get the contract from the network.
    const contract = network.getContract("basic");
    // 사용할 체인코드 가져오기

    // 사용할 체인코드 기능 호출하기
    result = await contract.evaluateTransaction(
      // ⭐ invoke 방식은 블록이 생성되고 / query 방식은 블록이 생성되지 않는다
      // query 방식은 조회만 해준다 (call)
      "ReadAsset", // 불러올 함수이름
      id // 인자
    );
    console.log("Transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();

    const res_str = `{"result":"success","msg":${result}}`;
    res.json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);

    const res_str = `{"result":"failed","msg":"Failed to submit transaction: ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//-----------------------------------
//  /update POST (자산변경)
app.post("/update", async (req, res) => {
  const cert = req.body.cert;
  const id = req.body.id;
  const color = req.body.color;
  const size = req.body.size;
  const owner = req.body.owner;
  const value = req.body.value;
  const maker = req.body.maker;
  const year = req.body.year;
  const image = req.body.image;

  console.log(
    "/update-post-" + id + ":" + color + ":" + size + ":" + owner + ":" + value
  );

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the admin user.
  const identity = await wallet.get(cert);
  if (!identity) {
    console.log(`An identity for the user does not exists in the wallet`);
    const res_str = `{"result":"failed","msg":"An identity for the user does not exists in the wallet"}`;
    res.json(JSON.parse(res_str));
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: cert,
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");

  // Get the contract from the network.
  const contract = network.getContract("basic");

  // Submit the specified transaction.
  console.log("\n--> Submit Transaction: UpdateAsset asset");
  await contract.submitTransaction(
    "UpdateAsset",
    id,
    color,
    size,
    owner,
    value,
    maker,
    year,
    image
  );
  console.log("Transaction(UpdateAsset) has been submitted");

  const res_str = `success`;
  res.send(res_str);
  console.log("Transaction has been submitted");

  // response -> client
  await gateway.disconnect();
});

//-----------------------------------
//  /delete POST (자산삭제)
app.post("/delete", async (req, res) => {
  const cert = req.body.cert;
  const id = req.body.id;
  console.log("/delete-post-" + id);

  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(cert);
    // form 에서 작성된 cert 가져오기 체크(인증서 이름)
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      const res_str = `noCert`;
      res.send(res_str);

      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: cert,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("basic");

    // Submit the specified transaction.
    console.log("\n--> Submit Transaction: UpdateAsset asset");
    await contract.submitTransaction("DeleteAsset", id);

    const res_str = `success`;
    res.send(res_str); // 클라이언트에 else 조건 반응주기
    console.log("Transaction has been submitted");

    // response -> client
    await gateway.disconnect();
  } catch (error) {
    console.error(
      `{"result":"failed","msg":"Failed to submit transaction: ${error}"}`
    );
    const res_str = {
      result: "failed",
      msg: "Failed to submit transaction: ${error}",
    };
    res.send(res_str);
    res.json(JSON.parse(res_str));
  }
});

//-----------------------------------
//  /assets GET (모든자산조회)
app.get("/assets", async (req, res) => {
  const cert = req.query.cert;
  console.log(cert);

  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, "ccp", "connection-org1.json");
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(cert);
    // form 에서 작성된 cert 가져오기 체크(인증서 이름)
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");

      const res_str = `{"result":"failed","msg":"An identity for the user does not exist in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // Gateway 👉 블록체인 네트워크에 접속할 수 있는 모듈
    await gateway.connect(ccp, {
      // 블록체인 네트워크 접속 함수 connect
      wallet,
      identity: cert,
      discovery: { enabled: true, asLocalhost: true },
      // 디스커버리 서비스 옵션
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");
    // mychannel 채널 접속(연결)

    // Get the contract from the network.
    const contract = network.getContract("basic");
    // 사용할 체인코드 가져오기

    // 사용할 체인코드 기능 호출하기
    result = await contract.evaluateTransaction(
      // ⭐ invoke 방식은 블록이 생성되고 / query 방식은 블록이 생성되지 않는다
      // query 방식은 조회만 해준다 (call)
      "GetAllAssets" // 불러올 함수이름
    );
    console.log("Transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();

    const res_str = `{"result":"success","msg":${result}}`;
    res.json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);

    const res_str = `{"result":"failed","msg":"Failed to submit transaction: ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//-----------------------------------
//  /transfer POST (소유주변경)
app.post("/transfer", async (req, res) => {
  const cert = req.body.cert;
  const id = req.body.id;
  const owner = req.body.owner;
  console.log("/transfer-post-" + owner);

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the admin user.
  const identity = await wallet.get(cert);
  if (!identity) {
    console.log(`An identity for the user does not exists in the wallet`);
    const res_str = `{"result":"failed","msg":"An identity for the user does not exists in the wallet"}`;
    res.json(JSON.parse(res_str));
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: cert,
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");

  // Get the contract from the network.
  const contract = network.getContract("basic");

  // Submit the specified transaction.
  console.log("\n--> Submit Transaction: UpdateAsset asset");
  await contract.submitTransaction("TransferAsset", id, owner);
  console.log("Transaction(TransferAsset) has been submitted");

  // response -> client
  await gateway.disconnect();
  const res_str = `{"result":"success","msg":"Transaction(TransferAsset) has been submitted"}`;
  res.status(200).json(JSON.parse(res_str));
});

//-----------------------------------
// server 시작
app.listen(PORT, HOST, function () {
  console.log(`Running on http://${HOST}:${PORT}`);
});
