import { View,StatusBar,TouchableOpacity,Image,Text} from "react-native"
import { useRouter } from "expo-router"
import { useNetInfo } from "@react-native-community/netinfo";

export default function GetStarted(){
    const router = useRouter();
    const netInfo = useNetInfo();
    if (netInfo.isInternetReachable === true){
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <View style={{flex:1,padding:30,alignItems:"center",gap:30}}>
            <View style={{marginTop:"20%"}}>
                <Text style={{fontSize:25}}>The Route</Text>
            </View>
            <View style={{padding:20,borderRadius:5}}>
                <Image alt='Image Here' style={{width:200,height:200,borderRadius:10}} source={require("../assets/images/TheRouteLogo.png")}></Image>
            </View>
            <View>
                <Text style={{fontSize:20}}>Expand Your future</Text>
            </View>

        </View>
        <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={() =>{router.push("/choosesignup")}} style={{backgroundColor:"#61edae",width:"90%",justifyContent:"center",alignItems:"center",padding:20,borderRadius:5}}>
                    <Text style={{color:"black"}}>Get Started</Text>
            </TouchableOpacity>

        </View>

  

    </View>
    )}
    else if (netInfo.isInternetReachable === false){
        return(
            <View style={{flex:1}}>
                {/*Header */}
                
                {/* No Internet Main Body */}
                <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:30,color:"black"}}>No Internet Connection</Text>
                    <Text>Please connect to enjoy your journey</Text>
    
                </View>
                
    
    
    
                {/*Navigation Footer*/}
        
    
            </View>
        )
    }
}