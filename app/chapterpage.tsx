import { View,TouchableOpacity,Text,Image,FlatList} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import ChapterCover from "@/components/chapterpagecomponents/chaptercover";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useNetInfo } from "@react-native-community/netinfo";
export default function ChapterPage(){
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const params = useLocalSearchParams();
    const [progress,setProgress] = useState<any>(0);
    const [downloadedmanga,setDownloadedManga]  = useState<any>([]);
    const { mangaid,title,cover_art,volumeno,cover_id,type,currentpageparam}:any = params;
    const [chapterfeed,setChapterFeed] = useState<any>([]);
    const [totalpages,setTotalPages] = useState(0);
    const [completedpages,setCompletedPages] = useState(0);
    const callback = (downloadProgress:any) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress({
          downloadProgress: progress,
        });
      };

    const getchapterpages =async () => {
        //console.log(mangaid)
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes(`downloaded_volume_chapters:${mangaid}-${volumeno}`))}))
        const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        if (mangaitems.length !== 0){
            setChapterFeed(mangaitems[0])
        }
        else{
        const responsefeed = await axios.get(`https://api.mangadex.org/manga/${mangaid}/feed`,{params:{"limit":500,"translatedLanguage":["en"],"order":{
            
            "volume":"asc",
            "chapter":"asc"
            
          }}})
        let result = responsefeed.data.data
        //console.log(result[1])
        result= result.filter((manga:any)=>{return(manga.attributes.volume === volumeno)})
        //console.log(result)
        if (result.length === 0){
            AsyncStorage.setItem(`un-manga-volume:${mangaid}-${volumeno}`,JSON.stringify({"mangaid":mangaid,"volumeno":volumeno}))
        }
        //console.log(result)
        setChapterFeed(result)
    }
    }
    const navmangapage = () =>{
        if (netInfo.isInternetReachable === true){
            router.push({ pathname: "/mangapage", params: { "mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
        }
        else{
            router.push("/downloads")
        }
    }
    const download_volume =async () => {
       // console.log(chapterfeed)
        const promises = chapterfeed.map(async (chapter:any) =>{
            const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapter.id}`)
            let result = response.data
            let hash = result.chapter.hash
            const pages = result.chapter.data.map((page:any) =>{return(`https://uploads.mangadex.org/data/${hash}/${page}`)})
            return pages
            


        })
        const pages = await Promise.all(promises)
        const totalpages = pages.flat().length
        setTotalPages(totalpages)
        let doneCount = 0;
        const pagepromises = pages.map(async (chapter:any,chapterindex:any) =>{
           const chapterpromises =  chapter.map(async (page:any,pageindex:any) =>{

                console.log(chapterfeed[chapterindex].attributes.title)
               if (chapterfeed[chapterindex].attributes.title !== null){
                let title_filename = `${mangaid}_${volumeno}_${chapterfeed[chapterindex].attributes.title.replaceAll(" ","_")}_${pageindex}`
                //console.log(title_filename)
                const downloadResumable = FileSystem.createDownloadResumable(
                    page,
                    FileSystem.documentDirectory + title_filename + ".jpg",
                    {},
                    callback
                  );
                  try {
                    const { uri }:any = await downloadResumable.downloadAsync();
                    //console.log('Finished downloading to ', uri);
                    doneCount++; 
                    console.log(doneCount)
                    setCompletedPages(doneCount)
                  } catch (e) {
                    console.error(e);
                  }
                }
        
            })
            await Promise.all(chapterpromises)
       })
       
        //
        await Promise.all(pagepromises )
        let cover_art_filename = cover_art.includes("http") ? cover_art.split("/").slice(-1)[0]  : cover_art
        let cover_art_url = cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`
        const downloadResumable = FileSystem.createDownloadResumable(
            cover_art_url,
            FileSystem.documentDirectory + cover_art_filename,
            {},
            callback
        );
        try {
            const { uri }:any = await downloadResumable.downloadAsync();
            //console.log('Finished downloading to ', uri);

        } catch (e) {
            console.error(e);
        }
       console.log(cover_art_filename)
       console.log(cover_art_url)

       const volume_data = {"volumeno":volumeno,"mangaid":mangaid,"title":title,"cover_id":cover_id,"cover_art":cover_art_filename}
       // volumeno={volumeno} chapterid={item.id} title={title} chaptertitle={item.attributes.title} chapter={item.attributes.chapter}  mangaid={mangaid} cover_art={cover_art} cover_id={cover_id} type={type} currentpageparam={currentpageparam}
        await AsyncStorage.setItem(`downloaded_volume:${mangaid}-${volumeno}`,JSON.stringify(volume_data))
        const chapter_data = chapterfeed.map((item:any) =>{
            let chapter_item = {"volumeno":volumeno,"mangaid":mangaid,"cover_art":cover_art_filename,"id":item.id,"attributes":{"title":item.attributes.title,"chapter":item.attributes.chapter}}
            return chapter_item
        })
        await AsyncStorage.setItem(`downloaded_volume_chapters:${mangaid}-${volumeno}`,JSON.stringify(chapter_data))
        
        
        router.push("/downloads")
    }
    //console.log(progress)
    useEffect(()=>{
        getchapterpages()
    },[])
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{flex:0.04}}>
            <StatusBar  hidden/>
            <TouchableOpacity style={{flex:1}} onPress={() =>{navmangapage()}}>
            <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            </View>
            <View style={{flex:0.02}}>
            {completedpages > 0 &&
            <View style ={{alignSelf:"flex-end"}} >
            <View style={{width:50,height:3,backgroundColor:"white"}}>
            <View style={{width:`${(completedpages/totalpages)*100}%`,height:3,backgroundColor:"blue"}}></View>
            </View>
            <Text style={{fontSize:10,justifyContent:"flex-end",color:"white"}}>{completedpages}/{totalpages}</Text>
            </View>
            }   
            </View>

            <View style={{flex:0,alignItems:"center"}}>
             
                <TouchableOpacity onLongPress={() =>{download_volume()}}>
                    <Image style={{width:150,height:225}} alt="hello" source={{uri:cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}` }}></Image>
                </TouchableOpacity>
                <Text style={{color:"white",fontSize:20}}>{title}</Text>
                <Text style={{color:"grey",fontSize:13}}>Volume: {volumeno}</Text>

            </View>

            {chapterfeed.length !== 0 &&
            <FlatList
                    numColumns={2}
                    style={{flex:0.1}}
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={chapterfeed}
                    renderItem={({item,index}:any) => {
                            return (
                                
                                <ChapterCover  key={index} volumeno={volumeno} chapterid={item.id} title={title} chaptertitle={item.attributes.title} chapter={item.attributes.chapter}  mangaid={mangaid} cover_art={cover_art} cover_id={cover_id} type={type} currentpageparam={currentpageparam}></ChapterCover>
                
                            )
                    }
                }

            />}



        </View>
    )
}