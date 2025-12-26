package ws

import (
	"encoding/json"

	"golang.org/x/text/unicode/rangetable"
	"golang.org/x/tools/go/analysis/passes/nilfunc"
)


type Hub struct {
	// Connected clients
	Clients map[*Client]bool

	// Map symbol ("X"/"O") to Client
	Players map[string]*Client

	// Game state
	Board [9]string
	Turn  string // "X" or "O"

	// Channels for concurrency
	Register   chan *Client
	Unregister chan *Client
	Inbound    chan ClientMessage


}

//intilized the hub
func NewHub() *Hub {
	return &Hub{
		Clients:    make(map[*Client]bool),
		Players:    make(map[string]*Client),
		Board:      [9]string{},
		Turn:       "X",
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Inbound:    make(chan ClientMessage),
	}
}


// // hub run the loop
// func (h *Hub) Run(){
// 	for {
// 		select{
// 		case client:= <-h.Register:
// 			h.
// 		}
// 	}
// }
// }

//Register Client


func(h *Hub) handlerRegister(client *Client){
	h.Clients[client]=true

	//Assing X  or O
	if _ ,ok :=h.Players["X"]; ok{
		h.Players["X"]=client
		client.ID="X"
	} else if _,ok :=h.Players["O"]; !ok {
			h.Players["O"] = client
		client.ID = "O"
	} else {
		client.Send <- OutboundMessage{
			Type: "error",
			Data: ErrorPayload{Message: "Game already full"},

		}
	}
	//Board cast intial state
h.sendStat()
}


//send  game stat to client

func( h *Hub) sendStat(){
	for symbol ,client :=range h.Players{
		client.Send <-OutboundMessage{
            Type: "state",
			Data: GameStatePayload{
				Board: h.Board[:],
				Turn: h.Turn,
				YourSymbol: symbol,
			},
		}
	}
}

// handle unregister  client
func (h *Hub) handlerUnregister(client *Client){
	if _ ,ok :=h.Clients[client];ok {
		delete(h.Clients, client)
		delete(h.Players, client.ID)
		close(client.Send)
	}
}

func (h *Hub) handleInbound(cm ClientMessage) {
	switch cm.Message.Type {
	case "move":
		h.handleMove(cm)
	default:
		h.sendError(cm.Client, "Unknown message type")
	}
}

func (h *Hub) handleMove(cm ClientMessage) {
	var move MovePlayed
	if err := json.Unmarshal(cm.Message.Data, &move); err != nil {
		h.sendError(cm.Client, "Invalid move payload")
		return
	}

	index := move.Row*3 + move.Col

	// Validate turn
	if cm.Client.ID != h.Turn {
		h.sendError(cm.Client, "Not your turn")
		return
	}

	// Validate cell
	if index < 0 || index > 8 || h.Board[index] != "" {
		h.sendError(cm.Client, "Cell already taken")
		return
	}

	// Make move
	h.Board[index] = h.Turn

	// Check winner
	if h.checkWinner(h.Turn) {
		h.sendGameOver(h.Turn)
		h.reset()
		return
	}

	// Switch turn & broadcast
	h.switchTurn()
	h.sendStat()
}


func (h *Hub) switchTurn(){
	if h.Turn == "X"{
		h.Turn = "O"

	}else{
		h.Turn="X"
	}
}


func (h *Hub) checkWinner(p string) bool{ 
	b := h.Board
	wins := [8][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // rows
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // columns
		{0, 4, 8}, {2, 4, 6},            // diagonals
	}

	for _ , w := range wins{
		if b[w[0]]==p && b[w[1]]==p && b[w[2]]==p {
			return  true
		} 
		
	}
 return  false
}


func ( h *Hub) sendError(c *Client , msg  string){
	c.Send <-OutboundMessage{
		Type: "error",
		Data:ErrorPayload{Message: msg},
	}
} 


func (h *Hub) resetGame() {
	h.Board = [9]string{}
	h.Turn = "X"
	h.sendStat()
}
func (h *Hub) sendGameOver(winner string) {
	for _, client := range h.Players {
		client.Send <- OutboundMessage{
			Type: "game_over",
			Data: GameOverPayload{Winner: winner},
		}
	}
}