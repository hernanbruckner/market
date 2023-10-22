package main

import (
	"encoding/json"
	"fmt"
	"log"

	"bruck.com.ar/market/marketdata"
)

var manager *Manager

func SetManager(m *Manager) {
	manager = m
}

func Broadcast(md marketdata.MarketData) error {

	data, err := json.Marshal(md)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var event = Event{Type: EventMarketData, Payload: data}

	log.Println("Enviando ", len(manager.clients), " mensajes")

	for cli := range manager.clients {
		cli.egress <- event
	}

	return nil
}
