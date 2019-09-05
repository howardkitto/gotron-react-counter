package main

import (
	"fmt"
	"time"

	"github.com/Equanox/gotron"
)

// CustomEvent - Create a custom event struct that has a pointer to gotron.Event
type CustomEvent struct {
	*gotron.Event
	CustomAttribute string `json:"AtrNameInFrontend"`
}

func count(window *gotron.BrowserWindow) {
	fmt.Println("count here")
	window.Send(&CustomEvent{
		Event:           &gotron.Event{Event: "event-name"},
		CustomAttribute: "Hello World... wassup??!",
	})

	time.Sleep(2 * time.Second)
	count(window)
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

	// Start the browser window.
	// This will establish a golang <=> nodejs bridge using websockets,
	// to control ElectronBrowserWindow with our window object.
	done, err := window.Start()
	if err != nil {
		panic(err)
	}

	// Open dev tools must be used after window.Start
	window.OpenDevTools()

	count(window)
	// Wait for the application to close
	<-done
}
