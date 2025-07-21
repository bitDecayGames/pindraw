package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
	"time"
)

// App struct
type App struct {
	ctx            context.Context
	currentFile    string
	saveMenuItem   *menu.MenuItem
	saveAsMenuItem *menu.MenuItem
	undoStack      []World
	lastChange     time.Time
	lastSave       time.Time
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Save serializes a World object and saves it as a json file
func (a *App) Save(world World, forceDialog bool) error {
	var err error
	var filename string
	if a.currentFile != "" && !forceDialog {
		filename = a.currentFile
	} else {
		filename, err = runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{Filters: []runtime.FileFilter{{DisplayName: "Json Level Files (*.json)", Pattern: "*.json"}}})
	}
	if err != nil {
		return err
	}
	data, err := json.Marshal(world)
	if err != nil {
		return err
	}
	err = os.WriteFile(filename, data, 0x700)
	if err != nil {
		return err
	}
	runtime.LogPrintf(a.ctx, "Saved at: %s\n%+v", filename, world)
	a.currentFile = filename
	a.lastSave = time.Now()
	return nil
}

// Changed tracks the changes made to the world
func (a *App) Changed(world *World) {
	if world != nil {
		a.lastChange = time.Now()
		a.undoStack = append(a.undoStack, *world)
	}
}

// Load takes a json file path and tries to decode it as json into a World object
func (a *App) Load() (*World, error) {
	filename, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultFilename: a.currentFile,
		Filters:         []runtime.FileFilter{{DisplayName: "Json Level Files (*.json)", Pattern: "*.json"}},
	})
	if err != nil {
		return nil, err
	}
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	w := &World{}
	err = json.Unmarshal(data, w)
	if err != nil {
		return nil, err
	}
	runtime.LogPrintf(a.ctx, "Loaded from: %s\n%+v", filename, w)
	a.currentFile = filename
	a.lastSave = time.Now()
	return nil, nil
}
