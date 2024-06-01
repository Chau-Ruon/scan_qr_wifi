import React, { useRef, useState } from 'react'
import {
	AppRegistry,
	StyleSheet,
	Text,
	TouchableOpacity,
	Linking,
	View,
	Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Clipboard from '@react-native-clipboard/clipboard';

const copyIcon = require("../assets/icons/copy.png");

const ScanScreen = () => {
	const ref = useRef<any>()
	const [password, setPassword] = useState("");
	const [nameWF, setNameWF] = useState("");
  
	const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };


	const onSuccess = (e: any) => {
		console.log('data: ', e.data);
		const S = e.data.indexOf("S:") + 2;
		const T = e.data.indexOf(";T");
		const P = e.data.indexOf("P:") + 2;
		const H = e.data.indexOf(";H");
		setPassword(e.data.slice(P,H));
		setNameWF(e.data.slice(S,T));

	};
	const whMarker = 250;
	const whCamera = 100;
	const whViewCamera = 350;
	return (
		<View style={{
			height: whViewCamera,
			width: whViewCamera,
			backgroundColor: "#004dcf",
		}}>
			<QRCodeScanner
				onRead={onSuccess}
				reactivate
				showMarker={true}
				markerStyle={{
					borderRadius:20
				}}
				// containerStyle={{ width: 275, borderWidth: 1, borderColor: 'white', alignSelf: 'center', }} 
			cameraStyle={{alignSelf: 'center',width:190,height:70}}
			/>
			<Text style={{
				fontSize:16,
				fontWeight:"900",
				color:"#000000"
			}}>
				{`Name WiFi:  ${nameWF}`}
			</Text>
			<View style={{
				flexDirection:"row"
			}}>
				<Text style={{
					fontSize:16,
					fontWeight:"900",
					color:"#000000"
				}}>
					{`Password WiFi:  ${password}`}
					<TouchableOpacity style={{
						width:20,
						height:20,
					}}
					onPress={()=>copyToClipboard(password)}>
						<Image
							style={{
								width:20,
								height:20,
							}}
							source={copyIcon}
						/>
					</TouchableOpacity>
				</Text>
			</View>
			
		</View>
	)
}


const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		marginTop: 80,
		color: '#777',
		backgroundColor: "#15AA60"
	},
	textBold: {
		fontWeight: '500',
		color: '#000'
	},
	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)'
	},
	buttonTouchable: {
		padding: 16
	}
});

export default ScanScreen