import maplibregl from 'maplibre-gl';
import type { MapOptions, StyleOptions, StyleSpecification, StyleSwapOptions } from 'maplibre-gl';
export type GeoloniaMapOptions = Omit<MapOptions, 'style'> & {
    interactive?: boolean;
};
/**
 * Render the map
 *
 * @param container
 */
export default class GeoloniaMap extends maplibregl.Map {
    private geoloniaSourcesUrl;
    private __styleExtensionLoadRequired;
    constructor(params: string | GeoloniaMapOptions);
    /**
     *
     * @param {string|null} style style identity or `null` when map.remove()
     * @param {*} options
     */
    setStyle(style: string | StyleSpecification, options?: StyleSwapOptions & StyleOptions): this;
    remove(): void;
}
