import Attraction from "./attraction.model"

export class TripPlan  {
    constructor(
        public id: string,
        public title: string,
        public attractions: Attraction[],
        public collaborators: string[], // will be replaced with user IDs
        public dates: {
            startDate: Date,
            endDate: Date
        },
        public thumbnail: string // url for an image
    ) {}
}