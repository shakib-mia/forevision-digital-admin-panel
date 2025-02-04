export const backendUrl = "https://server.forevisiondigital.in/";
// export const backendUrl = "http://localhost:5000/";

export const config = {
  headers: {
    token: sessionStorage.getItem("token"),
  },
};
