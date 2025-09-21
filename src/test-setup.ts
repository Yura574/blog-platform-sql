import {INestApplication} from "@nestjs/common";
import {DataSource} from "typeorm";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppModule} from "./app.module";
import request from 'supertest';


process.env.ENV= 'TESTING'



export let testApp :INestApplication
export let testSetup: TestSetup

export const initializeTestSetup = async () => {
    testSetup = new TestSetup();
    testApp = await testSetup.init();
};
export const closeTest = async () => {
    await testSetup.close();
};

export const clearDatabase = async () => {
    await testSetup.clearDatabase();
};


export class TestSetup {
    public app: INestApplication;
    public pgContainer: PostgreSqlContainer;
    public startedContainer: StartedPostgreSqlContainer;
    public dataSource: DataSource;
    async init() {
        // Запуск PostgreSQL контейнера
        this.pgContainer = new PostgreSqlContainer("postgres:15-alpine")
            .withDatabase("test-db")
            .withUsername("test")
            .withPassword("test");

        this.startedContainer = await this.pgContainer.start();

        const moduleFixture: TestingModule =  await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: this.startedContainer.getHost(),
                    port: this.startedContainer.getPort(),
                    username: this.startedContainer.getUsername(),
                    password: this.startedContainer.getPassword(),
                    database: this.startedContainer.getDatabase(),
                    autoLoadEntities: true,
                    synchronize: true, // только для тестов!
                }),
                AppModule,
            ],
        }).compile()


        this.app = moduleFixture.createNestApplication();
        await this.app.init();

        this.dataSource = moduleFixture.get<DataSource>(DataSource);

        return this.app;
    }

    async close() {
        await this.app.close();
        await this.startedContainer.stop();
    }
    async clearDatabase() {
        await request(this.app.getHttpServer())
            .delete('/testing/all-data');
    }
}