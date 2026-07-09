import { mockData } from "./mock-data";


export async function getProducts(): Promise<HomePageFeaturedProduct[]> {
    return mockData;
}

export interface HomePageFeaturedProduct {
    id: number;
    genericPartId: number;
    genericPartNumber: string;
    familyId: number;
    familyName: string;
    familyNameEnglish: string;
    deviceDescription: string;
    releaseDate: Date;
    marketingStatusId: number;
    marketingStatus: string;
    marketingStatusDescription: string;
    newFlag: boolean;
    partImageAvailable: boolean;
    partImageUrl: string;
    gpnUrl: string;
    language: string;
    datasheetUrl: string;
    currency: string;
    displayQuantity: string;
    approximatePrice: string;
    selectionToolUrl: string;
    altText: string;
}