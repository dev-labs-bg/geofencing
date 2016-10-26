# About 
Geofencing example implemented on React and Leaflet.

It includes drawing on the map by two possible scenarios (drawing modes):
- Mouse dragging. 
- Clicking on the map. Here it will create a Circle with predefined radius. Аfterwards you can change the radius with the slider component.

In the both modes you have *Drawing data* summary panel, where you can check the radius and the center of the already drawn Circle.

# Demo
https://dev-labs-bg.github.io/geofencing-demo/

# Installation
_You’ll need to have Node >= 4 on your machine._

```sh
npm start
```

# Implementation details
Firstly I tried to accomplish the example with [CircleMarker](http://leafletjs.com/reference-1.0.0.html#circlemarker) object.
Due to that I implemented custom `components/Draw.js` component, instead of using [Leaflet.Draw library](https://github.com/Leaflet/Leaflet.draw) (the library implements the drawing with [Circle](http://leafletjs.com/reference-1.0.0.html#circle), I need the CircleMarker object).
In the middle of example implementation I faced a few problems derived from the fact that `CircleMarker` works with _pixels_, instead of _meters_.
That leads to the following cases:
- Once the marker is drawn in pixels, then it doesn't scale correctly on map zoom level changing
- What we're doing if we want a radius of 10 km. We can convert pixels to km, but ...

So in the above cases we have to resolve/implement something, that is already done in Circle object. The both objects (Circle and CircleMarker) differ only in the metrics (meters vs pixels).
Therefore, I changed CircleMarker with Circle and kept my custom `components/Draw.js` component architecture and implement drawing functionality from the scratch.
Next time I'll implement a React component that wraps Leaflet.Draw or use an already [implemented wrapper](https://github.com/alex3165/react-leaflet-draw).
