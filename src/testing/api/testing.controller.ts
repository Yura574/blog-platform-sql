import {Controller, Get} from "@nestjs/common";
import {TestingService} from "../application/testing.service";


@Controller('testing')
export class TestingController {
    constructor(private testingService: TestingService) {
    }

    @Get()
    async deleteAllData(): Promise<void> {
        return await this.testingService.deleteAllData();
    }
}