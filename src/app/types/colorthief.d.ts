declare module 'colorthief' {
    export default class ColorThief {
        getColor( sourceImage:HTMLImageElement, quality?: number): [number,number,number];
        getPallete( sourceImage:HTMLImageElement, colorCount?: number, quality?: number): [number,number,number] [];
    }
}