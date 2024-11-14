// export const backendUrl = "https://api.forevisiondigital.in/";
export const backendUrl = "http://localhost:5100/";

export const config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
