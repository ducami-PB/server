import { GetService } from './get.service';
export declare class GetController {
    private readonly getService;
    constructor(getService: GetService);
    create(authorization: string): Promise<any>;
}
