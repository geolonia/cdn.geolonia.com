"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CustomAttributionControl: () => attribution_default,
  GeoloniaControl: () => GeoloniaControl,
  GeoloniaMap: () => GeoloniaMap,
  GeoloniaMarker: () => GeoloniaMarker,
  SimpleStyle: () => SimpleStyle,
  SimpleStyleVector: () => simplestyle_vector_default,
  coreVersion: () => VERSION,
  getLang: () => getLang,
  getStyle: () => getStyle,
  isGeoloniaTilesHost: () => isGeoloniaTilesHost,
  keyring: () => keyring
});
module.exports = __toCommonJS(index_exports);

// node_modules/@mapbox/point-geometry/index.js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype = {
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone() {
    return new Point(this.x, this.y);
  },
  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add(p) {
    return this.clone()._add(p);
  },
  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub(p) {
    return this.clone()._sub(p);
  },
  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint(p) {
    return this.clone()._multByPoint(p);
  },
  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint(p) {
    return this.clone()._divByPoint(p);
  },
  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  mult(k) {
    return this.clone()._mult(k);
  },
  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  div(k) {
    return this.clone()._div(k);
  },
  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate(a) {
    return this.clone()._rotate(a);
  },
  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround(a, p) {
    return this.clone()._rotateAround(a, p);
  },
  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {[number, number, number, number]} m transformation matrix
   * @return {Point} output point
   */
  matMult(m) {
    return this.clone()._matMult(m);
  },
  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit() {
    return this.clone()._unit();
  },
  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp() {
    return this.clone()._perp();
  },
  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round() {
    return this.clone()._round();
  },
  /**
   * Return the magnitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {number} magnitude
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  },
  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {number} distance
   */
  dist(p) {
    return Math.sqrt(this.distSqr(p));
  },
  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {number} distance
   */
  distSqr(p) {
    const dx = p.x - this.x, dy = p.y - this.y;
    return dx * dx + dy * dy;
  },
  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {number} angle
   */
  angle() {
    return Math.atan2(this.y, this.x);
  },
  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleTo(b) {
    return Math.atan2(this.y - b.y, this.x - b.x);
  },
  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleWith(b) {
    return this.angleWithSep(b.x, b.y);
  },
  /**
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {number} x the x-coordinate
   * @param {number} y the y-coordinate
   * @return {number} the angle in radians
   */
  angleWithSep(x, y) {
    return Math.atan2(
      this.x * y - this.y * x,
      this.x * x + this.y * y
    );
  },
  /** @param {[number, number, number, number]} m */
  _matMult(m) {
    const x = m[0] * this.x + m[1] * this.y, y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  /** @param {Point} p */
  _add(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  },
  /** @param {Point} p */
  _sub(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  },
  /** @param {number} k */
  _mult(k) {
    this.x *= k;
    this.y *= k;
    return this;
  },
  /** @param {number} k */
  _div(k) {
    this.x /= k;
    this.y /= k;
    return this;
  },
  /** @param {Point} p */
  _multByPoint(p) {
    this.x *= p.x;
    this.y *= p.y;
    return this;
  },
  /** @param {Point} p */
  _divByPoint(p) {
    this.x /= p.x;
    this.y /= p.y;
    return this;
  },
  _unit() {
    this._div(this.mag());
    return this;
  },
  _perp() {
    const y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  },
  /** @param {number} angle */
  _rotate(angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle), x = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  /**
   * @param {number} angle
   * @param {Point} p
   */
  _rotateAround(angle, p) {
    const cos = Math.cos(angle), sin = Math.sin(angle), x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y), y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
    this.x = x;
    this.y = y;
    return this;
  },
  _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },
  constructor: Point
};
Point.convert = function(p) {
  if (p instanceof Point) {
    return (
      /** @type {Point} */
      p
    );
  }
  if (Array.isArray(p)) {
    return new Point(+p[0], +p[1]);
  }
  if (p.x !== void 0 && p.y !== void 0) {
    return new Point(+p.x, +p.y);
  }
  throw new Error("Expected [x, y] or {x, y} point format");
};

// src/lib/maplibre-util.ts
var _docStyle, _userSelect, _selectProp, _transformProp;
var _DOM = class _DOM {
  static testProp(props) {
    if (!__privateGet(_DOM, _docStyle)) return props[0];
    for (let i = 0; i < props.length; i++) {
      if (props[i] in __privateGet(_DOM, _docStyle)) {
        return props[i];
      }
    }
    return props[0];
  }
  static create(tagName, className, container) {
    const el = window.document.createElement(tagName);
    if (className !== void 0) el.className = className;
    if (container) container.appendChild(el);
    return el;
  }
  static createNS(namespaceURI, tagName) {
    return window.document.createElementNS(namespaceURI, tagName);
  }
  static disableDrag() {
    if (__privateGet(_DOM, _docStyle) && __privateGet(_DOM, _selectProp)) {
      __privateSet(_DOM, _userSelect, __privateGet(_DOM, _docStyle)[__privateGet(_DOM, _selectProp)]);
      __privateGet(_DOM, _docStyle)[__privateGet(_DOM, _selectProp)] = "none";
    }
  }
  static enableDrag() {
    if (__privateGet(_DOM, _docStyle) && __privateGet(_DOM, _selectProp)) {
      __privateGet(_DOM, _docStyle)[__privateGet(_DOM, _selectProp)] = __privateGet(_DOM, _userSelect) ?? "";
    }
  }
  static setTransform(el, value) {
    el.style[__privateGet(_DOM, _transformProp)] = value;
  }
  static addEventListener(target, type, callback, options) {
    if ("passive" in options) {
      target.addEventListener(type, callback, options);
    } else {
      target.addEventListener(type, callback, options.capture);
    }
  }
  static removeEventListener(target, type, callback, options) {
    if ("passive" in options) {
      target.removeEventListener(type, callback, options);
    } else {
      target.removeEventListener(type, callback, options.capture);
    }
  }
  static mousePos(el, e) {
    const rect = el.getBoundingClientRect();
    return new Point(
      e.clientX - rect.left - el.clientLeft,
      e.clientY - rect.top - el.clientTop
    );
  }
  static touchPos(el, touches) {
    const rect = el.getBoundingClientRect();
    const points = [];
    for (let i = 0; i < touches.length; i++) {
      points.push(
        new Point(
          touches[i].clientX - rect.left - el.clientLeft,
          touches[i].clientY - rect.top - el.clientTop
        )
      );
    }
    return points;
  }
  static mouseButton(e) {
    return e.button;
  }
  static remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
};
_docStyle = new WeakMap();
_userSelect = new WeakMap();
_selectProp = new WeakMap();
_transformProp = new WeakMap();
__privateAdd(_DOM, _docStyle, typeof window !== "undefined" && window.document && window.document.documentElement.style);
__privateAdd(_DOM, _userSelect);
__privateAdd(_DOM, _selectProp, _DOM.testProp([
  "userSelect",
  "MozUserSelect",
  "WebkitUserSelect",
  "msUserSelect"
]));
__privateAdd(_DOM, _transformProp, _DOM.testProp([
  "transform",
  "WebkitTransform"
]));
var DOM = _DOM;
function bindAll(fns, context) {
  for (const fn of fns) {
    if (typeof context[fn] === "function") {
      context[fn] = context[fn].bind(
        context
      );
    }
  }
}

// src/lib/controls/attribution.ts
var ATTRIBUTION_CSS = `
.maplibregl-ctrl {
  font: 12px/20px Helvetica Neue,Arial,Helvetica,sans-serif;
  clear: both;
  pointer-events: auto;
  transform: translate(0);
}
.maplibregl-ctrl-attrib-button:focus,.maplibregl-ctrl-group button:focus {
  box-shadow: 0 0 2px 2px #0096ff
}
.maplibregl-ctrl.maplibregl-ctrl-attrib {
  background-color: hsla(0,0%,100%,.5);
  margin: 0;
  padding: 0 5px
}
@media screen {
  .maplibregl-ctrl-attrib.maplibregl-compact {
    background-color: #fff;
    border-radius: 12px;
    box-sizing: content-box;
    min-height: 20px;
    padding: 2px 24px 2px 0;
    position: relative;
    margin: 10px 10px 10px auto;
    width: 0;
  }
  .maplibregl-ctrl-attrib.maplibregl-compact-show {
    padding: 2px 28px 2px 8px;
    visibility: visible;
    width: auto;
  }
  .maplibregl-ctrl-bottom-left>.maplibregl-ctrl-attrib.maplibregl-compact-show,
  .maplibregl-ctrl-top-left>.maplibregl-ctrl-attrib.maplibregl-compact-show {
    border-radius: 12px;
    padding: 2px 8px 2px 28px
  }
  .maplibregl-ctrl-attrib.maplibregl-compact .maplibregl-ctrl-attrib-inner {
    display: none
  }
  .maplibregl-ctrl-attrib-button {
    background-color: hsla(0,0%,100%,.5);
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E");
    border: 0;
    border-radius: 12px;
    box-sizing: border-box;
    cursor: pointer;
    display: none;
    height: 24px;
    outline: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px
  }
  .maplibregl-ctrl-attrib summary.maplibregl-ctrl-attrib-button {
    appearance: none;
    list-style: none
  }
  .maplibregl-ctrl-attrib summary.maplibregl-ctrl-attrib-button::-webkit-details-marker {
    display: none
  }
  .maplibregl-ctrl-bottom-left .maplibregl-ctrl-attrib-button,
  .maplibregl-ctrl-top-left .maplibregl-ctrl-attrib-button {
    left: 0
  }
  .maplibregl-ctrl-attrib.maplibregl-compact .maplibregl-ctrl-attrib-button,
  .maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-inner {
    display: block
  }
  .maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-button {
    background-color: rgb(0 0 0/5%)
  }
  .maplibregl-ctrl-bottom-right>.maplibregl-ctrl-attrib.maplibregl-compact:after {
    bottom: 0; right: 0
  }
  .maplibregl-ctrl-top-right>.maplibregl-ctrl-attrib.maplibregl-compact:after {
    right: 0; top: 0
  }
  .maplibregl-ctrl-top-left>.maplibregl-ctrl-attrib.maplibregl-compact:after {
    left: 0; top: 0
  }
  .maplibregl-ctrl-bottom-left>.maplibregl-ctrl-attrib.maplibregl-compact:after {
    bottom: 0; left: 0
  }
}
@media screen and (-ms-high-contrast:active) {
  .maplibregl-ctrl-attrib.maplibregl-compact:after {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' fill='%23fff'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E")
  }
}
@media screen and (-ms-high-contrast:black-on-white) {
  .maplibregl-ctrl-attrib.maplibregl-compact:after {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E")
  }
}
@media print {
  .maplibregl-ctrl-attrib-button {
    display: none !important;
  }
}
.maplibregl-ctrl-attrib a {
  color: rgba(0,0,0,.75);
  text-decoration: none;
  white-space: nowrap;
}
.maplibregl-ctrl-attrib a:hover {
  color: inherit;
  text-decoration: underline
}
.maplibregl-attrib-empty {
  display: none
}
`;
var CustomAttributionControl = class {
  constructor(options = {}) {
    this._editLink = null;
    this.options = options;
    bindAll(
      [
        "_toggleAttribution",
        "_updateData",
        "_updateCompact",
        "_updateCompactMinimize"
      ],
      this
    );
  }
  getDefaultPosition() {
    return "bottom-right";
  }
  onAdd(map) {
    this._map = map;
    this._compact = this.options.compact;
    this._container = DOM.create("div");
    const shadow = this._container.attachShadow({ mode: "open" });
    this._shadowContainer = DOM.create(
      "details",
      "maplibregl-ctrl maplibregl-ctrl-attrib"
    );
    this._compactButton = DOM.create(
      "summary",
      "maplibregl-ctrl-attrib-button",
      this._shadowContainer
    );
    this._compactButton.addEventListener("click", this._toggleAttribution);
    this._setElementTitle(this._compactButton, "ToggleAttribution");
    this._innerContainer = DOM.create(
      "div",
      "maplibregl-ctrl-attrib-inner",
      this._shadowContainer
    );
    const style = document.createElement("style");
    style.textContent = ATTRIBUTION_CSS;
    this._updateAttributions();
    this._updateCompact();
    this._map.on("styledata", this._updateData);
    this._map.on("sourcedata", this._updateData);
    this._map.on("terrain", this._updateData);
    this._map.on("resize", this._updateCompact);
    this._map.on("drag", this._updateCompactMinimize);
    shadow.appendChild(style);
    shadow.appendChild(this._shadowContainer);
    this.printQuery = window.matchMedia("print");
    this.onMediaPrintChange = (e) => {
      if (e.matches) {
        this._shadowContainer.setAttribute("open", "");
        this._shadowContainer.classList.remove("maplibregl-compact-show");
      }
    };
    this.printQuery.addEventListener("change", this.onMediaPrintChange);
    return this._container;
  }
  onRemove() {
    if (this._container) {
      DOM.remove(this._container);
    }
    if (this._map) {
      this._map.off("styledata", this._updateData);
      this._map.off("sourcedata", this._updateData);
      this._map.off("terrain", this._updateData);
      this._map.off("resize", this._updateCompact);
      this._map.off("drag", this._updateCompactMinimize);
    }
    if (this.printQuery && this.onMediaPrintChange) {
      this.printQuery.removeEventListener("change", this.onMediaPrintChange);
    }
    this._map = void 0;
    this._compact = void 0;
    this._attribHTML = void 0;
  }
  _setElementTitle(element, title) {
    if (!this._map) return;
    const str = this._map._getUIString(`AttributionControl.${title}`);
    element.title = str;
    element.setAttribute("aria-label", str);
  }
  _toggleAttribution() {
    if (!this._shadowContainer) return;
    if (this._shadowContainer.classList.contains("maplibregl-compact")) {
      if (this._shadowContainer.classList.contains("maplibregl-compact-show")) {
        this._shadowContainer.setAttribute("open", "");
        this._shadowContainer.classList.remove("maplibregl-compact-show");
      } else {
        this._shadowContainer.classList.add("maplibregl-compact-show");
        this._shadowContainer.removeAttribute("open");
      }
    }
  }
  _updateData(e) {
    if (e && (e.sourceDataType === "metadata" || e.sourceDataType === "visibility" || e.dataType === "style" || e.type === "terrain")) {
      this._updateAttributions();
    }
  }
  _updateAttributions() {
    if (!this._map || !this._map.style) return;
    let attributions = [];
    if (this.options.customAttribution) {
      if (Array.isArray(this.options.customAttribution)) {
        attributions = attributions.concat(
          this.options.customAttribution.filter(
            (attr) => typeof attr === "string"
          )
        );
      } else if (typeof this.options.customAttribution === "string") {
        attributions.push(this.options.customAttribution);
      }
    }
    if (this._map.style.stylesheet) {
      const stylesheet = this._map.style.stylesheet;
      this.styleOwner = stylesheet.owner;
      this.styleId = stylesheet.id;
    }
    const sourceCaches = this._map.style.sourceCaches;
    for (const id in sourceCaches) {
      const sourceCache = sourceCaches[id];
      if (sourceCache.used || sourceCache.usedForTerrain) {
        const source = sourceCache.getSource();
        if (source.attribution && attributions.indexOf(source.attribution) < 0) {
          attributions.push(source.attribution);
        }
      }
    }
    attributions = attributions.filter((e) => String(e).trim());
    attributions.sort((a, b) => a.length - b.length);
    attributions = attributions.filter((attrib, i) => {
      for (let j = i + 1; j < attributions.length; j++) {
        if (attributions[j].indexOf(attrib) >= 0) {
          return false;
        }
      }
      return true;
    });
    const attribHTML = attributions.join(" | ");
    if (attribHTML === this._attribHTML) return;
    this._attribHTML = attribHTML;
    if (attributions.length) {
      this._innerContainer.innerHTML = attribHTML;
      this._shadowContainer.classList.remove("maplibregl-attrib-empty");
    } else {
      this._shadowContainer.classList.add("maplibregl-attrib-empty");
    }
    this._updateCompact();
    this._editLink = null;
  }
  _updateCompact() {
    if (!this._map || !this._shadowContainer) return;
    if (this._map.getCanvasContainer().offsetWidth <= 640 || this._compact) {
      if (this._compact === false) {
        this._shadowContainer.setAttribute("open", "");
      } else if (!this._shadowContainer.classList.contains("maplibregl-compact") && !this._shadowContainer.classList.contains("maplibregl-attrib-empty")) {
        this._shadowContainer.setAttribute("open", "");
        this._shadowContainer.classList.add(
          "maplibregl-compact",
          "maplibregl-compact-show"
        );
      }
    } else {
      this._shadowContainer.setAttribute("open", "");
      if (this._shadowContainer.classList.contains("maplibregl-compact")) {
        this._shadowContainer.classList.remove(
          "maplibregl-compact",
          "maplibregl-compact-show"
        );
      }
    }
  }
  _updateCompactMinimize() {
    if (!this._shadowContainer) return;
    if (this._shadowContainer.classList.contains("maplibregl-compact")) {
      if (this._shadowContainer.classList.contains("maplibregl-compact-show")) {
        this._shadowContainer.classList.remove("maplibregl-compact-show");
      }
    }
  }
};
var attribution_default = CustomAttributionControl;

// src/lib/controls/geolonia-logo.ts
var GeoloniaControl = class {
  onAdd() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl";
    const img = document.createElement("img");
    img.src = "https://cdn.geolonia.com/logo/geolonia-symbol_1.png";
    img.style.width = "16px";
    img.style.height = "16px";
    img.style.display = "block";
    img.style.cursor = "pointer";
    img.style.padding = "0";
    img.style.margin = "0";
    img.style.border = "none";
    img.alt = "Geolonia";
    const link = document.createElement("a");
    link.href = "https://geolonia.com/";
    link.appendChild(img);
    link.title = "Powered by Geolonia";
    this.container.appendChild(link);
    return this.container;
  }
  onRemove() {
    this.container.parentNode?.removeChild(this.container);
  }
  getDefaultPosition() {
    return "bottom-left";
  }
};

// src/lib/geolonia-map.ts
var import_maplibre_gl4 = __toESM(require("maplibre-gl"), 1);
var import_pmtiles = require("pmtiles");

// src/lib/geolonia-marker.ts
var import_maplibre_gl = __toESM(require("maplibre-gl"), 1);
var import_tinycolor2 = __toESM(require("tinycolor2"), 1);
var MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 67">
  <path class="left" d="M26 0C11.664 0 0 11.663 0 26c0 22.14 26 41 26 41V26h0C26 11.663 26 0 26 0z" fill="#E4402F"/>
  <path class="right" d="M26 0c14.336 0 26 11.663 26 26 0 22.14-26 41-26 41V26h0C26 11.663 26 0 26 0z" fill="#C1272D"/>
  <circle cx="26" cy="26" r="9" fill="#FFF"/>
</svg>`;
var DEFAULT_COLOR = "#E4402F";
var GeoloniaMarker = class extends import_maplibre_gl.default.Marker {
  constructor(options = {}) {
    if (!options.element) {
      const markerElement = document.createElement("div");
      markerElement.className = "geolonia-default-marker";
      markerElement.innerHTML = MARKER_SVG;
      markerElement.style.margin = "0";
      markerElement.style.padding = "0";
      markerElement.style.width = "26px";
      markerElement.style.height = "34px";
      const svg = markerElement.querySelector("svg");
      if (svg) {
        svg.style.width = "100%";
        svg.style.height = "100%";
      }
      options.element = markerElement;
      const color = options.color || DEFAULT_COLOR;
      const left = markerElement.querySelector(".left");
      const right = markerElement.querySelector(".right");
      if (left) left.style.fill = color;
      if (right) right.style.fill = (0, import_tinycolor2.default)(color).darken().toString();
      options.offset = [0, -15];
    }
    super(options);
  }
};

// src/lib/simplestyle.ts
var import_geojson_extent = __toESM(require("@mapbox/geojson-extent"), 1);
var import_center = __toESM(require("@turf/center"), 1);
var import_maplibre_gl2 = __toESM(require("maplibre-gl"), 1);

// src/lib/keyring.ts
var _apiKey, _stage, _isGeoloniaStyle;
var Keyring = class {
  constructor() {
    __privateAdd(this, _apiKey, "");
    __privateAdd(this, _stage, "dev");
    __privateAdd(this, _isGeoloniaStyle, true);
  }
  get apiKey() {
    return __privateGet(this, _apiKey);
  }
  get stage() {
    return __privateGet(this, _stage);
  }
  get isGeoloniaStyle() {
    return __privateGet(this, _isGeoloniaStyle);
  }
  set isGeoloniaStyle(value) {
    __privateSet(this, _isGeoloniaStyle, value);
  }
  setApiKey(key) {
    __privateSet(this, _apiKey, key);
  }
  setStage(stage) {
    __privateSet(this, _stage, stage);
  }
  reset() {
    __privateSet(this, _apiKey, "");
    __privateSet(this, _stage, "dev");
    __privateSet(this, _isGeoloniaStyle, true);
  }
  /**
   * Check if the given style is a Geolonia style (requires API key)
   */
  isGeoloniaStyleCheck(style) {
    if (!style || style === "") {
      return true;
    }
    if (style.startsWith("https://cdn.geolonia.com/style/") || style.startsWith("https://api.geolonia.com/")) {
      return true;
    }
    if (style.match(/^https?:\/\//)) {
      return false;
    }
    if (style.endsWith(".json")) {
      return false;
    }
    return true;
  }
};
_apiKey = new WeakMap();
_stage = new WeakMap();
_isGeoloniaStyle = new WeakMap();
var keyring = new Keyring();

// src/lib/util.ts
function isURL(str) {
  if (str.match(/^https?:\/\//)) {
    return str;
  }
  if (str.match(/^\//) || str.match(/^\.\.?/)) {
    try {
      return new URL(str, globalThis.location?.href).href;
    } catch {
      return false;
    }
  }
  return false;
}
function isGeoloniaTilesHost(url) {
  try {
    const urlObj = typeof url === "string" ? new URL(url) : url;
    return urlObj.hostname === "tileserver.geolonia.com" || urlObj.hostname.endsWith(".tiles.geolonia.com");
  } catch {
    return false;
  }
}
function getStyle(style, options) {
  const lang = options.lang || "en";
  const apiKey = options.apiKey || keyring.apiKey;
  if (keyring.isGeoloniaStyleCheck(style) && !apiKey) {
    throw new Error("[Geolonia] API key is required to use Geolonia styles.");
  }
  if (!style || style === "") {
    return `https://cdn.geolonia.com/style/geolonia/basic-v2/${lang === "ja" ? "ja" : "en"}.json`;
  }
  const styleUrl = isURL(style);
  if (styleUrl) {
    return styleUrl;
  }
  if (style.endsWith(".json")) {
    try {
      return new URL(style, globalThis.location?.href).href;
    } catch {
      return style;
    }
  }
  return `https://cdn.geolonia.com/style/${style}/${lang === "ja" ? "ja" : "en"}.json`;
}
function getLang() {
  if (typeof globalThis.navigator === "undefined") {
    return "en";
  }
  const lang = globalThis.navigator.languages?.[0]?.toLowerCase() || globalThis.navigator.language?.toLowerCase();
  return lang === "ja" || lang === "ja-jp" ? "ja" : "en";
}
var sessionId = "";
function getSessionId(digit) {
  if (sessionId) {
    return sessionId;
  }
  const array = new Uint8Array(digit / 2);
  crypto.getRandomValues(array);
  sessionId = Array.from(
    array,
    (dec) => dec.toString(16).padStart(2, "0")
  ).join("");
  return sessionId;
}
function parseControlOption(value) {
  if (typeof value === "boolean") {
    return { enabled: value, position: void 0 };
  }
  if (typeof value === "string") {
    const positions = ["top-right", "bottom-right", "bottom-left", "top-left"];
    if (positions.includes(value.toLowerCase())) {
      return { enabled: true, position: value.toLowerCase() };
    }
  }
  return { enabled: false, position: void 0 };
}
function parseSimpleVector(attributeValue) {
  if (/^(https?|geolonia):\/\//.test(attributeValue)) {
    return attributeValue;
  }
  return `geolonia://tiles/custom/${attributeValue}`;
}
function handleRestrictedMode(map) {
  if (!map._geolonia_restricted_mode_handled) {
    map._geolonia_restricted_mode_handled = true;
    const container = map.getContainer();
    map.remove();
    container.innerHTML = "";
    container.classList.add("geolonia__restricted-mode-image-container");
  }
}
function handleErrorMode(container) {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("geolonia__error-container");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = "Geolonia Maps";
  div.appendChild(h2);
  div.classList.add("geolonia__error-message");
  div.innerHTML += '<div class="geolonia__error-message-description">\u5730\u56F3\u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u7BA1\u7406\u8005\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u4E0B\u3055\u3044\u3002</div>';
  errorContainer.appendChild(div);
  container.appendChild(errorContainer);
}
async function sanitizeDescription(description) {
  const { default: sanitizeHtml } = await import("sanitize-html");
  return sanitizeHtml(description, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class"]
    }
  });
}
function loadImageCompatibility(promise, callback) {
  promise.then((response) => {
    callback(null, response.data, {
      cacheControl: response.cacheControl,
      expires: response.expires
    });
  }).catch((error) => {
    callback(error);
  });
}

// src/lib/simplestyle.ts
var textColor = "#000000";
var textHaloColor = "#FFFFFF";
var backgroundColor = "rgba(255, 0, 0, 0.4)";
var strokeColor = "#FFFFFF";
var template = {
  type: "FeatureCollection",
  features: []
};
var SimpleStyle = class {
  constructor(geojson, options) {
    this.callFitBounds = false;
    this._eventHandlers = [];
    this.setGeoJSON(geojson);
    this.options = {
      id: "geolonia-simple-style",
      cluster: true,
      heatmap: false,
      // TODO: It should support heatmap.
      clusterColor: "#ff0000",
      ...options
    };
  }
  updateData(geojson) {
    this.setGeoJSON(geojson);
    const features = this.geojson.features;
    const polygonAndLines = features.filter(
      (feature) => feature.geometry.type.toLowerCase() !== "point"
    );
    const points = features.filter(
      (feature) => feature.geometry.type.toLowerCase() === "point"
    );
    this.map.getSource(this.options.id).setData({
      type: "FeatureCollection",
      features: polygonAndLines
    });
    this.map.getSource(`${this.options.id}-points`).setData({
      type: "FeatureCollection",
      features: points
    });
    return this;
  }
  addTo(map) {
    this.map = map;
    const features = this.geojson.features;
    const polygonAndLines = features.filter(
      (feature) => feature.geometry.type.toLowerCase() !== "point"
    );
    const points = features.filter(
      (feature) => feature.geometry.type.toLowerCase() === "point"
    );
    this.map.addSource(this.options.id, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: polygonAndLines
      }
    });
    this.setPolygonGeometries();
    this.setLineGeometries();
    this.map.addSource(`${this.options.id}-points`, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: points
      },
      cluster: this.options.cluster,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });
    this.map.addLayer({
      id: `${this.options.id}-polygon-symbol`,
      type: "symbol",
      source: this.options.id,
      filter: ["==", "$type", "Polygon"],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor
        ],
        "text-halo-width": 1
      },
      layout: {
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-max-width": 12,
        "text-allow-overlap": false
      }
    });
    this.map.addLayer({
      id: `${this.options.id}-linestring-symbol`,
      type: "symbol",
      source: this.options.id,
      filter: ["==", "$type", "LineString"],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor
        ],
        "text-halo-width": 1
      },
      layout: {
        "symbol-placement": "line",
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-max-width": 12,
        "text-allow-overlap": false
      }
    });
    this.setPointGeometries();
    this.setCluster();
    return this;
  }
  fitBounds(options = {}) {
    this.callFitBounds = true;
    const _options = {
      duration: 3e3,
      padding: 30,
      ...options
    };
    const bounds = (0, import_geojson_extent.default)(this.geojson);
    if (bounds) {
      window.requestAnimationFrame(() => {
        this.map.fitBounds(bounds, _options);
      });
    }
    return this;
  }
  /**
   * Set polygon geometries.
   */
  setPolygonGeometries() {
    this.map.addLayer({
      id: `${this.options.id}-polygon`,
      type: "fill",
      source: this.options.id,
      filter: ["==", "$type", "Polygon"],
      paint: {
        "fill-color": ["string", ["get", "fill"], backgroundColor],
        "fill-opacity": ["number", ["get", "fill-opacity"], 1],
        "fill-outline-color": ["string", ["get", "stroke"], strokeColor]
      }
    });
    this.setPopup(this.map, `${this.options.id}-polygon`);
  }
  /**
   * Set line geometries.
   */
  setLineGeometries() {
    this.map.addLayer({
      id: `${this.options.id}-linestring`,
      type: "line",
      source: this.options.id,
      filter: ["==", "$type", "LineString"],
      paint: {
        "line-width": ["number", ["get", "stroke-width"], 2],
        "line-color": ["string", ["get", "stroke"], backgroundColor],
        "line-opacity": ["number", ["get", "stroke-opacity"], 1]
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    });
    this.setPopup(this.map, `${this.options.id}-linestring`);
  }
  /**
   * Setup point geometries.
   */
  setPointGeometries() {
    this.map.addLayer({
      id: `${this.options.id}-circle-points`,
      type: "circle",
      source: `${this.options.id}-points`,
      filter: ["all", ["!has", "point_count"], ["!has", "marker-symbol"]],
      paint: {
        "circle-radius": [
          "case",
          ["==", "small", ["get", "marker-size"]],
          7,
          ["==", "large", ["get", "marker-size"]],
          13,
          9
        ],
        "circle-color": ["string", ["get", "marker-color"], backgroundColor],
        "circle-opacity": ["number", ["get", "fill-opacity"], 1],
        "circle-stroke-width": ["number", ["get", "stroke-width"], 1],
        "circle-stroke-color": ["string", ["get", "stroke"], strokeColor],
        "circle-stroke-opacity": ["number", ["get", "stroke-opacity"], 1]
      }
    });
    this.map.addLayer({
      id: `${this.options.id}-symbol-points`,
      type: "symbol",
      source: `${this.options.id}-points`,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor
        ],
        "text-halo-width": 1
      },
      layout: {
        "icon-image": ["get", "marker-symbol"],
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-max-width": 12,
        "text-allow-overlap": true,
        "icon-allow-overlap": true,
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": [
          "case",
          ["==", "small", ["get", "marker-size"]],
          1,
          ["==", "large", ["get", "marker-size"]],
          1.6,
          1.2
        ]
      }
    });
    this.setPopup(this.map, `${this.options.id}-circle-points`);
    this.setPopup(this.map, `${this.options.id}-symbol-points`);
  }
  async setPopup(map, source) {
    const clickHandler = async (e) => {
      const center = (0, import_center.default)(e.features[0]).geometry.coordinates;
      const description = e.features[0].properties.description;
      if (description) {
        const sanitizedDescription = await sanitizeDescription(description);
        new import_maplibre_gl2.default.Popup().setLngLat(center).setHTML(sanitizedDescription).addTo(map);
      }
    };
    const mouseEnterHandler = (e) => {
      if (e.features[0].properties.description) {
        map.getCanvas().style.cursor = "pointer";
      }
    };
    const mouseLeaveHandler = () => {
      map.getCanvas().style.cursor = "";
    };
    map.on("click", source, clickHandler);
    map.on("mouseenter", source, mouseEnterHandler);
    map.on("mouseleave", source, mouseLeaveHandler);
    this._eventHandlers.push(
      { event: "click", layer: source, handler: clickHandler },
      { event: "mouseenter", layer: source, handler: mouseEnterHandler },
      { event: "mouseleave", layer: source, handler: mouseLeaveHandler }
    );
  }
  /**
   * Setup cluster markers
   */
  setCluster() {
    this.map.addLayer({
      id: `${this.options.id}-clusters`,
      type: "circle",
      source: `${this.options.id}-points`,
      filter: ["has", "point_count"],
      paint: {
        "circle-radius": 20,
        "circle-color": this.options.clusterColor,
        "circle-opacity": 1
      }
    });
    this.map.addLayer({
      id: `${this.options.id}-cluster-count`,
      type: "symbol",
      source: `${this.options.id}-points`,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-size": 14,
        "text-font": ["Noto Sans Regular"]
      }
    });
    const clusterLayer = `${this.options.id}-clusters`;
    const clusterClickHandler = async (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [clusterLayer]
      });
      const clusterId = features[0].properties.cluster_id;
      const zoom = await this.map.getSource(`${this.options.id}-points`).getClusterExpansionZoom(clusterId);
      this.map.easeTo({
        center: features[0].geometry.coordinates,
        zoom
      });
    };
    const clusterEnterHandler = () => {
      this.map.getCanvas().style.cursor = "pointer";
    };
    const clusterLeaveHandler = () => {
      this.map.getCanvas().style.cursor = "";
    };
    this.map.on("click", clusterLayer, clusterClickHandler);
    this.map.on("mouseenter", clusterLayer, clusterEnterHandler);
    this.map.on("mouseleave", clusterLayer, clusterLeaveHandler);
    this._eventHandlers.push(
      { event: "click", layer: clusterLayer, handler: clusterClickHandler },
      {
        event: "mouseenter",
        layer: clusterLayer,
        handler: clusterEnterHandler
      },
      {
        event: "mouseleave",
        layer: clusterLayer,
        handler: clusterLeaveHandler
      }
    );
  }
  remove() {
    if (!this.map) return this;
    const id = this.options.id;
    for (const { event, layer, handler } of this._eventHandlers) {
      this.map.off(event, layer, handler);
    }
    this._eventHandlers = [];
    const layerIds = [
      `${id}-polygon-symbol`,
      `${id}-linestring-symbol`,
      `${id}-circle-points`,
      `${id}-symbol-points`,
      `${id}-polygon`,
      `${id}-linestring`,
      `${id}-clusters`,
      `${id}-cluster-count`
    ];
    for (const layerId of layerIds) {
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }
    }
    for (const sourceId of [id, `${id}-points`]) {
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId);
      }
    }
    this.map.getCanvas().style.cursor = "";
    return this;
  }
  setGeoJSON(geojson) {
    if (typeof geojson === "string" && isURL(geojson)) {
      this.geojson = template;
      const fetchGeoJSON = async () => {
        try {
          const response = await window.fetch(geojson);
          const data = response.ok ? await response.json() : {};
          this.geojson = data;
          this.updateData(data);
          if (this.callFitBounds) {
            this.fitBounds();
            this.callFitBounds = false;
          }
        } catch (error) {
          console.error("[Geolonia] Failed to load GeoJSON:", error);
        }
      };
      this._loadingPromise = fetchGeoJSON();
    } else {
      this.geojson = geojson;
    }
  }
};

// src/lib/simplestyle-vector.ts
var import_center2 = __toESM(require("@turf/center"), 1);
var import_maplibre_gl3 = __toESM(require("maplibre-gl"), 1);
var textColor2 = "#000000";
var textHaloColor2 = "#FFFFFF";
var backgroundColor2 = "rgba(255, 0, 0, 0.4)";
var strokeColor2 = "#FFFFFF";
var SimpleStyleVector = class {
  constructor(url) {
    this.url = url;
    this.sourceName = "vt-geolonia-simple-style";
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  addTo(map) {
    const container = map.getContainer();
    if (!container.dataset || !container.dataset.lng && !container.dataset.lat) {
      let initialZoomDone = false;
      map.on("sourcedata", (event) => {
        if (event.sourceId !== this.sourceName) {
          return;
        }
        const source = map.getSource(event.sourceId);
        const isLoaded = source && source.loaded();
        if (isLoaded !== true) {
          return;
        }
        if (initialZoomDone) {
          return;
        }
        initialZoomDone = true;
        map.fitBounds(source.bounds, {
          duration: 0,
          padding: 30
        });
      });
    }
    map.addSource(this.sourceName, {
      type: "vector",
      url: this.url
    });
    this.setPolygonGeometries(map);
    this.setLineGeometries(map);
    map.addLayer({
      id: "vt-geolonia-simple-style-polygon-symbol",
      type: "symbol",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["==", "$type", "Polygon"],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor2],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor2
        ],
        "text-halo-width": 1
      },
      layout: {
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-max-width": 12,
        "text-allow-overlap": false
      }
    });
    map.addLayer({
      id: "vt-geolonia-simple-style-linestring-symbol",
      type: "symbol",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["==", "$type", "LineString"],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor2],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor2
        ],
        "text-halo-width": 1
      },
      layout: {
        "symbol-placement": "line",
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-max-width": 12,
        "text-allow-overlap": false
      }
    });
    this.setPointGeometries(map);
  }
  /**
   * Set polygon geometries.
   *
   * @param map
   */
  setPolygonGeometries(map) {
    map.addLayer({
      id: "vt-geolonia-simple-style-polygon",
      type: "fill",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["==", "$type", "Polygon"],
      paint: {
        "fill-color": ["string", ["get", "fill"], backgroundColor2],
        "fill-opacity": ["number", ["get", "fill-opacity"], 1],
        "fill-outline-color": ["string", ["get", "stroke"], strokeColor2]
      }
    });
    this.setPopup(map, "vt-geolonia-simple-style-polygon");
  }
  /**
   * Set line geometries.
   *
   * @param map
   */
  setLineGeometries(map) {
    map.addLayer({
      id: "vt-geolonia-simple-style-linestring",
      type: "line",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["==", "$type", "LineString"],
      paint: {
        "line-width": ["number", ["get", "stroke-width"], 2],
        "line-color": ["string", ["get", "stroke"], backgroundColor2],
        "line-opacity": ["number", ["get", "stroke-opacity"], 1]
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    });
    this.setPopup(map, "vt-geolonia-simple-style-linestring");
  }
  /**
   * Setup point geometries.
   *
   * @param map
   */
  setPointGeometries(map) {
    map.addLayer({
      id: "vt-circle-simple-style-points",
      type: "circle",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["all", ["==", "$type", "Point"], ["!has", "marker-symbol"]],
      paint: {
        "circle-radius": [
          "case",
          ["==", "small", ["get", "marker-size"]],
          7,
          ["==", "large", ["get", "marker-size"]],
          13,
          9
        ],
        "circle-color": ["string", ["get", "marker-color"], backgroundColor2],
        "circle-opacity": ["number", ["get", "fill-opacity"], 1],
        "circle-stroke-width": ["number", ["get", "stroke-width"], 1],
        "circle-stroke-color": ["string", ["get", "stroke"], strokeColor2],
        "circle-stroke-opacity": ["number", ["get", "stroke-opacity"], 1]
      }
    });
    map.addLayer({
      id: "vt-geolonia-simple-style-points",
      type: "symbol",
      source: this.sourceName,
      "source-layer": "g-simplestyle-v1",
      filter: ["==", "$type", "Point"],
      paint: {
        "text-color": ["string", ["get", "text-color"], textColor2],
        "text-halo-color": [
          "string",
          ["get", "text-halo-color"],
          textHaloColor2
        ],
        "text-halo-width": 1
      },
      layout: {
        "icon-image": ["get", "marker-symbol"],
        "text-field": ["get", "title"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-anchor": "top",
        "text-max-width": 12,
        "text-offset": [
          "case",
          ["==", "small", ["get", "marker-size"]],
          ["literal", [0, 1]],
          ["==", "large", ["get", "marker-size"]],
          ["literal", [0, 1.6]],
          ["literal", [0, 1.2]]
        ],
        "text-allow-overlap": false
      }
    });
    this.setPopup(map, "vt-circle-simple-style-points");
    this.setPopup(map, "vt-geolonia-simple-style-points");
  }
  async setPopup(map, source) {
    map.on("click", source, async (e) => {
      const center = (0, import_center2.default)(e.features[0]).geometry.coordinates;
      const description = e.features[0].properties.description;
      if (description) {
        const sanitizedDescription = await sanitizeDescription(description);
        new import_maplibre_gl3.default.Popup().setLngLat(center).setHTML(sanitizedDescription).addTo(map);
      }
    });
    map.on("mouseenter", source, (e) => {
      if (e.features[0].properties.description) {
        map.getCanvas().style.cursor = "pointer";
      }
    });
    map.on("mouseleave", source, () => {
      map.getCanvas().style.cursor = "";
    });
  }
};
var simplestyle_vector_default = SimpleStyleVector;

// src/lib/geolonia-map.ts
var pmtilesRegistered = false;
function ensurePMTiles() {
  if (pmtilesRegistered) return;
  pmtilesRegistered = true;
  const protocol = new import_pmtiles.Protocol();
  import_maplibre_gl4.default.addProtocol("pmtiles", protocol.tile);
}
var GeoloniaMap = class extends import_maplibre_gl4.default.Map {
  constructor(options) {
    ensurePMTiles();
    if (options.apiKey) {
      keyring.setApiKey(options.apiKey);
    }
    if (options.stage) {
      keyring.setStage(options.stage);
    }
    const lang = options.lang === "auto" || !options.lang ? getLang() : options.lang;
    const styleName = options.style || "geolonia/basic-v2";
    keyring.isGeoloniaStyle = keyring.isGeoloniaStyleCheck(styleName);
    const resolvedStyle = getStyle(styleName, {
      lang,
      apiKey: options.apiKey || keyring.apiKey
    });
    const container = typeof options.container === "string" ? document.querySelector(options.container) || document.getElementById(options.container) : options.container;
    if (!container) {
      throw new Error(
        `[Geolonia] No HTML elements found. Please ensure the map container element exists.`
      );
    }
    if (container.geoloniaMap) {
      return container.geoloniaMap;
    }
    const apiKey = options.apiKey || keyring.apiKey;
    const stage = options.stage || keyring.stage;
    const apiUrl = `https://api.geolonia.com/${stage}`;
    const sessionId2 = getSessionId(40);
    const sourcesUrl = new URL(`${apiUrl}/sources`);
    sourcesUrl.searchParams.set("key", apiKey);
    sourcesUrl.searchParams.set("sessionId", sessionId2);
    const userTransformRequest = options.transformRequest;
    const transformRequest = (url, resourceType) => {
      if (resourceType === "Source" && url.startsWith("https://api.geolonia.com")) {
        return { url: sourcesUrl.toString() };
      }
      let transformedUrl = url;
      if (url.startsWith("geolonia://")) {
        const tilesMatch = url.match(
          /^geolonia:\/\/tiles\/(?<username>.+)\/(?<customtileId>.+)/
        );
        if (tilesMatch?.groups) {
          transformedUrl = `https://tileserver.geolonia.com/customtiles/${tilesMatch.groups.customtileId}/tiles.json`;
        }
      }
      const transformedUrlObj = new URL(transformedUrl);
      const geoloniaTilesHost = isGeoloniaTilesHost(transformedUrlObj);
      if (resourceType === "Source" && geoloniaTilesHost) {
        if (stage === "dev" && transformedUrlObj.hostname === "tileserver.geolonia.com") {
          transformedUrlObj.hostname = "tileserver-dev.geolonia.com";
        }
        transformedUrlObj.searchParams.set("sessionId", sessionId2);
        transformedUrlObj.searchParams.set("key", apiKey);
        return { url: transformedUrlObj.toString() };
      }
      if ((resourceType === "SpriteJSON" || resourceType === "SpriteImage") && transformedUrl.match(
        /^https:\/\/api\.geolonia\.com\/(dev|v1)\/sprites\//
      )) {
        const pathParts = transformedUrlObj.pathname.split("/");
        pathParts[1] = stage;
        transformedUrlObj.pathname = pathParts.join("/");
        transformedUrlObj.searchParams.set("key", apiKey);
        return { url: transformedUrlObj.toString() };
      }
      if (typeof userTransformRequest === "function") {
        return userTransformRequest(transformedUrl, resourceType);
      }
      return void 0;
    };
    let loading;
    const showLoader = options.loader !== false;
    if (showLoader) {
      loading = document.createElement("div");
      loading.className = "loading-geolonia-map";
      loading.innerHTML = `<div class="lds-grid"><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div></div>`;
      container.appendChild(loading);
    }
    const mapOptions = {
      ...options,
      container,
      style: resolvedStyle,
      hash: options.hash ?? false,
      localIdeographFontFamily: options.localIdeographFontFamily ?? "sans-serif",
      attributionControl: false,
      transformRequest
    };
    for (const key of [
      "apiKey",
      "stage",
      "lang",
      "marker",
      "markerColor",
      "openPopup",
      "customMarker",
      "customMarkerOffset",
      "loader",
      "gestureHandling",
      "navigationControl",
      "geolocateControl",
      "fullscreenControl",
      "scaleControl",
      "geoloniaControl",
      "geojson",
      "cluster",
      "clusterColor",
      "simpleVector",
      "3d"
    ]) {
      delete mapOptions[key];
    }
    try {
      super(mapOptions);
    } catch (error) {
      handleErrorMode(container);
      throw error;
    }
    this.geoloniaSourcesUrl = sourcesUrl;
    this.__styleExtensionLoadRequired = true;
    const geoloniaCtrl = parseControlOption(options.geoloniaControl ?? true);
    this.addControl(
      new GeoloniaControl(),
      geoloniaCtrl.position
    );
    this.addControl(new attribution_default(), "bottom-right");
    const fullscreen = parseControlOption(options.fullscreenControl ?? false);
    if (fullscreen.enabled) {
      this.addControl(
        new import_maplibre_gl4.FullscreenControl(),
        fullscreen.position
      );
    }
    const nav = parseControlOption(options.navigationControl ?? true);
    if (nav.enabled) {
      this.addControl(new import_maplibre_gl4.NavigationControl(), nav.position);
    }
    const geolocate = parseControlOption(options.geolocateControl ?? false);
    if (geolocate.enabled) {
      this.addControl(
        new import_maplibre_gl4.GeolocateControl({}),
        geolocate.position
      );
    }
    const scale = parseControlOption(options.scaleControl ?? false);
    if (scale.enabled) {
      this.addControl(new import_maplibre_gl4.ScaleControl({}), scale.position);
    }
    this.on("load", (event) => {
      const map = event.target;
      if (loading) {
        try {
          container.removeChild(loading);
        } catch {
        }
      }
      if (options.gestureHandling !== false) {
        import("@geolonia/mbgl-gesture-handling").then(({ default: GestureHandling }) => {
          const body = document.body;
          const html = document.documentElement;
          const isScrollable = body.scrollHeight > body.clientHeight || html.scrollHeight > html.clientHeight;
          if (isScrollable) {
            new GestureHandling({ lang }).addTo(map);
          }
        }).catch(() => {
        });
      }
      if (options.marker && options.center) {
        const c = options.center;
        const center = Array.isArray(c) ? [c[0], c[1]] : "lng" in c ? [c.lng, c.lat] : [c.lon, c.lat];
        let marker;
        if (options.customMarker) {
          const customEl = document.querySelector(
            options.customMarker
          );
          if (customEl) {
            customEl.style.display = "block";
            marker = new GeoloniaMarker({
              element: customEl,
              offset: options.customMarkerOffset || [0, 0]
            }).setLngLat(center).addTo(map);
          } else {
            marker = new GeoloniaMarker({ color: options.markerColor }).setLngLat(center).addTo(map);
          }
        } else {
          marker = new GeoloniaMarker({ color: options.markerColor }).setLngLat(center).addTo(map);
        }
        const content = container.dataset?.popupContent;
        if (content) {
          const popup = new import_maplibre_gl4.Popup({ offset: [0, -25] }).setHTML(content);
          marker.setPopup(popup);
          if (options.openPopup) {
            marker.togglePopup();
          }
        } else if (options.openPopup) {
        }
        marker.getElement().classList.add("geolonia-clickable-marker");
      }
    });
    this.on("styledata", async () => {
      if (!this.__styleExtensionLoadRequired) {
        return;
      }
      this.__styleExtensionLoadRequired = false;
      if (options.simpleVector) {
        const url = parseSimpleVector(options.simpleVector);
        new simplestyle_vector_default(url).addTo(this);
      }
      if (options.geojson) {
        const ss = new SimpleStyle(options.geojson, {
          cluster: options.cluster !== false,
          clusterColor: options.clusterColor || "#ff0000"
        });
        ss.addTo(this);
        if (!options.center) {
          ss.fitBounds();
        }
      }
      if (options["3d"] === true) {
        const style = this.getStyle();
        if (style?.layers) {
          for (const layer of style.layers) {
            const metadata = layer.metadata;
            if (metadata?.["visible-on-3d"]) {
              this.setLayoutProperty(layer.id, "visibility", "visible");
            }
            if (metadata?.["hide-on-3d"]) {
              this.setLayoutProperty(layer.id, "visibility", "none");
            }
          }
        }
      }
    });
    this.on("error", async (error) => {
      if (error.error && error.error.status === 402) {
        handleRestrictedMode(this);
      }
    });
    container.geoloniaMap = this;
    return this;
  }
  setStyle(style, options = {}) {
    if (style !== null && typeof style === "string") {
      style = getStyle(style, { lang: getLang(), apiKey: keyring.apiKey });
    }
    this.__styleExtensionLoadRequired = true;
    super.setStyle.call(this, style, options);
    return this;
  }
  remove() {
    const container = this.getContainer();
    super.remove.call(this);
    delete container.geoloniaMap;
  }
  loadImage(url, callback) {
    const promise = super.loadImage(url);
    if (callback) {
      loadImageCompatibility(promise, callback);
    } else {
      return promise;
    }
  }
};

// src/version.ts
var VERSION = "0.1.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomAttributionControl,
  GeoloniaControl,
  GeoloniaMap,
  GeoloniaMarker,
  SimpleStyle,
  SimpleStyleVector,
  coreVersion,
  getLang,
  getStyle,
  isGeoloniaTilesHost,
  keyring
});
