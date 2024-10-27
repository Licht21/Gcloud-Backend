import Hapi from "@hapi/hapi";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
