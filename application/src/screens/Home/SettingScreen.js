import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Platform } from "react-native";
import ScalableText from "react-native-text";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from "expo-permissions";

import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

export default class SettingScreen extends React.Component {

    static contextType = AppContext;

    state = {
        permission: (Platform.OS === "web")? true : false
    }

    async componentDidMount() {
        if(!this.state.permission) {
            const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL); // Ask permission images gallery
            console.log("Permission CAMERA_ROLL : " + status);
            if(status === "granted") {
                this.setState({ permission: true });
            }
        }
    }

    async selectAvatar() {
        //if(!this.state.permission) return null;
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });

            if(result.cancelled) return console.log(result);

            // Get image type
            let match = /data:(.*);/s.exec(result.uri.split(",")[0]);
            let type = (match)? match[1] : "image";

            let data = {
                profile_pic: {
                    uri: (Platform.OS === "web")? result.uri : (await ImageManipulator.manipulateAsync(result.uri, [], { base64: true })).base64,
                    type: type
                }
            }

            if(result.width > 0 && result.height > 0) {
                data.profile_pic.size = {
                    width: result.width,
                    height: result.height
                }
            }

            fetch(this.context.API_URL + "/users/" + this.context.user.data["_id"] + "/update", {
                headers: {"content-type" : "application/json", "Authorization": this.context.user.token},
                method: "PUT",
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((Data) => {
                if(Data.success && Data["data"]) {
                    this.context.setUser({
                        data: Data["data"],
                        token: this.context.user.token
                    });
                }
                else this.setState({ posts: [], refreshing: false, isLoading: false });
    
            })
            .catch((error) => {
                return console.error(error);
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Wrapper>
                <View style={styles.image_container}>
                    <TouchableOpacity style={styles.profile_pic} onPress={() => this.selectAvatar()}>
                        <Image style={styles.image} source={{ uri: this.context.API_URL + "/" + this.context.user.data["profile_pic"] }} />
                    </TouchableOpacity>
                    <ScalableText style={styles.username}>{this.context.user.data["first_name"]} {this.context.user.data["last_name"]}</ScalableText>
                </View>
                <View style={styles.list_container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SettingUpdate")}>
                        <ScalableText style={styles.text_list}>Modifier le compte</ScalableText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })}>
                        <ScalableText style={[styles.text_list, styles.logout]}>Déconnexion</ScalableText>
                    </TouchableOpacity>
                </View>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    image_container: {
        width: "100%",
        maxHeight: 150,
        flex: 1,
        alignItems: "center",
        marginTop: 25,
        marginBottom: 50
    },
    profile_pic: {
        width: 100,
        height: 100,
        borderRadius: 75
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 75
    },
    list_container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    username: {
        color: "black",
        fontSize: 26,
        fontFamily: "VarelaRound",
        textAlign: "center",
        marginTop: 25
    },
    text_list: {
        width: "100%",
        color: "black",
        fontSize: 18,
        fontFamily: "VarelaRound",
        textAlign: "center",
        marginBottom: 15
    },
    logout: {
        color: "#c83737",
    }
});

