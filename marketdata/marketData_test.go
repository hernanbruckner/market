package marketdata

import (
	"testing"
	"time"
)

var asc = AssetConfig{}

func TestMockMarketData(t *testing.T) {
	_, err := asc.MockMarketData(time.Now())
	if err != nil {
		t.Fatalf(err.Error())
	}
}

func TestMockMarketDataZeroTime(t *testing.T) {
	var timeStamp time.Time
	_, err := asc.MockMarketData(timeStamp)
	if err == nil {
		t.Fatalf("Fecha incorrecta no detectada")
	}
}
