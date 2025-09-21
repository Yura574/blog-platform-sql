import {clearDatabase, closeTest, initializeTestSetup} from "../../test-setup";


describe('POST users', () => {
    beforeAll(async () => {
        await initializeTestSetup();
    },10000000)
    beforeEach(async () => {
        await clearDatabase()

    })




    it('should create user', () => {
        console.log('122')
    });

})