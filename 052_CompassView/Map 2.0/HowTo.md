2/27/2026 - Map 2.0 development

The latest iteration, "map-test-6a.html", takes an approach of hiding all of the default OpenStreetMap layers and then selectively adding my own.

Here's how to find and add specific geographic elements (e.g. Bunker Hill, Boston Common, Logan Airport)

The primary tool is https://overpass-turbo.eu but in that tool we need to have a query to isolate and be able export the geojson.  A typical query looks like this:

area["name"="Boston"]->.searchArea;

(
  way["leisure"="park"]["name"="Bunker Hill Monument"](area.searchArea);
  relation["leisure"="park"]["name"="Bunker Hill Monument"](area.searchArea);
);

out geom;

Here are a few ways to create those queries:

- Overpass Turbo has a Wizard that can take a more natural language prompt such as "leisure=park in Charlestown" or "name="Bunker Hill Monument" to generate an actual query

- In openstreetmap.org visually navigate to a particular area
- Use the ? button (query too) to click on a park or element.  A table of tags will show up in the left sidebar.  The most important tag is leisure (e.g. leisure: park) but you may also want the name

- in overpass you can also zoom to a specific area and then run the following query to fetch all tags for that area:

(
  node({{bbox}});
  way({{bbox}});
  relation({{bbox}});
);
out body;

When constructing a query from these tags:

- Overpass format is:  way["key"="value"](area);
- So, for leisure=park, that becomes way["leisure"="park"];

To restrict to only Boston, and get every park, this is the query:

area["name"="Boston"]->.searchArea;

(
  way["leisure"="park"](area.searchArea);
  relation["leisure"="park"](area.searchArea);
);

out geom;

Summary from Claude (from the "Integrating new map style into compass view dashboard" chat)

Here's a summary of how the custom Mapbox style works, using your own code as the reference.
The core pattern
The approach you're already using is: start with a base style (light-v11), hide everything, then selectively add back only the layers you want with your own colors. Every layer you add follows the same structure — an id, a type, a source, and paint properties for color/width/opacity.
Layer types

fill — polygons (water, buildings, parks, landuse)
line — roads, waterways, runways
circle — point markers like your camera dot
background — the base canvas color

Changing colors is just editing the paint block:
javascriptpaint: { 'fill-color': '#bbdefb' }      // water
paint: { 'line-color': '#888888' }      // roads
paint: { 'background-color': '#f4f1ea' } // background
Hiding a layer type — just don't add it. Since you hide everything first with the forEach loop, anything you omit stays invisible. To hide roads for example, just remove the major-roads and minor-roads addLayer blocks entirely.
Filtering within a source layer — the filter property lets you target specific subtypes. You're already doing this for roads (by class) and parks (by class):
javascriptfilter: ['==', ['get', 'class'], 'park']      // only parks
filter: ['==', ['get', 'class'], 'primary']   // only primary roads
Available source layers in composite — the ones most useful for a custom style:

water — lakes, ocean, rivers (fill)
waterway — rivers/streams as lines
road — all roads, filterable by class: motorway, trunk, primary, secondary, tertiary, street
building — building footprints
landuse — filterable by class: park, cemetery, hospital, school, industrial
landcover — grass, scrub, wood, snow
admin — country/state boundaries

Zoom-dependent styling — you're already using this for road width. The same interpolate pattern works for any numeric paint property:
javascript'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.5, 15, 2]
// at zoom 12 → 0.5px wide; at zoom 15 → 2px wide
GeoJSON overlays sit on top of all of this and follow the exact same addSource / addLayer pattern, which is why your parks.geojson and logan.geojson files slot in so naturally.