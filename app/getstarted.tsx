import { View,StatusBar,TouchableOpacity,Image,Text} from "react-native"
import { useRouter } from "expo-router"

export default function GetStarted(){
    const router = useRouter()
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <View style={{flex:1,padding:30,alignItems:"center",gap:30}}>
            <View style={{marginTop:"20%"}}>
                <Text style={{fontSize:25}}>The Route</Text>
            </View>
            <View style={{padding:20,borderRadius:5}}>
                <Image alt='Image Here' style={{width:300,height:125}} source={{uri:"https://btdmembership.com/wp-content/uploads/2024/03/BTD-Logo-3-1024x446.png"}}></Image>
            </View>
            <View>
                <Text style={{fontSize:20}}>Expand Your future</Text>
            </View>

        </View>
        <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={() =>{router.push("/choosesignup")}} style={{backgroundColor:"#61edae",width:"90%",justifyContent:"center",alignItems:"center",padding:20,borderRadius:5}}>
                    <Text style={{color:"white"}}>Get Started</Text>
            </TouchableOpacity>

        </View>

  

    </View>
    )
}