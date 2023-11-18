import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerButtons: {
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    marginTop: 30,
    fontSize: 50,
    color: '#8a2be2',
    fontFamily: "Roboto_700Bold",
  },
  pageSubTitle: {
    marginTop: 25,
    width: 350,
    fontSize: 25,
    color: '#8a2be2',
    fontFamily: 'Roboto_500Medium',
    textAlign: "center",
    lineHeight: 30,
  },

});

export default styles;