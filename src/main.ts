import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const port = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);
    await app.listen(port, () => {
        console.log(process.env.DB_URL)
        console.log(process.env.PORT)
    });
}

bootstrap();
