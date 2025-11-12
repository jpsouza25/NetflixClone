export class UtilsHelper {
public static interpolateColor(startColor: number[], endColor: number[], progress: number){

    return startColor.map((start, index) => Math.round(start + (endColor[index] - start) * progress));
}
}