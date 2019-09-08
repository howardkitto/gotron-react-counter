package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/Equanox/gotron"
)

// CustomEvent - Create a custom event struct that has a pointer to gotron.Event
type CustomEvent struct {
	*gotron.Event
	Value string `json:"value"`
}

// UIMessage - communication from front end
type UIMessage struct {
	Event string `json:"event"`
	Value bool   `json:"value"`
}

var toggle = false

func count(window *gotron.BrowserWindow, num int) {
	window.Send(&CustomEvent{
		Event: &gotron.Event{Event: "purple cat"},
		Value: fmt.Sprintf("value %v ", num),
	})

	time.Sleep(2 * time.Second)
	num++
	fmt.Println("toggle is ", toggle)

	if toggle == true {
		count(window, num)
	}

}

func main() {
	// Create a new browser window instance
	window, err := gotron.New("ui/dist")
	if err != nil {
		panic(err)
	}

	// Alter default window size and window title.
	window.WindowOptions.Width = 1200
	window.WindowOptions.Height = 980
	window.WindowOptions.Title = "Gotron boilerplate"
	window.On(&gotron.Event{Event: "toggle"}, func(bin []byte) {
		s := string(bin)
		fmt.Printf("got it! %v\n", s)

		var m UIMessage
		err := json.Unmarshal(bin, &m)
		if err != nil {
			fmt.Println("is it this one", err)
		}

		if m.Event == "toggle"{			
			toggle = m.Value
			go count(window, 0)
		}

	})

	// Start the browser window.
	// This will establish a golang <=> nodejs bridge using websockets,
	// to control ElectronBrowserWindow with our window object.
	done, err := window.Start()
	if err != nil {
		panic(err)
	}

	// Open dev tools must be used after window.Start
	window.OpenDevTools()

	// count(window, 0)

	// Wait for the application to close
	<-done
}
