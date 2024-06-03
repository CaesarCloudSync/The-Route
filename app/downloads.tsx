import { View,Text,Image,FlatList} from "react-native";
import NavigationFooter from "./footer";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MangaCover from "@/components/homecomponents/MangaCover";
import VolumeCover from "@/components/mangapagecomponents/volumecover";
export default function Downloads(){
    const [progress,setProgress] = useState({});
    const [downloadedmanga,setDownloadedManga]  = useState<any>([]);
    const callback = (downloadProgress:any) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress({
          downloadProgress: progress,
        });
      };
    const getpages =async () => {
        const downloadResumable = FileSystem.createDownloadResumable(
            'https://uploads.mangadex.org/data/7dd9b16a7f83881121980b3bf685d5ff/x1-de250240139cdbe166efb2251cb9b6d02029ae72242a953065974a12a0d86581.jpg',
            FileSystem.documentDirectory + 'chapter1.jpg',
            {},
            callback
          );
          try {
            const { uri }:any = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
          } catch (e) {
            console.error(e);
          }
          let dir:any = FileSystem.documentDirectory
          let files = await FileSystem.readDirectoryAsync(dir);
          //console.log(files)
          
        
    }
    const getdownloadedmanga =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("downloaded_volume:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
         console.log(mangaitems)
        setDownloadedManga(mangaitems)
        
     }


     useEffect(() =>{
        if (downloadedmanga.length === 0){
            getdownloadedmanga()
        }
     },[downloadedmanga])
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
            <StatusBar  hidden/>
            <Header style={{flex:1.3}}/>
            {downloadedmanga.length !== 0 &&
            <FlatList
                    numColumns={2}
                    
                    style={{flex:1}}
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={downloadedmanga}
                    renderItem={({item,index}:any) => {
        
                            return (
                              
                                <VolumeCover key={index}  volumeno={item.volumeno} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id}  cover_art={item.cover_art} setRecentManga={setDownloadedManga}></VolumeCover> 
                                
                                

                
                            )
                    }
                }

            />}
            {downloadedmanga.length === 0 && <View style={{flex:1}}></View>}

            <NavigationFooter style={{flex:0.1}} currentpage={"downloads"}/>

        </View>
    )
}