import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getSummary(): Promise<import("./stats.service").IServiceReponse>;
    getTopUsers(): Promise<import("./stats.service").IServiceReponse>;
    getProductStats(): Promise<import("./stats.service").IServiceReponse>;
    getCharts(from?: string, to?: string): Promise<import("./stats.service").IServiceReponse>;
}
