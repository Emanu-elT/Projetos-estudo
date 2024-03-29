import React, { useState } from "react";
import api from "../../../services/api.js";
import { Text, View, Image } from "react-native";
import PowerIcon from "../../../../assets/icons/power.png"
import LowTempIcon from "../../../../assets/icons/low-temp.png";
import HighTempIcon from "../../../../assets/icons/high-temp.png";
import TempNowIcon from "../../../../assets/icons/temp-now.png";
import NoPeopleIcon from "../../../../assets/icons/no-people.png";
import NewButton from "../../Button/NewButton.js";
import CircularButton from "../../CircularButton/CircularButton.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TempSensorIcon from "../../../../assets/icons/TempSensor.png";
import LightSensorIcon from "../../../../assets/icons/LightSensor.png";
import MotionSensorIcon from "../../../../assets/icons/MotionSensor.png";
import HumiditySensorIcon from "../../../../assets/icons/HumiditySensor.png";
import styles from "./styles.js";












const ContAtua = (props) => {

    // Session access token
    var session_token;

    var first = true;
    const [motion, setMotion] = useState("0");

    const [humiditySensor1, setHumiditySensor1] = useState(0);
    const [humiditySensor2, setHumiditySensor2] = useState(0);
    const [humiditySensor3, setHumiditySensor3] = useState(0);
    const [meanHumidity, setMeanHumidity] = useState(0.0);

    const [temperatureSensor1, setTemperatureSensor1] = useState(0);
    const [temperatureSensor2, setTemperatureSensor2] = useState(0);
    const [temperatureSensor3, setTemperatureSensor3] = useState(0);
    const [meanTemperature, setMeanTemperature] = useState(0.0);

    const [luminosity, setLuminosity] = useState(false);

    /************************************/
    /* States to handle air-c functions */
    /************************************/

    // States to control air-c power option (ON/OFF)
    const [deviceState, setDeviceState] = useState("LOADING");

    // States to control air-c min temperature
    const [minTemp, setMinTemp] = useState(0);

    // States to control air-c max temperature
    const [maxTemp, setMaxTemp] = useState(0);

    // States to control air-c min current temperature
    const [currentTemp, setCurrentTemp] = useState(0);

    // Below, states to control air-conditioner state according to the 
    // human presence inside the room
    const [noPeople, setNoPeople] = useState("LOADING");

    // Initiate states variables values according 
    // to sensor data requested via api

    function initValues() {

        handleSetState(false);

        handleDecreaseMinTemp(false);
        handleIncreaseMinTemp(false);

        handleDecreaseMaxTemp(false);
        handleIncreaseMaxTemp(false);

        handleDecreaseCurrentTemp(false);
        handleIncreaseCurrentTemp(false);

        handleNoPeople(false);

    }

    const getToken = async (key) => {
        try {
            session_token = await AsyncStorage.getItem(key)
            if (session_token !== null) {
                // console.log("got token");
                initValues();
                apiCall(value, 20); // updating humidity/temp sensor data
                apiCall(value, 21); // updating humidity/temp sensor data
                apiCall(value, 22); // updating humidity/temp sensor data
                apiCall(value, 25); // updating motion sensor data
                apiCall(value, 26); // updating luminosity sensor data
            }
            else {
                console.log("Could not find this token...");
            }
            return;
        } catch (e) {
            // error reading value
            alert("Error while reading token...")
            console.log("Error while reading token...\n" + e);

        }
    }

    async function updateData() {

        await api.get('/api/ar/2/24', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': session_token
            }
        })
            .then(function (response) {

                // console.log("Updated air-conditioner data");

                if (response.data["on_off"] === true)
                    setDeviceState("ON");
                else setDeviceState("OFF");

                setMinTemp(response.data["temp_min"]);

                setMaxTemp(response.data["temp_max"]);

                setCurrentTemp(response.data["temp_atual"]);

                if (response.data["status_sala"] === true)
                    setNoPeople("ON");
                else setNoPeople("OFF");

            })
            .catch(function (error) {
                console.log("Could not update air-conditioner data... Error:\n" + error);
            });
    }

    // Execute this function once to get initial values
    var immediate = setImmediate(async function () {
        await getToken("@storage_Key")
        clearImmediate(immediate)
    })

    function handleSetState(updating) {

        // if(first == true){
        //   alert("Please, update first");
        //   return;
        // }

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    if (response.data["on_off"] == true && deviceState != "ON") {
                        setDeviceState("ON");
                    }

                    else if (response.data["on_off"] == false && deviceState != "OFF") {
                        setDeviceState("OFF");
                    }
                })
                .catch(function (error) {
                    console.log("Could not load air-conditioner data... Error:\n" + error);
                })
                .then(
                    updateData()
                );
        }

        if (updating) {

            var newDeviceState;

            if (deviceState == 'OFF') {
                newDeviceState = 1;
            }
            else {
                newDeviceState = 0;
            }

            api.post('/api/ar/2/24', {
                "0": 1,
                "21": newDeviceState,
                "23": 992199
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    console.log("Updating air-conditioner state...");

                    if (newDeviceState == 0) {
                        setDeviceState('OFF');
                    }
                    else {
                        setDeviceState('ON');
                    }
                })
                .catch(function (error) {
                    console.log("Error while updating air-conditioner state\n " + error);
                }).then(
                    updateData()
                );
        }
    }

    // This function handles clicks on Decrease Min Temp button
    // It checks wheter user can continue to decrease the MinTemp value or not
    // It also checks if by decreasing the MinTemp value, the user now can
    // increase the MinTemp value.
    function handleDecreaseMinTemp(updating) {

        // if(first == true){
        //   alert("Please, update first");
        //   return;
        // }

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setMinTemp(response.data["temp_min"]);
                })
                .catch(function (error) {
                    console.log("Could not load minTemp information... Error:\n" + error);
                })
                .then(
                    updateData()
                );
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (minTemp == 16) {
                alert("Can't decrease more...");
                return;
            }

            var newMinTemp = minTemp - 1;

            api.post('/api/ar/2/24', {
                "0": 8,
                "2": newMinTemp,
                "23": 992999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    console.log("Decreasing minTemp...");
                    setMinTemp(newMinTemp);
                })
                .catch(function (error) {
                    console.log("Error while decreasing minTemp\n " + error);
                });
        }
    }

    // This function handles clicks on Increase Min Temp button
    // It checks wheter user can continue to increase the MinTemp value or not
    // It also checks if by increasing the MinTemp value, the user now can
    // decrease the MinTemp value.
    function handleIncreaseMinTemp(updating) {

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setMinTemp(response.data["temp_min"]);
                })
                .catch(function (error) {
                    console.log("Could not load air-conditioner data... Error:\n" + error);
                });
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (minTemp == 22) {
                alert("Can't increase more...");
                return;
            }

            var newMinTemp = minTemp + 1;

            api.post('/api/ar/2/24', {
                "0": 8,
                "2": newMinTemp,
                "23": 992999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    console.log("Increasing minTemp...");
                    setMinTemp(newMinTemp);
                })
                .catch(function (error) {
                    console.log("Error while increasing minTemp\n " + error);
                });
        }
    }

    function handleDecreaseMaxTemp(updating) {

        // if(first == true){
        //   alert("Please, update first");
        //   return;
        // }

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setMaxTemp(response.data["temp_max"]);
                })
                .catch(function (error) {
                    console.log("Could not load maxTemp information... Error:\n" + error);
                })
                .then(
                    updateData()
                );
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (maxTemp == 17) {
                alert("Can't decrease more...");
                return;
            }

            var newMaxTemp = maxTemp - 1;

            api.post('/api/ar/2/24', {
                "0": 4,
                "1": newMaxTemp,
                "23": 991999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    console.log("Decreasing maxTemp...");
                    setMaxTemp(newMaxTemp);
                })
                .catch(function (error) {
                    console.log("Error while decreasing maxTemp\n " + error);
                });
        }
    }

    function handleIncreaseMaxTemp(updating) {

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setMaxTemp(response.data["temp_max"]);
                })
                .catch(function (error) {
                    console.log("Could not load air-conditioner data... Error:\n" + error);
                });
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (maxTemp == 23) {
                alert("Can't increase more...");
                return;
            }

            var newMaxTemp = maxTemp + 1;

            api.post('/api/ar/2/24', {
                "0": 4,
                "1": newMaxTemp,
                "23": 991999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    console.log("Increasing maxTemp...");
                    setMaxTemp(newMaxTemp);
                })
                .catch(function (error) {
                    console.log("Error while increasing maxTemp\n " + error);
                });
        }
    }

    function handleDecreaseCurrentTemp(updating) {

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setCurrentTemp(response.data["temp_atual"]);
                })
                .catch(function (error) {
                    console.log("Could not load temp_atual information... Error:\n" + error);
                })
                .then(
                    updateData()
                );
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (currentTemp == 16) {
                alert("Can't decrease more...");
                return;
            }

            var newCurrTemp = currentTemp - 1;

            api.post('/api/ar/2/24', {
                "0": 32,
                "4": newCurrTemp,
                "23": 994999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    console.log("Decreasing currentTemp...");
                    setCurrentTemp(newCurrTemp);
                })
                .catch(function (error) {
                    console.log("Error while decreasing currentTemp\n " + error);
                });
        }
    }

    function handleIncreaseCurrentTemp(updating) {

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    setCurrentTemp(response.data["temp_atual"]);
                })
                .catch(function (error) {
                    console.log("Could not load air-conditioner data... Error:\n" + error);
                });
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            } else if (currentTemp == 23) {
                alert("Can't increase more...");
                return;
            }

            var newCurrTemp = currentTemp + 1;

            api.post('/api/ar/2/24', {
                "0": 32,
                "4": newCurrTemp,
                "23": 994999
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {
                    console.log("Increasing currentTemp...");
                    setCurrentTemp(newCurrTemp);
                })
                .catch(function (error) {
                    console.log("Error while increasing currentTemp\n " + error);
                });
        }
    }

    function handleNoPeople(updating) {

        if (!updating) {

            api.get('/api/ar/2/24', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    if (response.data["status_sala"] == true && noPeople != "ON") {
                        setNoPeople("ON");
                    } else if (response.data["status_sala"] == false && noPeople != "OFF") {
                        setNoPeople("OFF");
                    }
                })
                .catch(function (error) {
                    console.log("Could not load air-conditioner data... Error:\n" + error);
                })
                .then(
                    updateData()
                );
        }

        if (updating) {

            if (deviceState == 'OFF') {
                alert("Air-conditioner is off. Turn it on and try again...");
                return;
            }

            var newNoPeople;

            if (noPeople == 'OFF') {
                newNoPeople = 1;
            }
            else {
                newNoPeople = 0;
            }

            api.post('/api/ar/2/24', {
                "0": 2,
                "22": newNoPeople,
                "23": 992299
            }, {
                headers: {
                    'x-access-token': session_token
                }
            })
                .then(function (response) {

                    console.log("Updating air-conditioner state when room is empty...");

                    if (newNoPeople == 0) {
                        setNoPeople('OFF');
                    } else {
                        setNoPeople('ON');
                    }
                })
                .catch(function (error) {
                    console.log("Error while updating air-conditioner state when room is empty:\n " + error);
                }).then(
                    updateData()
                );
        }
    }

    return (
        <View style={styles.focused}>
            <View style={styles.cardSubtitle}>
                <Text style={styles.sub}>Informações do Vaso</Text>
            </View>

            <View style={styles.cardFirstIcon}>
                <View style={styles.firstdescription}>
                    <View style={styles.imageBlock}>
                        <Image
                            source={PowerIcon}
                            width={0}
                            height={0}
                            style={{
                                resizeMode: "contain",
                                width: 50,
                                height: 45,
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "column", flex: 0.65 }}>
                        <Text style={styles.state}>Bomba:</Text>
                        <Text style={styles.stateMode}>{deviceState}</Text>
                    </View>
                </View>
                <View style={styles.boxbuttons}>
                    <NewButton
                        onPress={() => handleSetState(true)}
                        width={100}
                        height={50}
                        bgColor={"#454ADE"}
                        bRadius={10}
                        title={(deviceState == 'ON') ? 'TURN OFF' : 'TURN ON'}
                        txtColor="white"
                        txtSize={13}
                        marginTop={"16%"}
                    ></NewButton>
                </View>
            </View>
            <View style={styles.cardSecondIcon}>
                <View style={styles.firstdescription}>
                    <View style={styles.imageBlock}>
                        <Image
                            source={LightSensorIcon}
                            width={0}
                            height={0}
                            style={{
                                resizeMode: "contain",
                                width: 50,
                                height: 45,
                                tintColor: "white",
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.65 }}>
                        <Text style={styles.state}>Iluminação:</Text>
                        <Text style={styles.stateMode}>{luminosity }</Text>
                    </View>
                </View>
                <View style={styles.boxbuttons}>
                    <NewButton
                        onPress={() => handleSetState(true)}
                        width={100}
                        height={50}
                        bgColor={"#454ADE"}
                        bRadius={10}
                        title={(luminosity == 'ON') ? 'TURN OFF' : 'TURN ON'}
                        txtColor="white"
                        txtSize={13}
                        marginTop={"16%"}
                    ></NewButton>
                </View>
            </View>

            <View style={styles.cardThirdIcon}>
                <View style={styles.firstdescription}>
                    <View style={styles.imageBlock}>
                        <Image
                            source={MotionSensorIcon}
                            width={0}
                            height={0}
                            style={{
                                resizeMode: "contain",
                                width: 50,
                                height: 45,
                                tintColor: "white",
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.65 }}>
                        <Text style={styles.state}>Irrigação:</Text>
                        <Text style={styles.stateMode}>{motion}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardFourthIcon}>
                <View style={styles.firstdescription}>
                    <View style={styles.imageBlock}>
                        <Image
                            source={HumiditySensorIcon}
                            width={0}
                            height={0}
                            style={{
                                resizeMode: "contain",
                                width: 50,
                                height: 45,
                                tintColor: "white",
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "column", flex: 0.65 }}>
                        <Text style={styles.state}>HUMIDADE:</Text>
                        <Text style={styles.stateMode}>{meanHumidity}%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardFifthIcon}>
                <NewButton
                    width={100}
                    height={50}
                    bgColor={"#228b22"}
                    bRadius={10}
                    title={"UPDATE"}
                    txtColor="white"
                    txtSize={13}
                    marginTop={"16%"}
                    onPress={updateData}
                ></NewButton>
            </View>

        </View>

    );
    function apiCall(token, sensor_id) {

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': token,
        }

        // console.log("Obtendo dados do sensor " + sensor_id + "...\n");

        api.get('api/sensor/2/' + sensor_id, {
            headers
        })
            .then(function (response) {

                // If we are checking humidity sensor data
                if (sensor_id === 20) {
                    setTemperatureSensor1(response.data["valor_temperatura"]);
                    setHumiditySensor1(response.data["valor_umidade"]);
                } else if (sensor_id == 21) {
                    setTemperatureSensor2(response.data["valor_temperatura"]);
                    setHumiditySensor2(response.data["valor_umidade"]);
                } else if (sensor_id == 22) {
                    setTemperatureSensor3(response.data["valor_temperatura"]);
                    setHumiditySensor3(response.data["valor_umidade"]);
                }

                // If we are checking motion sensor data
                else if (sensor_id === 25) {

                    // Convert from UNIX_TIMESTAMP to Locale Time String
                    var hour = new Date(response.data["data"]["_seconds"] * 1000).toLocaleTimeString("en-US", { hour12: false })
                    var date = new Date(response.data["data"]["_seconds"] * 1000).toLocaleDateString("en-US")
                    // console.log(response.data["data"]["_seconds"])
                    var updated = date.concat(" at ")
                    updated = updated.concat(hour)
                    // console.log(updated)
                    setMotion(updated)
                }

                // If we are checking luminosity sensor data
                else if (sensor_id === 26) {
                    setLuminosity(response.data["valor"]);
                }

                // Calculating the humidity and temperature mean values
                // and updating state value
                setMeanHumidity(Math.round((humiditySensor1 + humiditySensor2 + humiditySensor3) / 3))
                setMeanTemperature(Math.round((temperatureSensor1 + temperatureSensor2 + temperatureSensor3) / 3))

            })
            .catch(function (error) {
                alert("Error while retrieving sensors data...")
                console.log("Error while retrieving sensors data:\n" + error);
            });
    }
    // Execute this function once to get initial values
};

export default ContAtua;