import app from "./src/app";

console.log("server.ts");

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
