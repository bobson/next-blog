const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        username: "root",
        password: "SdDqvLixm2eqOOet",
        clustername: "cluster0",
        database: "my-blog-dev",
      },
    };
  }
  return {
    env: {
      username: "root",
      password: "SdDqvLixm2eqOOet",
      clustername: "cluster0",
      database: "my-blog",
    },
  };
};
