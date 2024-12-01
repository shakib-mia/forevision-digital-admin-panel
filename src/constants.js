export const backendUrl = "https://server.forevisiondigital.in/";
// export const backendUrl = "http://localhost:5100/";

export const config = {
  headers: {
    token: sessionStorage.getItem("token"),
  },
};
