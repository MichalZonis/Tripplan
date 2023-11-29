export type TripPlan = {
    title: string,
    _id?: string,
    planners: string[],
    thumbnail?: string,
    dates: dates,

    // constructor() {
    //     this.name = "lllll";
    //     this.id = "1";
    //     this.planners = ["Michal", "Yair", "Michael"]

    // }
}

type dates = {
    startDate: Date,
    endDate: Date
}

export default TripPlan