import React from 'react';
import { StyleSheet, Text, View,TextInput,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scannedStudentId:''
        }
    }
    getCameraPermissions =async(id)=>{
        const {status} =await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState= this.state.buttonState;
        
        if(buttonState !== "normal" && hasCameraPermissions){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned? undefined :this.handlelBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
    )
        }
        else if (buttonState === "normal"){
            return(
              <View style={styles.container}>
                  <View>
                      <Image
                      source ={require("../assets/booklogo.jpg")}
                      style={{width:200,height:200}}
                      />
                      <Text style={{textAlign:'center',fontSize:30}}>Wily</Text>
                  </View>
              <View style={styles.inputView}>
              <TextInput style={styles.inputBox} 
               placeholder="Book ID" value={this.state.scannedBookId}/>
               <TouchableOpacity style={styles.scanButton}
               onPress={()=>{
                   this.getCameraPermissions("BookId")
               }}>
              <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>  
              </View>
              <View style ={styles.inputView}>
              <TextInput style={styles.inputBox} 
               placeholder="Student ID" value={this.state.scannedStudentId}/>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={()=>{
                    this.getCameraPermissions("StudentId")
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style ={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            </View>
            );
          }
        }
      }
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifycontent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        height:27
      },
      inputView:{
        flexDirection: 'row',
        margin: 20
      },
      inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      },
      submitButton:{
          backgroundColor:'pink',
          width:100,
          height:50
      },
      submitButtonText:{
          padding:10,
          textAlign:'center',
          fontSize:20,
          fontWeight:"bold"
      }
    });