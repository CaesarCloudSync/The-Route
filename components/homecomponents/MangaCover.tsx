import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams ,usePathname} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MangaCover({mangaid,cover_id,title,type,index,setRecentManga}:any){
    const router = useRouter();
    const pathname = usePathname();
    const [cover_art,setCoverArt] = useState("");
    
    const [coverimageexists,setCoverImageExists] = useState(true)
    const removefromrecent =async () => {
        //console.log(pathname)
        if (pathname === "/search"){
            await AsyncStorage.removeItem(`manga:${mangaid}`)
            setRecentManga([])

        }
        
        //
        
    }
    
    const getcoverimage =async () => {
        try{
            //console.log(`https://api.mangadex.org/cover/${cover_id}`)
            const response = await axios.get(`https://api.mangadex.org/cover/${cover_id}`)
            let cover_art = response.data.data.attributes.fileName
            //console.log("ho",`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`)
            setCoverArt(cover_art)
        }
        catch{
            //console.log("error",`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`)
            const responsevolumecover = await axios.get(`https://api.mangadex.org/cover`,{params:{"manga":[mangaid],"limit":1,"order":{
            
            "volume":"asc"
            
          }}})
            let resultvolumecover = responsevolumecover.data.data
            setCoverArt(resultvolumecover[0].attributes.fileName)
            setCoverImageExists(false)
        }

        
    }
    const navmangapage =async () => {
        AsyncStorage.setItem(`manga:${mangaid}`,JSON.stringify({ "mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}))

     
        router.push({ pathname: "/mangapage", params: { "mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
    

        
        
    }
    useEffect(()=>{
        getcoverimage()
    },[cover_art])

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            {index === 0 && pathname === "/search" &&  <Text style={{color:"white",fontSize:17,marginBottom:10}}>Recent Manga</Text>}
            {index === 0 && pathname !== "/search" &&  <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Manga</Text>}
            {index === 20 && pathname !== "/search" &&   <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Shounen</Text>}
            {index === 100 &&  pathname !== "/search" &&  <Text style={{color:"white",fontSize:20,marginBottom:10}}>Latest Shoujo</Text>}
            {index === 200 &&  pathname !== "/search" &&  <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Seinen</Text>}
            {index.toString().includes("1") &&   <View style={{height:32}}></View>}
             
            {cover_art !== ""?

            <TouchableOpacity onLongPress={() =>{removefromrecent()}} onPress={() =>{navmangapage()}} >
                <Image style={{width:170,height:250}} alt="hello" source={{uri:`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}}></Image>
            </TouchableOpacity>

            :
            <TouchableOpacity onLongPress={() =>{removefromrecent()}} onPress={() =>{navmangapage()}} >
                <Image style={{width:170,height:250}} alt="hello" source={require("./download (1).jpeg")}></Image>
            </TouchableOpacity>
   
            
        
           
            }
            
            <Text style={{color:"white",width:170}}>{title}</Text>
            </View>

            
                
            

            
        </View>
    )

 

}