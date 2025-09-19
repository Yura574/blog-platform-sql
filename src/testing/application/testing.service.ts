import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";

@Injectable()
export class TestingService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    }

    async deleteAllData() {
        const queryRunner = this.dataSource.createQueryRunner();
        const tables = await queryRunner.query(`
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public';
        `);
        for (const row of tables) {
            const tableName = row.tablename;
            await queryRunner.query(
                `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
            );
        }

        await queryRunner.release();
    }


}