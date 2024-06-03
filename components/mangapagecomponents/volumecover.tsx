import { View,Text,Image,TouchableOpacity } from "react-native"
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import { useNetInfo } from "@react-native-community/netinfo";
export default function VolumeCover({mangaid,cover_art,volumeno,title,cover_id,type,chapterid,currentpage,setRecentManga,chaptertitle}:any){
    const netInfo = useNetInfo();
    const router = useRouter();
    const pathname = usePathname();
    const [volumecolor,setVolumeColor] = useState("white")
    const navtochapters = async () =>{
        if (currentpage !== undefined){
        router.push({ pathname: "/page", params: {"volumeno":volumeno,"chaptertitle":chaptertitle,"chapterid":chapterid,"mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":cover_art,"currentpageparam":currentpage}});
        }
        else{
        router.push({ pathname: "/chapterpage", params: { "volumeno":volumeno,"chaptertitle":chaptertitle,"mangaid": mangaid,"title":title,"cover_id":cover_id,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
        }
    }
    const removefromrecentreading =async () => {
        if (pathname === "/library"){
            //console.log("hi")
            await AsyncStorage.removeItem(`manga-current-reading:${mangaid}-${volumeno}`) // -${chapterid}
            setRecentManga([])
        }
        if (pathname === "/downloads"){
            await AsyncStorage.removeItem(`downloaded_volume_chapters:${mangaid}-${volumeno}`)
            await AsyncStorage.removeItem(`downloaded_volume:${mangaid}-${volumeno}`)
            let dir:any = FileSystem.documentDirectory
            let allfiles = await FileSystem.readDirectoryAsync(dir);
            //console.log(allfiles)
            let volume_files = allfiles.filter((file:any) =>{return(file.includes(`${mangaid}_${volumeno}`))})
            const promises = volume_files.map(async (page:any) =>{
                await FileSystem.deleteAsync(dir+page)
            })
            await Promise.all(promises)
            //console.log(volume_files)
            setRecentManga([])

        }
        
    }
    const checkvolumeunavailable =async () => {
        const unavail = await AsyncStorage.getItem(`un-manga-volume:${mangaid}-${volumeno}`)
        if (unavail !== null){
            setVolumeColor("#3c3636")
        }
        //console.log(unavail)
        
    }
    useEffect(() =>{
        checkvolumeunavailable()
    },[])
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:volumecolor}}>
            <TouchableOpacity onLongPress={() =>{removefromrecentreading()}} onPress={() =>{navtochapters()}}>
                <Image style={{width:175,height:250}} alt="hello" source={{uri:netInfo.isInternetReachable === true ? `https://uploads.mangadex.org/covers/${mangaid}/${cover_art}` : FileSystem.documentDirectory + cover_art}}></Image>
                <Text style={{color:"white",width:175}}>{title} - Volume: {volumeno} {chaptertitle !== undefined && `| Chapter: ${chaptertitle}`} {currentpage !== undefined && `- Page ${currentpage +1}`}</Text>
            </TouchableOpacity>
        </View>

    )
}