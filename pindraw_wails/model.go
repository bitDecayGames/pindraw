package main

import "github.com/google/uuid"

type Point struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

type Size struct {
	Width  float32 `json:"width"`
	Height float32 `json:"height"`
}

type AABB struct {
	// Position is the bottom left position of the rectangle
	Position Point `json:"position"`
	Size     Size  `json:"size"`
}

type LineSegmentEntity struct {
	Id      string   `json:"id"`
	GroupId *string  `json:"groupId"`
	Start   Point    `json:"start"`
	End     Point    `json:"end"`
	Sensor  bool     `json:"sensor"`
	FlagIds []string `json:"flagIds"`
}

type LineEntity struct {
	Id      string   `json:"id"`
	GroupId *string  `json:"groupId"`
	Points  []Point  `json:"points"`
	Sensor  bool     `json:"sensor"`
	FlagIds []string `json:"flagIds"`
}

type CurveEntity struct {
	Id            string   `json:"id"`
	GroupId       *string  `json:"groupId"`
	ControlPoints []Point  `json:"controlPoints"`
	Sensor        bool     `json:"sensor"`
	FlagIds       []string `json:"flagIds"`
}

type CircleEntity struct {
	Id       string   `json:"id"`
	GroupId  *string  `json:"groupId"`
	Position Point    `json:"position"`
	Radius   float32  `json:"radius"`
	Sensor   bool     `json:"sensor"`
	FlagIds  []string `json:"flagIds"`
}

type RectangleEntity struct {
	Id      string  `json:"id"`
	GroupId *string `json:"groupId"`
	AABB    AABB    `json:"aabb"`
	// Rotation the amount the rectangle is rotated in radians
	Rotation float32  `json:"rotation"`
	Sensor   bool     `json:"sensor"`
	FlagIds  []string `json:"flagIds"`
}

type EntityType string

const (
	EntityTypeSegment   EntityType = "segment"
	EntityTypeLine      EntityType = "line"
	EntityTypeCurve     EntityType = "curve"
	EntityTypeCircle    EntityType = "circle"
	EntityTypeRectangle EntityType = "rectangle"
	EntityTypeObject    EntityType = "object"
)

var AllEntityTypes = []struct {
	Value  EntityType
	TSName string
}{
	{EntityTypeSegment, "segment"},
	{EntityTypeLine, "line"},
	{EntityTypeCurve, "curve"},
	{EntityTypeCircle, "circle"},
	{EntityTypeRectangle, "rectangle"},
	{EntityTypeObject, "object"},
}

type FieldType string

const (
	FieldTypeString FieldType = "string"
	FieldTypeFloat  FieldType = "float"
	FieldTypeInt    FieldType = "int"
	FieldTypeBool   FieldType = "bool"
	FieldTypeId     FieldType = "id"
)

var AllFieldTypes = []struct {
	Value  FieldType
	TSName string
}{
	{FieldTypeString, "string"},
	{FieldTypeFloat, "float"},
	{FieldTypeInt, "int"},
	{FieldTypeBool, "bool"},
	{FieldTypeId, "id"},
}

type SelectOption struct {
	Id    string `json:"id"`
	Label string `json:"label"`
	Value any    `json:"value"`
}

type FieldDefinition struct {
	Id           string         `json:"id"`
	Label        string         `json:"label"`
	Type         FieldType      `json:"type"`
	DefaultValue any            `json:"defaultValue"`
	Min          *float32       `json:"min"`
	Max          *float32       `json:"max"`
	Options      []SelectOption `json:"options"`
	// EntityTypeFilter is used when the Type is set to FieldTypeId to filter out the types of entities that are shown in the list
	EntityTypeFilter []EntityType `json:"entityTypeFilter"`
	// EntityFlagFilter is used when the Type is set to FieldTypeId to filter out the entities that have a given flag id
	EntityFlagFilter []string `json:"entityFlagFilter"`
}

type Flag struct {
	Id    string `json:"id"`
	Label string `json:"label"`
	Color string `json:"color"`
}

type ObjectDefinition struct {
	Id   string `json:"id"`
	Size Size   `json:"size"`
	// Rotation the amount the object is rotated in radians by default
	Rotation float32                    `json:"rotation"`
	Sprite   string                     `json:"sprite"`
	Fields   map[string]FieldDefinition `json:"fields"`
	FlagIds  []string                   `json:"flagIds"`
}

type ObjectEntity struct {
	Id           string  `json:"id"`
	GroupId      *string `json:"groupId"`
	DefinitionId string  `json:"definitionId"`
	AABB         AABB    `json:"aabb"`
	// Rotation the amount the object is rotated in radians
	Rotation float32        `json:"rotation"`
	Fields   map[string]any `json:"fields"`
}

type Group struct {
	Id   string `json:"id"`
	AABB AABB   `json:"aabb"`
	// Rotation the amount the group is rotated in radians
	Rotation float32 `json:"rotation"`
}

type Level struct {
	Id    string `json:"id"`
	Label string `json:"label"`
	AABB  AABB   `json:"aabb"`
	// Rotation the amount the group is rotated in radians
	Rotation float32 `json:"rotation"`

	Segments   []LineSegmentEntity `json:"segments"`
	Lines      []LineEntity        `json:"lines"`
	Curves     []CurveEntity       `json:"curves"`
	Circles    []CircleEntity      `json:"circles"`
	Rectangles []RectangleEntity   `json:"rectangles"`
	Objects    []ObjectEntity      `json:"objects"`
	Groups     []Group             `json:"groups"`
}
type World struct {
	Id    string `json:"id"`
	Label string `json:"label"`
	// Rotation the amount the world is rotated in radians
	Rotation          float32            `json:"rotation"`
	Flags             []Flag             `json:"flags"`
	ObjectDefinitions []ObjectDefinition `json:"objectDefinitions"`
	Levels            []Level            `json:"levels"`
}

func DefaultWorld() *World {
	return &World{
		Id:    uuid.NewString(),
		Label: "My World",
		Levels: []Level{{
			Id:    uuid.NewString(),
			Label: "Level1",
			AABB:  AABB{Position: Point{0, 0}, Size: Size{800, 600}},
		}},
	}
}

type EventType string

const (
	EventTypeLoad   EventType = "load"
	EventTypeError  EventType = "error"
	EventTypeSave   EventType = "save"
	EventTypeSaveAs EventType = "saveAs"
)

var AllEventTypes = []struct {
	Value  EventType
	TSName string
}{
	{EventTypeLoad, "load"},
	{EventTypeError, "error"},
	{EventTypeSave, "save"},
	{EventTypeSaveAs, "saveAs"},
}
