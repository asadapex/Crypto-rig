import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class VideocardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateVideocardDto): Promise<{
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
    update(id: string, data: UpdateVideocardDto): Promise<{
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
