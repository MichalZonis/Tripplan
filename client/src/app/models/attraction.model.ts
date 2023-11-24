export class Attraction {
    constructor(
        public id: string,
        public name: string,
        public GeolocationCoordinates: {
            lat: number,
            lng: number
        },
        public isOptional: boolean,
        public visitHours: {
            startTime: string,
            endTime: string
        },
        public visitDates: {
            startDate: Date,
            endDate: Date
        },
        public description: string,
        public attractionPrice: number,
    ) {}
}