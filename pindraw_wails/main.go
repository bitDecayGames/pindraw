package main

import (
	"embed"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"runtime"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	rt "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "PinDraw",
		Width:            1024,
		Height:           768,
		AssetServer:      &assetserver.Options{Assets: assets},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Menu:             createMenu(app),
		Bind: []interface{}{
			app,
		},
		EnumBind: []interface{}{
			AllFieldTypes,
			AllEntityTypes,
			AllEventTypes,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

func createMenu(app *App) *menu.Menu {
	appMenu := menu.NewMenu()
	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.AppMenu()) // On macOS platform, this must be done right after `NewMenu()`
	}
	fileMenu := appMenu.AddSubmenu("File")
	fileMenu.AddText("New World", keys.CmdOrCtrl("n"), func(_ *menu.CallbackData) {
		if app.currentFile != "" && app.lastChange.After(app.lastSave) {
			buttonResult, _ := rt.MessageDialog(app.ctx, rt.MessageDialogOptions{
				Type:          rt.WarningDialog,
				Title:         "Are you sure?",
				Message:       "Any unsaved changes will be lost!",
				Buttons:       []string{"Continue Without Saving", "Save Then Continue", "Cancel"},
				DefaultButton: "Save Then Continue",
				CancelButton:  "Cancel",
			})
			if buttonResult == "Cancel" {
				return
			} else if buttonResult == "Continue Without Saving" {
				// do nothing
			} else {
				rt.EventsEmit(app.ctx, string(EventTypeSave), nil)
				return
			}
		}
		app.currentFile = ""
		app.saveMenuItem.Enable()
		app.saveAsMenuItem.Enable()
		rt.MenuUpdateApplicationMenu(app.ctx)
		rt.LogPrint(app.ctx, "Create default world")
		rt.EventsEmit(app.ctx, string(EventTypeLoad), DefaultWorld())
	})
	fileMenu.AddText("Open", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
		if app.currentFile != "" && app.lastChange.After(app.lastSave) {
			buttonResult, _ := rt.MessageDialog(app.ctx, rt.MessageDialogOptions{
				Type:          rt.WarningDialog,
				Title:         "Are you sure?",
				Message:       "Any unsaved changes will be lost!",
				Buttons:       []string{"Continue Without Saving", "Save Then Continue", "Cancel"},
				DefaultButton: "Save Then Continue",
				CancelButton:  "Cancel",
			})
			if buttonResult == "Cancel" {
				return
			} else if buttonResult == "Continue Without Saving" {
				// do nothing
			} else {
				rt.EventsEmit(app.ctx, string(EventTypeSave), nil)
				return
			}
		}
		world, err := app.Load()
		if err != nil {
			s, err := rt.MessageDialog(app.ctx, rt.MessageDialogOptions{
				Type:          rt.ErrorDialog,
				Title:         "Failed to load",
				Message:       err.Error(),
				Buttons:       []string{"Okay"},
				DefaultButton: "Okay",
			})
			if err != nil {
				rt.LogPrintf(app.ctx, "failed to show error dialog: %v(%s)", err, s)
				return
			}
		}
		rt.LogPrintf(app.ctx, "Loaded world: %+v", world)
		app.saveMenuItem.Enable()
		app.saveAsMenuItem.Enable()
		rt.MenuUpdateApplicationMenu(app.ctx)
		rt.EventsEmit(app.ctx, string(EventTypeLoad), world)
	})
	fileMenu.AddSeparator()
	app.saveMenuItem = fileMenu.AddText("Save", keys.CmdOrCtrl("s"), func(_ *menu.CallbackData) {
		rt.EventsEmit(app.ctx, string(EventTypeSave), nil)
	})
	app.saveMenuItem.Disable()
	app.saveAsMenuItem = fileMenu.AddText("Save As", keys.Combo("s", keys.CmdOrCtrlKey, keys.ShiftKey), func(_ *menu.CallbackData) {
		rt.EventsEmit(app.ctx, string(EventTypeSaveAs), nil)
	})
	app.saveAsMenuItem.Disable()
	fileMenu.AddSeparator()
	fileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		rt.Quit(app.ctx)
	})
	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.EditMenu()) // On macOS platform, EditMenu should be appended to enable Cmd+C, Cmd+V, Cmd+Z... shortcuts
	}
	return appMenu
}
