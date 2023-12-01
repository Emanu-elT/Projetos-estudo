import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffe0",
  },
  containerButtons: {
    backgroundColor: "#ffffe0",
    width: "80%",
    height: "100%",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  containerContent: {
    width: "100%",
    flex: 0.5,
    flexDirection: "column",
    backgroundColor: "#ffffe0",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  imagesIcons: {
    flex: 0.5,
    width: 300,
    height: 100,
    marginTop: 200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  textContent: {
    width: "100%",
    flex: 2,
    backgroundColor: "#ffffe0",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    marginTop: 30,
    fontSize: 50,
    color: '#228b22',
    fontFamily: "Roboto_700Bold",
  },
  pageSubTitle: {
    marginTop: 5,
    width: 350,
    fontSize: 25,
    color: '#228b22',
    fontFamily: 'Roboto_500Medium',
    textAlign: "center",
    lineHeight: 25,
  },

});

export default styles;