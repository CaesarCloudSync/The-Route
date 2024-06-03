import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { ScrollView, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity,Text ,Image} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";
import VolumeCover from "@/components/mangapagecomponents/volumecover";
import { StatusBar } from "expo-status-bar";
export default function MangaPage(){
    const [description,setDescription] = useState("");
    const [volumefeed,setVolumeFeed] = useState<any>([]);
    const router = useRouter()
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { mangaid,cover_id,title,type,cover_art}:any = params;
    //console.log("hem",type)
    //console.log(mangaid,title,cover_art)
    const getmangapage = async () => {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaid}`)
        let result = response.data.data.attributes
        let description = result.description.en
        const responsevolumecover = await axios.get(`https://api.mangadex.org/cover`,{params:{"manga":[mangaid],"limit":100,"order":{
            
            "volume":"asc"
            
          }}})
        let resultvolumecover = responsevolumecover.data.data
        setVolumeFeed(resultvolumecover)
        /*const responsefeed = await axios.get(`https://api.mangadex.org/manga/${mangaid}/feed`,{params:{"translatedLanguage":["en"],"order":{
            
            "volume":"desc"
            
          }}})
        let resultfeed = responsefeed.data.data
        setvolumeFeed(resultfeed)
        */
        setDescription(description)
    }
    const navsearch = () =>{
        router.push("/search")
    }
    useEffect(()=>{
        getmangapage()
    },[])
    //console.log(cover_art)
    //console.log("hi",`https://uploads.mangadex.org/covers/${mangaid}/${volumefeed[0].attributes.fileName}`)
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
            <StatusBar  hidden/>
            <View style={{height:20}}>
            <TouchableOpacity style={{flex:1}} onPress={() =>{navsearch()}}>
            <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            </View>
            {cover_art.includes(".jpg") ?
            <View style={{flex:0,alignItems:"center"}}>
             
                <Image style={{width:150,height:225}} alt="hello" source={{uri:cover_art}}></Image>
                <Text style={{color:"white",fontSize:20}}>{title}</Text>

            </View>
                :
                volumefeed.length !== 0 &&
                <View style={{flex:0,alignItems:"center"}}>
                    <Image style={{width:150,height:225}} alt="hello" source={{uri:`https://uploads.mangadex.org/covers/${mangaid}/${volumefeed[0].attributes.fileName}`}}></Image>
                    <Text style={{color:"white",fontSize:20}}>{title}</Text>
                </View>
                }
           <ScrollView style={{height:300,alignSelf:"center"}}>
                <Text style={{color:"white",width:350}}>{description}</Text>
                

            </ScrollView>
            {volumefeed.length !== 0 &&
            <FlatList
                    numColumns={2}
                    
                    
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={volumefeed}
                    renderItem={({item,index}:any) => {
        
                            return (
                                
                                <VolumeCover key={index}  volumeno={item.attributes.volume} mangaid={mangaid} title={title} cover_id={cover_id} type={type} cover_art={item.attributes.fileName}></VolumeCover>
                
                            )
                    }
                }

            />}



        </View>
    )

}