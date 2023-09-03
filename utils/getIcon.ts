const getIcon = (routeName: string) => {
  switch (routeName) {
    case "Home":
      return "home";
    case "Creator":
      return "fire";
    case "About":
      return "information";
    default:
      return "home";
  }
};

export default getIcon;
