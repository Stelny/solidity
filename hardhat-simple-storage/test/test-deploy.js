const  { ethers } = require("hardhat")
const  { expect, assert } = require("chai")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage;
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorageFactory.deploy();
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue);
    })

    it("Should update when we call store", async () => {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    })

    it("People start with lenght of 0", async () => {
        const expectectedValue = "0";
        const currentValue = await simpleStorage.people.length;
        assert.equal(expectectedValue, currentValue);
    })

    it("Add People to contract Array", async () => {
        const expectectedValue = "8";
        const transactionResponse = await simpleStorage.addPerson("Jan", expectectedValue);
        transactionResponse.wait(1);

        const favoriteNumber = await simpleStorage.getPersonList("Jan");
        
        assert.equal(expectectedValue, favoriteNumber);
    })

    it("Add People to contract Mapping", async () => {
        const expectectedValue = "8";
        const transactionResponse = await simpleStorage.addPerson("Jan", expectectedValue);
        transactionResponse.wait(1);

        const favoriteNumber = await simpleStorage.getPersonMap("Jan");
        
        assert.equal(expectectedValue, favoriteNumber);
    })
})