import { View } from "react-native";
import PulseEffect from "./transitionanimation";
export default function TransitionPage({currentpage}:any){
    if (currentpage === "home" || currentpage === "foryou"){
      return(
        <View
        style={[
            {
                flex: 1,
                padding: 20,
              },
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
            backgroundColor: 'white'
          },
        ]}>
          <View style={{flex: 0.1,alignSelf:"flex-start"}}>
          <PulseEffect width={200} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.03,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.1,alignSelf:"flex-start"}}>
          <PulseEffect width={200} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.03,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.1,alignSelf:"flex-start"}}>
          <PulseEffect width={200} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.03,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
  
        </View>
    )
    }
    else if (currentpage === "bookmarks" || currentpage === "account"){
      return(
        <View
        style={[
            {
                flex: 1,
                padding: 20,
              },
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
            backgroundColor: 'white'
          },
        ]}>
          <View style={{flex: 0.03,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={30} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>
          <View style={{flex: 0.2,alignSelf:"flex-start"}}>
          <PulseEffect width={300} height={100} borderRadius={5} color={"#b9bcc3"}></PulseEffect>
    
          </View>

  
        </View>
    )
    }
}