import { CreateService } from './create.service';
export declare class CreateController {
    private readonly createService;
    constructor(createService: CreateService);
    create(data: {
        name: string;
        link: string;
        memo: string;
    }, authorization: string): Promise<any>;
}
