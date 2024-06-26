import { Text, TouchableOpacity ,FlatList,Alert} from "react-native"
import axios from "axios"
export default function FilterItem({index,label,kind,setQualifications}:any){
    const searchqualifications =async () => {
        //let offset = pagenum === 1 ? 1 : pagenum * 8 
        const response= await axios.get(`http://192.168.0.28:8080/api/v1/searchqualifications?text=${label}`)
        let result = response.data
        //console.log(result)
        if ("qualifications" in result){
          setQualifications(result["qualifications"])
        }
        else if ("error" in result){
          if (!result.error.includes("no qualifications") ){
            Alert.alert(result.error)
          }
        }
    
    
        
      }

    return(
    <TouchableOpacity onPress={() =>{searchqualifications()}} style={{backgroundColor:index % 2 ==0 ? "#354b53":"#61edae",borderRadius:3,minWidth:50,justifyContent:"center",alignItems:"center",padding:5}}>
        <Text style={{color:index % 2 ==0 ? "white":"black",fontWeight:"bold"}} >{label}</Text>
    </TouchableOpacity>)
}