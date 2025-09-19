import {DynamicModule, Module} from "@nestjs/common";
import {TestingController} from "./api/testing.controller";
import {TestingService} from "./application/testing.service";


@Module({})

export class TestingModule {
    static register (): DynamicModule{
        if(1){
            return {
                module : TestingModule,
                imports:[],
                providers: [TestingService],
                controllers: [TestingController],
            }
        }
        return {
            module : TestingModule,
            imports:[],
            providers: [],
            controllers: [],
        }
}
}