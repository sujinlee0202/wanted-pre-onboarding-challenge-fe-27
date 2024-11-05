export const readLoginToken = () => {
  const loginToken = localStorage.getItem("loginToken");
  return loginToken || "";
};
