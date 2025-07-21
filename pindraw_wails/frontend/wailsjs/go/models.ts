export namespace main {
	
	export enum FieldType {
	    string = "string",
	    float = "float",
	    int = "int",
	    bool = "bool",
	    id = "id",
	}
	export enum EntityType {
	    segment = "segment",
	    line = "line",
	    curve = "curve",
	    circle = "circle",
	    rectangle = "rectangle",
	    object = "object",
	}
	export enum EventType {
	    load = "load",
	    error = "error",
	    save = "save",
	    saveAs = "saveAs",
	}
	export class Size {
	    width: number;
	    height: number;
	
	    static createFrom(source: any = {}) {
	        return new Size(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.width = source["width"];
	        this.height = source["height"];
	    }
	}
	export class Point {
	    x: number;
	    y: number;
	
	    static createFrom(source: any = {}) {
	        return new Point(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.x = source["x"];
	        this.y = source["y"];
	    }
	}
	export class AABB {
	    position: Point;
	    size: Size;
	
	    static createFrom(source: any = {}) {
	        return new AABB(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.position = this.convertValues(source["position"], Point);
	        this.size = this.convertValues(source["size"], Size);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CircleEntity {
	    id: string;
	    groupId?: string;
	    position: Point;
	    radius: number;
	    sensor: boolean;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new CircleEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.position = this.convertValues(source["position"], Point);
	        this.radius = source["radius"];
	        this.sensor = source["sensor"];
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CurveEntity {
	    id: string;
	    groupId?: string;
	    controlPoints: Point[];
	    sensor: boolean;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new CurveEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.controlPoints = this.convertValues(source["controlPoints"], Point);
	        this.sensor = source["sensor"];
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SelectOption {
	    id: string;
	    label: string;
	    value: any;
	
	    static createFrom(source: any = {}) {
	        return new SelectOption(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.value = source["value"];
	    }
	}
	export class FieldDefinition {
	    id: string;
	    label: string;
	    type: FieldType;
	    defaultValue: any;
	    min?: number;
	    max?: number;
	    options: SelectOption[];
	    entityTypeFilter: string[];
	    entityFlagFilter: string[];
	
	    static createFrom(source: any = {}) {
	        return new FieldDefinition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.type = source["type"];
	        this.defaultValue = source["defaultValue"];
	        this.min = source["min"];
	        this.max = source["max"];
	        this.options = this.convertValues(source["options"], SelectOption);
	        this.entityTypeFilter = source["entityTypeFilter"];
	        this.entityFlagFilter = source["entityFlagFilter"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Flag {
	    id: string;
	    label: string;
	    color: string;
	
	    static createFrom(source: any = {}) {
	        return new Flag(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.color = source["color"];
	    }
	}
	export class Group {
	    id: string;
	    aabb: AABB;
	    rotation: number;
	
	    static createFrom(source: any = {}) {
	        return new Group(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.aabb = this.convertValues(source["aabb"], AABB);
	        this.rotation = source["rotation"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ObjectEntity {
	    id: string;
	    groupId?: string;
	    definitionId: string;
	    aabb: AABB;
	    rotation: number;
	    fields: Record<string, any>;
	
	    static createFrom(source: any = {}) {
	        return new ObjectEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.definitionId = source["definitionId"];
	        this.aabb = this.convertValues(source["aabb"], AABB);
	        this.rotation = source["rotation"];
	        this.fields = source["fields"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RectangleEntity {
	    id: string;
	    groupId?: string;
	    aabb: AABB;
	    rotation: number;
	    sensor: boolean;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new RectangleEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.aabb = this.convertValues(source["aabb"], AABB);
	        this.rotation = source["rotation"];
	        this.sensor = source["sensor"];
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LineEntity {
	    id: string;
	    groupId?: string;
	    points: Point[];
	    sensor: boolean;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new LineEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.points = this.convertValues(source["points"], Point);
	        this.sensor = source["sensor"];
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LineSegmentEntity {
	    id: string;
	    groupId?: string;
	    start: Point;
	    end: Point;
	    sensor: boolean;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new LineSegmentEntity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.groupId = source["groupId"];
	        this.start = this.convertValues(source["start"], Point);
	        this.end = this.convertValues(source["end"], Point);
	        this.sensor = source["sensor"];
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Level {
	    id: string;
	    label: string;
	    aabb: AABB;
	    rotation: number;
	    segments: LineSegmentEntity[];
	    lines: LineEntity[];
	    curves: CurveEntity[];
	    circles: CircleEntity[];
	    rectangles: RectangleEntity[];
	    objects: ObjectEntity[];
	    groups: Group[];
	
	    static createFrom(source: any = {}) {
	        return new Level(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.aabb = this.convertValues(source["aabb"], AABB);
	        this.rotation = source["rotation"];
	        this.segments = this.convertValues(source["segments"], LineSegmentEntity);
	        this.lines = this.convertValues(source["lines"], LineEntity);
	        this.curves = this.convertValues(source["curves"], CurveEntity);
	        this.circles = this.convertValues(source["circles"], CircleEntity);
	        this.rectangles = this.convertValues(source["rectangles"], RectangleEntity);
	        this.objects = this.convertValues(source["objects"], ObjectEntity);
	        this.groups = this.convertValues(source["groups"], Group);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class ObjectDefinition {
	    id: string;
	    size: Size;
	    rotation: number;
	    sprite: string;
	    fields: Record<string, FieldDefinition>;
	    flagIds: string[];
	
	    static createFrom(source: any = {}) {
	        return new ObjectDefinition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.size = this.convertValues(source["size"], Size);
	        this.rotation = source["rotation"];
	        this.sprite = source["sprite"];
	        this.fields = this.convertValues(source["fields"], FieldDefinition, true);
	        this.flagIds = source["flagIds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	
	export class World {
	    id: string;
	    label: string;
	    rotation: number;
	    flags: Flag[];
	    objectDefinitions: ObjectDefinition[];
	    levels: Level[];
	
	    static createFrom(source: any = {}) {
	        return new World(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.rotation = source["rotation"];
	        this.flags = this.convertValues(source["flags"], Flag);
	        this.objectDefinitions = this.convertValues(source["objectDefinitions"], ObjectDefinition);
	        this.levels = this.convertValues(source["levels"], Level);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

