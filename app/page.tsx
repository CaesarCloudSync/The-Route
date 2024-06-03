import axios from "axios";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View,Image,TouchableOpacity,Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gesture,GestureDetector,Swipeable,Directions,GestureHandlerRootView } from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
export default function Page(){
    const flingleft = Gesture.Fling()
    .direction(Directions.LEFT )
    .onEnd((event) => {
        incrementpage()
    })
    const flingright = Gesture.Fling()
    .direction(Directions.RIGHT )
    .onEnd((event) => {
      
      decrementpage()
    })

    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [hash,setHash] = useState("");
    const { chapterid,mangaid,cover_id,title,cover_art,currentpageparam,chaptertitle,volumeno}:any = params;
    //console.log(currentpageparam,"hey")
    const [currentpage,setCurrentPage] = useState(currentpageparam === undefined ? 0 : parseInt(currentpageparam));
    const [pages,setPages] = useState<any>([]);
    const [showlocal,setShowLocal] = useState(false);
    
    //console.log("hi",chapterid,mangaid,cover_id,title,cover_art,volumeno)
    const setcurrentreading =async () => {
        AsyncStorage.setItem(`manga-current-reading:${mangaid}-${volumeno}`,JSON.stringify({"volumeno":volumeno,"chaptertitle":chaptertitle,"chapterid":chapterid,"currentpage":currentpage,"mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":`${cover_art}`})) // -${chapterid}
        router.push("/library")
    }
    const getpages =async () => {
        let dir:any = FileSystem.documentDirectory
        let allfiles = await FileSystem.readDirectoryAsync(dir);
        let pages = allfiles.filter((file:any) =>{return(file.includes(`${mangaid}_${volumeno}_${chaptertitle.replaceAll(" ","_")}`))})
        //console.log(pages)
        if (pages.length === 0){
            const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterid}`)
            let result = response.data
            let hash = result.chapter.hash
            setHash(hash)
            setPages(result.chapter.data)
            const promises = result.chapter.data.map(async (page:any)=>{
                const response =  await Image.prefetch(`https://uploads.mangadex.org/data/${hash}/${page}`)
               return response
            });
            await Promise.all(promises)
            setShowLocal(false)
            
            
        
        }
        else{
            setShowLocal(true)
            setPages(pages)
        }



    }
    const incrementpage = () =>{
        let numpages = pages.length
        if (currentpage +1 < numpages){
            setCurrentPage(currentpage + 1)

        }
    }
    const decrementpage = () =>{
        if (currentpage != 0){
            setCurrentPage(currentpage - 1)

        }
    }
    const snapTo = (number:number) =>{
        setCurrentPage(number)

    }
    const navvolume =async () => {
             
        router.push({ pathname: "/mangapage", params: { "mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
    

    }
    const navchapterpage = () =>{
        router.push({ pathname: "/chapterpage", params: { "volumeno":volumeno,"chaptertitle":chaptertitle,"mangaid": mangaid,"title":title,"cover_id":cover_id,"cover_art":cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}` }});
    }
    useEffect(() =>{
        getpages()
    },[])

    //console.log(`https://uploads.mangadex.org/data/${hash}/${pages[currentpage]}`)
    //console.log(cover_art)
    // JSON.stringify({ "mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`})
    //console.log({ "volumeno":volumeno,"chaptertitle":chaptertitle,"mangaid": mangaid,"title":title,"cover_id":cover_id,"cover_art":cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}` })
    return(
    <View style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
        <StatusBar  hidden/>
        <View style={{alignSelf:"flex-start"}} >
            <TouchableOpacity style={{width:100}}  onPress={() =>{navchapterpage()}}>
            <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={{flex:0.1}}>
            <Text style={{color:"white"}}>Page: {currentpage + 1}/{pages.length}</Text>
        </View>
        <View style={{flex:0.2}}>
            <Text style={{color:"white"}}>{title} - Volume: {volumeno} | Chapter: {chaptertitle}</Text>
        </View>

        <GestureHandlerRootView style={{flex:2}}>
        <GestureDetector gesture={Gesture.Exclusive(flingleft,flingright)}>
         
        <Image style={{width:414,height:"100%"}} resizeMode="contain" alt="hello" source={{uri:showlocal === true ? `${FileSystem.documentDirectory}/${mangaid}_${volumeno}_${chaptertitle.replaceAll(" ","_")}_${currentpage}.jpg`:`https://uploads.mangadex.org/data/${hash}/${pages[currentpage]}`}}></Image>
        </GestureDetector>
        </GestureHandlerRootView>
        <View style={{flex:0.3,flexDirection:"row",gap:25,marginTop:20}}>
            <TouchableOpacity  onPress={() =>{decrementpage()}}>
            <AntDesign name="arrowleft" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.25))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.25)}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{navchapterpage()}} onLongPress={()=>{setcurrentreading()}}>
            <Image style={{width:50,height:40}} alt="hello" source={require("./CaesarAIMangaLogo.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.75))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.75)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{bottom:3}} onPress={() =>{incrementpage()}}>
            <AntDesign name="arrowright" size={35} color="white" />
            </TouchableOpacity>
        </View>



    </View>)
}