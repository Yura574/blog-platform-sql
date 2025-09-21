import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TestingModule} from "./testing/testing.module";
import {ConfigModule} from "@nestjs/config";
import {FallbackController} from "./fallback.controller";


@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DB_URL,
            autoLoadEntities: true,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
        }),
        TestingModule.register(),
    ],
    controllers: [AppController,
        // FallbackController
    ],
    providers: [AppService],
})
export class AppModule {
}
