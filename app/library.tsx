import { View } from "react-native";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import VolumeCover from "@/components/mangapagecomponents/volumecover";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
import { useNetInfo } from "@react-native-community/netinfo";
export default function Library(){
    const [recentmanga,setRecentManga]= useState<any>([]);
    const netInfo = useNetInfo();

    const getcurrentreading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga-current-reading:"))}))
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
         setRecentManga(mangaitems)
        
     }
     const get_downloaded_current_reading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga-current-reading:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        const mangaitemspromises = mangaitems.map(async (item:any) =>{

            const downloaded_item = await AsyncStorage.getItem(`downloaded_volume:${item.mangaid}-${item.volumeno}`)
            if (downloaded_item !== null){
                return item
            }
            else{
                return null
            }
         })
         const downloaded_current_reading = (await Promise.all(mangaitemspromises)).filter((item) =>{return(item !== null)})
         //console.log(downloaded_current_reading)
         setRecentManga(downloaded_current_reading)
     }
     useEffect(()=>{
        
        if (recentmanga.length === 0){
            //console.log(netInfo.isInternetReachable)
            if (netInfo.isInternetReachable === true){
                getcurrentreading()
            }
            else if (netInfo.isInternetReachable === false){
                get_downloaded_current_reading()
            }
        
    }
    },[netInfo,recentmanga])

    //console.log("hi")
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
            <Header/>
            <StatusBar  hidden/>
            {recentmanga.length !== 0 &&
            <FlatList
                    numColumns={2}
                    style={{flex:1}}
                    
                    
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={recentmanga}
                    renderItem={({item,index}:any) => {
                        let cover_filename = item.cover_art.split("/").slice(-1)
                      
                            return (
                                
                                
                                <VolumeCover key={index} chaptertitle={item.chaptertitle} currentpage={item.currentpage} chapterid={item.chapterid} volumeno={item.volumeno} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} t cover_art={cover_filename} setRecentManga={setRecentManga} ></VolumeCover>
                
                            )
                    }
                }

            />}
            {recentmanga.length === 0 && <View style={{flex:1}}></View>}
            <NavigationFooter style={{flex:0.1}} currentpage={"library"}/>
            
        </View>
    )
}