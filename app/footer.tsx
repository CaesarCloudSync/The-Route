import { View,Text,Image } from 'react-native';

import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function NavigationFooter({currentpage,style}:any){
    const router = useRouter();
    const navnextpage =async (route:string) => {
        if (route === "home"){
            router.push("/")
        }
        else if (route === "search"){
            router.push("/search")
        }
        else if (route === "downloads"){
            router.push("/downloads")
        }
        else if (route === "library"){
            router.push("/library")
        }
    }

    return(
        <View style={[{flex:0.04,backgroundColor:"white"},style]}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",flex:1}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            
                <TouchableOpacity onPress={() =>{navnextpage("home")}}>
                    
                <FontAwesome name="home" size={24} color={currentpage=== "home" ? "white" :"grey"}/>
                
                        <Text style={{fontSize:10,color:currentpage=== "home" ? "white" :"grey"}}>
                            Home
                        </Text>
                    

                </TouchableOpacity>
            
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <View>
                
                {currentpage === "search" ?
                <View>
                                    
                <Image source={require('./search-filled.png')} style={{width: 25, height: 25}} />
                    
        
                    <Text style={{fontSize:10,color:currentpage=== "search" ? "white" :"grey"}}>
                        Search
                    </Text>
                </View>:
                 
                    <TouchableOpacity onPress={() =>{navnextpage("search")}}>
                
                    <AntDesign name="search1" size={24} color={currentpage=== "search" ? "white" :"grey"} />
                    
        
                    
                    <Text style={{fontSize:10,color:currentpage=== "search" ? "white" :"grey"}}>
                            Search
                        </Text>
                    </TouchableOpacity>
            
                }


            </View>
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  
                <TouchableOpacity onPress={() =>{navnextpage("downloads")}}>
                    <FontAwesome  style={{marginLeft:13}}  name="download" size={24} color={currentpage=== "downloads" ? "white" :"grey"} />
                    
                        <Text style={{fontSize:10,color:currentpage=== "downloads" ? "white" :"grey"}}>
                            Downloads
                        </Text>
                

                </TouchableOpacity>
          
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           
                <TouchableOpacity onPress={() =>{navnextpage("library")}}>
                <MaterialIcons name="my-library-music" size={24} color={currentpage=== "library" ? "white" :"grey"} />
                    
                        <Text style={{fontSize:10,color:currentpage=== "library" ? "white" :"grey"}}>
                            Library
                        </Text>
                

                </TouchableOpacity>
           
        </View>






            
            

        </View>

    </View>
    )
}