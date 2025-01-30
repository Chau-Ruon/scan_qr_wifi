import React, { useRef, useState} from 'react'
import {
	AppRegistry,
	StyleSheet,
	Text,
	TouchableOpacity,
	Linking,
	View,
	Image,
	Dimensions
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import Clipboard from '@react-native-clipboard/clipboard';

const copyIcon = require("../assets/icons/copy.png");



export const ScanScreen = () => {
	const ref = useRef<any>()
	const [password, setPassword] = useState("");
	const [nameWF, setNameWF] = useState("");
  
	const window_WH = Dimensions.get('window')

	const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };


	const onSuccess = (e: BarCodeReadEvent) => {
		const passwordMatch = e.data.match(/P:(.*?);/);
		const ssidMatch = e.data.match(/S:(.*?);/);
		setPassword(passwordMatch ? passwordMatch[1] : '');
		setNameWF(ssidMatch ? ssidMatch[1] : '');

	};
	const whCopyBtn = 30
	return (
		<View style={{
			flex:1,
			justifyContent:"center",
			alignItems:"flex-start",
		}}>
			<View style={{
				height: window_WH.height/2,
				justifyContent:"flex-start"
			}}>
				<QRCodeScanner
					onRead={onSuccess}
					reactivate
					showMarker={true}
					markerStyle={{
						borderRadius:20,
						width:window_WH.width,
						height:window_WH.height/2,
					}}
				cameraStyle={{
					alignSelf: 'center',
					justifyContent:"flex-start",
					height:window_WH.height/2.7,
					aspectRatio:1
				}}
				/>
			</View>
			<Text style={styles.nameWF}>{`Name WiFi:  `}
				<Text style={[styles.nameWF, {fontSize: 28}]}>{nameWF}</Text>
			</Text>
			<View style={{
				flexDirection:"row"
			}}>
				<Text style={styles.nameWF}>
					{`Password WiFi:  `}
					<Text style={[styles.nameWF, {fontSize: 28}]}>{password}</Text>
				</Text>
				{
						password && 
						<TouchableOpacity style={[styles.buttonTouchable, {width:whCopyBtn,height:whCopyBtn,}]}
						onPress={()=>copyToClipboard(password)}>
							<Image
								style={{
									width:whCopyBtn,
									height:whCopyBtn,
								}}
								source={copyIcon}
							/>
						</TouchableOpacity>
					}
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
	marginLeft:15,
	},
	nameWF:{
		fontWeight:"900",
		color:"#000000"
	},
});
