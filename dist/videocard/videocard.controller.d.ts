import { VideocardService } from './videocard.service';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
export declare class VideocardController {
    private readonly videocardService;
    constructor(videocardService: VideocardService);
    create(createVideocardDto: CreateVideocardDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            image: string | null;
            manufacturer: string;
            model: string;
            release: number;
            algorithm: string;
            hashRate: string;
            powerEfficiency: string;
            powerUsage: string;
            supportedCoins: string;
            network: string;
            fans: number;
            temperature: string;
            noiseLevel: string;
            weight: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    findAll(): Promise<{
        data: {
            id: string;
            createdAt: Date;
            image: string | null;
            manufacturer: string;
            model: string;
            release: number;
            algorithm: string;
            hashRate: string;
            powerEfficiency: string;
            powerUsage: string;
            supportedCoins: string;
            network: string;
            fans: number;
            temperature: string;
            noiseLevel: string;
            weight: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    findOne(id: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            image: string | null;
            manufacturer: string;
            model: string;
            release: number;
            algorithm: string;
            hashRate: string;
            powerEfficiency: string;
            powerUsage: string;
            supportedCoins: string;
            network: string;
            fans: number;
            temperature: string;
            noiseLevel: string;
            weight: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    update(id: string, updateVideocardDto: UpdateVideocardDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            image: string | null;
            manufacturer: string;
            model: string;
            release: number;
            algorithm: string;
            hashRate: string;
            powerEfficiency: string;
            powerUsage: string;
            supportedCoins: string;
            network: string;
            fans: number;
            temperature: string;
            noiseLevel: string;
            weight: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    remove(id: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            image: string | null;
            manufacturer: string;
            model: string;
            release: number;
            algorithm: string;
            hashRate: string;
            powerEfficiency: string;
            powerUsage: string;
            supportedCoins: string;
            network: string;
            fans: number;
            temperature: string;
            noiseLevel: string;
            weight: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
