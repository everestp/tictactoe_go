package ws

import "encoding/json"

//inbounf message-> message  incoming
type InboundMessage struct {
	Type string          `json:"type"` // "join", "move"
	Data json.RawMessage `json:"data"`
}

type JoinPayload struct {
	PlayerID   string `json:"player_id"`
	PlayerName string `json:"player_name"`
}


type MovePlayed struct {
	Row int `json:"row"`
	Col int`json:"col"`

}


// out bound message ->  message- outgoing
type OutboundMessage struct {
	Type string      `json:"type"` // "state", "game_over", "error"
	Data  any `json:"data"`
}

type GameStatePayload struct {
	Board      []string `json:"board"`       // length 9
	Turn       string   `json:"turn"`        // "X" or "O"
	YourSymbol string   `json:"your_symbol"` // per client
}

type GameOverPayload struct {
	Winner string `json:"winner"` // "X", "O", or "draw"
}

type ErrorPayload struct {
	Message string `json:"message"`
}
