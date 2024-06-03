import { View,Text,Image,TouchableOpacity } from "react-native"
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
export default function ChapterCover({mangaid,cover_art,chapter,title,chapterid,cover_id,type,chaptertitle,volumeno,currentpageparam}:any){
    const router = useRouter()
    const navtochapters = async () =>{
        router.push({ pathname: "/page", params: {"volumeno":volumeno,"chapterid":chapterid,"mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":cover_art,"chaptertitle":chaptertitle}});
    }
    //console.log()
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={() =>{navtochapters()}}>
                <Image style={{width:175,height:250}} alt="hello" source={{uri:cover_art}}></Image>
                <Text style={{color:"white",width:175}}>Chapter - {chaptertitle}-  {chapter} </Text>
            </TouchableOpacity>
        </View>

    )
}