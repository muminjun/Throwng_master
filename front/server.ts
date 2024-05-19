import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 5000; // 원하는 포트를 설정하세요.

// gzip 파일을 서빙하기 위한 미들웨어
app.get("*.js", (req, res, next) => {
  const gzippedFile = req.url + ".gz";
  if (fs.existsSync(path.join(__dirname, "dist", gzippedFile))) {
    req.url = gzippedFile;
    res.set("Content-Encoding", "gzip");
  }
  next();
});

// dist 디렉토리를 정적 파일 제공 디렉토리로 설정
app.use(express.static(path.join(__dirname, "dist")));

// 모든 요청을 dist/index.html로 리다이렉트
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
