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
            // url: 'postgresql://neondb_owner:npg_gj5I9vWqNTEF@ep-crimson-wildflower-adaxzxt3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
            // port: 5432,
            // username: 'root',
            // password: 'root',
            // database: 'blog-platform',
            // entities: [],
            autoLoadEntities: true,

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
