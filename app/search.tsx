import { TextInput, View ,FlatList,Text,TouchableOpacity,Image} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MangaCover from "@/components/homecomponents/MangaCover";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { useNetInfo } from "@react-native-community/netinfo";
import Header from "@/components/header/header";
export default function Search(){
    const netInfo = useNetInfo();
    const [text,setText] = useState("");
    const [searchresults,setSearchResults] = useState([]);
    const [recentmanga,setRecentManga]  = useState<any>([]);
    const [recentremoved,setRecentRemoved] = useState(false)
     const searchmanga =async () => {
        if(text !== ""){
            const response = await axios.get(`https://api.mangadex.org/manga?limit=100&originalLanguage[]=ja&availableTranslatedLanguage[]=en`,{params:{"title": text}})
            
            let result = response.data.data
  
            let mangafeed:any = result.map((manga:any) =>{return({"mangaid":manga.id,"title":manga.attributes.title.en,"type":manga.type,"description":manga.attributes.description,"status":manga.attributes.status,"tags":manga.attributes.tags,"updatedAt":manga.attributes.updatedAt,"cover_id":manga.relationships[2].id})})

            setSearchResults(mangafeed)
        }
        
     }
     const getrecentmanga =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        setRecentManga(mangaitems)
        
     }


     useEffect(() =>{
        if (recentmanga.length === 0){
            if (netInfo.isInternetReachable === true){
            getrecentmanga()
        }
        }
     },[netInfo,recentmanga])
     if (netInfo.isInternetReachable === true){
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
                <StatusBar  hidden/>
                {searchresults.length !== 0 &&
                <TouchableOpacity onPress={() =>{setSearchResults([])}} style={{alignSelf:"flex-end"}}>
                <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>}

                <View style={{ flex:0.1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <View style={{height:30,borderTopLeftRadius:5,borderBottomLeftRadius:5,backgroundColor:"white",justifyContent:"center",padding:3}}>
                    <AntDesign name="search1" size={20} color="black" />
                </View>
                
                <TextInput
                onSubmitEditing={() =>{searchmanga()}}
                placeholder="What manga would you like to read?"
                placeholderTextColor={'black'}
                
                style={ {
                    height: 30,
                    width:"70%",
                   
                    
                    borderBottomRightRadius:5,borderTopRightRadius:5,
   
                    backgroundColor:"white",
                    color:"black"
                  }}
                onChangeText={setText}
                value={text}
            />
            <View style={{flex:0.13,marginLeft:15}}>
                <Image style={{width:44,height:39}} source={require("./CaesarAIMangaLogo.png")} />
                </View>
            </View>
        
          
        {recentmanga.length !== 0 && searchresults.length === 0&&
        <View style={{flex:1,padding:30}}> 
                <FlatList
                numColumns={2}
                style={{flex:1, flexGrow: searchresults.length === 0 ?1 :0 }}
                
                columnWrapperStyle={{    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}
                data={recentmanga}
                renderItem={({item,index}:any) => {
        
                        return (
                            <MangaCover key={index} index={index} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} type={item.type} setRecentManga={setRecentManga}></MangaCover>
            
                        )
                }
            }

        /></View>}
       
    

        {searchresults.length !== 0 &&
        <View style={{flex:1,padding:30}}> 
                <FlatList
                numColumns={2}
                style={{flex:1}}
                
                columnWrapperStyle={{    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}

                data={searchresults}
                renderItem={({item,index}:any) => {
        
                        return (
                            <MangaCover key={index} index={index} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} ></MangaCover>
            
                        )
                }
            }

        />
        </View>}
        {recentmanga.length === 0 && searchresults.length === 0 && <View style={{flex:1}}></View>}
        {/*searchresults.length === 0 && <View style={{flex:1}}></View>*/}
        <NavigationFooter style={{flex:0.1}} currentpage={"search"}/>
        </View>
    )
}
else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        {searchresults.length !== 0 &&
        <TouchableOpacity onPress={() =>{setSearchResults([])}} style={{alignSelf:"flex-end"}}>
        <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>}

        <View style={{ flex:0.1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <View style={{height:30,borderTopLeftRadius:5,borderBottomLeftRadius:5,backgroundColor:"white",justifyContent:"center",padding:3}}>
            <AntDesign name="search1" size={20} color="black" />
        </View>
        
        <TextInput
        onSubmitEditing={() =>{searchmanga()}}
        placeholder="What manga would you like to read?"
        placeholderTextColor={'black'}
        
        style={ {
            height: 30,
            width:"70%",
           
            
            borderBottomRightRadius:5,borderTopRightRadius:5,

            backgroundColor:"white",
            color:"black"
          }}
        onChangeText={setText}
        value={text}
    />
    <View style={{flex:0.13,marginLeft:15}}>
        <Image style={{width:44,height:39}} source={require("./CaesarAIMangaLogo.png")} />
        </View>
    </View>



{<View style={{flex:1}}></View>}
{/*searchresults.length === 0 && <View style={{flex:1}}></View>*/}
<NavigationFooter style={{flex:0.1}} currentpage={"search"}/>
</View>
    )

}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Read your Downloads
                </Text>
            </View>



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"search"}/>

        </View>
    )
    
}
}