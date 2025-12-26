package ws

import (
	"log"

	"github.com/gorilla/websocket"
)

//client  represent one connected palyer
type Client struct{
	ID string
	Conn *websocket.Conn
	Send chan OutboundMessage
	Hub *Hub
}


// ClientMessage is sent to the Hub when a client sends an inbound message.
// It contains the client itself and the message they sent.
type ClientMessage struct {
	Client  *Client        // The client who sent the message
	Message InboundMessage // The actual inbound message
}


// This run in  your own go routine Reade the message
func (c *Client) ReadPump(){
	defer func()  {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		var msg InboundMessage
		err :=c.Conn.ReadJSON(&msg)
		if err != nil{
			log.Println("read error",err)
		break
		}
		//send inbound message to Hub
		c.Hub.InboundMessage <- Client
	}
}

