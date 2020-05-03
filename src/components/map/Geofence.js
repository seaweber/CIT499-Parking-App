export class Geofence {

    constructor ( latitude, longitude, radius ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
    }

    inside = ( lat2, lon2 ) => {

        const lat1 = this.latitude;
        const lon1 = this.longitude;

        // draw a circle based on radius and determine if position is within that circle
        return Math.sqrt(( lat2 - lat1 ) * ( lat2 - lat1 ) + (lon2-lon1)*( lon2 - lon1 ) ) < this.radius;
    }

}
