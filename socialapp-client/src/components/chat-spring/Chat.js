import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {connect} from "react-redux";
import "./../chat/SpringChat.css"

class chat extends Component {
  static stompClient;

   constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      messages:[] ,
      message:'',
      userId:this.props.currentUserId,
      handle:this.props.currentUserHandle
    };
    this.currentPeerUser = this.props.currentPeerUser
    this.handleMessage=this.handleMessage.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.onKeyBoardPress=this.onKeyBoardPress.bind(this);
    this.topicId=this.currentPeerUser.userId<=this.state.userId?this.currentPeerUser.userId+'-'+this.state.userId:this.state.userId+'-'+this.currentPeerUser.userId;
  }
  
  componentDidMount(){
    console.log(this.state.time)
     this.stompClient = Stomp.over(function(){
               return new SockJS('http://localhost:8080/chat-websocket')
              });
    this.stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame)
        console.log(this.topicId)
        this.stompClient.send("/app/chat/"+this.topicId,{},JSON.stringify({
          }));
        this.stompClient.subscribe('/topic/messages/'+this.topicId,message => {
              this.setState({
              messages:JSON.parse(message.body).body
            })
            
        });
    });  
  }

  onKeyBoardPress(event){
    if(event.key==="Enter")
      this.sendMessage()
  }

  handleMessage(event){
    this.setState({
      message:event.target.value
    });
  }

  sendMessage(){
   console.log(this.state.time)
   this.stompClient.send("/app/chat/"+this.topicId, {}, JSON.stringify({
    	'sentByUserId': this.state.userId,
      'sentByUserName': this.state.handle,
      'sentToUserId':this.currentPeerUser.userId,
      'sentToUserName':this.currentPeerUser.handle,
      'time':Date.now(),
    	'message':this.state.message,
      })); 
      this.setState({
        message:''
      })
   }//end of sendMessage
  
  render(){
   
      return (
        <div className="chatboard"> 
        <div className="headername">{this.currentPeerUser.handle}</div>
        <div className="chat" id="chat">
           {
            this.state.messages.map((message)=>
            <div className={this.state.userId===message.sentByUserId?"viewItemRight":"viewItemLeft"}>
              <div className="textContentItem">{message.message}</div>
              </div>
            )
          }
        </div>
        <div className="messageBox"><TextField onChange={this.handleMessage} onKeyPress={this.onKeyBoardPress} value={this.state.message} variant="outlined" fullWidth></TextField>
        <Button variant="contained"  color="primary" onClick={this.sendMessage}>
        Send
        </Button>
        </div>
          
        
        </div>
        
    )
  }
}




const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps)(chat)
 