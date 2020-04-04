import * as React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";

export default class MenuBar extends React.Component {
    render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity 
                    style={styles.container}
                    onPress={() => this.props.navigation.navigate("Home", {
                        token: this.props.route.params.token,
                        user: this.props.route.params.user
                    })}>
				    <Image style={styles.image} source={require("../assets/home.png")} />
			    </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.container}
                    onPress={() => this.props.navigation.navigate("Search", {
                        token: this.props.route.params.token,
                        user: this.props.route.params.user
                    })}>
				    <Image style={styles.image} source={require("../assets/search.png")} />
			    </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.container}
                    onPress={() => this.props.navigation.navigate("Setting", {
                        token: this.props.route.params.token,
                        user: this.props.route.params.user
                    })}>
				    <Image style={styles.image} source={require("../assets/setting.png")} />
			    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 40,
        borderTopWidth: 1,
        backgroundColor: "white",
        alignSelf: "center",
        zIndex: 999,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    container: {
        width: "33.33%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 24,
        height: 24,
    }
});
