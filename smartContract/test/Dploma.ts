import {IDploma, ITemplate, ICertified, ICertifier} from "../../src/Type/type"

const {expect} = require("chai");
const {ethers} = require("hardhat");
import {config as dotEnvConfig} from "dotenv";
import {BigNumber} from "ethers";

dotEnvConfig({path: "../.env"});
describe("Dploma", function () {
    let Dploma;
    let dploma;
    let addrCertified: { address: any; } = {address: process.env.METAMASK_ACCOUNT};
    let addrCertifier: { address: any; } = {address: process.env.METAMASK_ACCOUNT};
    this.timeout(100000);
    beforeEach(async function () {
        Dploma = await ethers.getContractFactory("Dploma");
        dploma = await Dploma.deploy();
        await dploma.deployed();
    });


    it("should create a template", async function () {
        const tempTitle = "Template Title";
        const tempName = "Template Name";
        const tempDate = 1622179200; // Unix timestamp for June 28, 2021
        const tempSpecs = ["Spec 1", "Spec 2"];

        const tx = await dploma.createTemplate(tempTitle, tempName, tempDate, tempSpecs);
        const receipt = await tx.wait();

        const event = receipt.events.find((event) => event.event === "evtTemplate");
        const hashTemplate = event.args[1];

        expect(hashTemplate).to.exist;
    });

    it("should insert certification with existing template", async function () {
        const cfiedFirstname = "John";
        const cfiedLastname = "Doe";
        const cfiedBirthdate = "1990-01-01";
        const cfierName = "Certifier Name";
        const cfierAdress = "Certifier Address";

        const tempTitle = "Template Title";
        const tempName = "Template Name";
        const tempDate = 1622179200; // Unix timestamp for June 28, 2021
        const tempSpecs = ["Spec 1", "Spec 2"];

        const tx = await dploma.createTemplate(tempTitle, tempName, tempDate, tempSpecs);
        const receipt = await tx.wait();

        const event = receipt.events.find((event) => event.event === "evtTemplate");
        const hashTemplate = event.args[1];

        const txInsert = await dploma.insertWithTemplate(
            cfiedFirstname,
            cfiedLastname,
            cfiedBirthdate,
            cfierName,
            cfierAdress,
            hashTemplate,
            addrCertified.address
        );
        const insertReceipt = await txInsert.wait();

        const insertEvent = insertReceipt.events.find((event) => event.event === "evtCertifCreation");
        const hashCert = insertEvent.args[1];

        const certification: IDploma = await dploma.getCertification(hashCert);
        expect(certification).to.exist;

        expect(certification.certAddrCertifier).to.equal(addrCertifier.address);
        expect(certification.certAddrCertified).to.equal(addrCertified.address);
        expect(certification.certCertified?.cfiedFirstname).to.equal(cfiedFirstname);
        expect(certification.certCertified?.cfiedLastname).to.equal(cfiedLastname);
        expect(certification.certCertified?.cfiedBirthdate).to.equal(cfiedBirthdate);
        expect(certification.certCertifier?.cfierName).to.equal(cfierName);
        expect(certification.certCertifier?.cfierPhysicalAddress).to.equal(cfierAdress);
        expect(certification.certTemplate?.tempTitle).to.equal(tempTitle);
        expect(certification.certTemplate?.tempName).to.equal(tempName);
        expect(certification.certTemplate?.tempSpecs).to.deep.equal(tempSpecs);
    });
    it("should insert certification without template", async function () {
        const cfiedFirstname = "John";
        const cfiedLastname = "Doe";
        const cfiedBirthdate = "1990-01-01";
        const cfierName = "Certifier Name";
        const cfierPhysicalAddress = "Certifier Physical Address";

        const tempTitle = "Custom Template Title";
        const tempName = "Custom Template Name";
        const tempDate = 1654003200; // Unix timestamp for June 1, 2022
        const tempSpecs = ["Custom Spec 1", "Custom Spec 2"];

        const txInsert = await dploma.insertWithoutTemplate(
            cfiedFirstname,
            cfiedLastname,
            cfiedBirthdate,
            cfierName,
            cfierPhysicalAddress,
            addrCertified.address,
            tempTitle,
            tempName,
            tempDate,
            tempSpecs
        );
        const insertReceipt = await txInsert.wait();

        const insertEvent = insertReceipt.events.find((event) => event.event === "evtCertifCreation");
        const hashCert = insertEvent.args[1];

        const certification: IDploma = await dploma.getCertification(hashCert);

        expect(certification.certAddrCertifier).to.equal(addrCertifier.address);
        expect(certification.certAddrCertified).to.equal(addrCertified.address);
        expect(certification.certCertified?.cfiedFirstname).to.equal(cfiedFirstname);
        expect(certification.certCertified?.cfiedLastname).to.equal(cfiedLastname);
        expect(certification.certCertified?.cfiedBirthdate).to.equal(cfiedBirthdate);
        expect(certification.certCertifier?.cfierName).to.equal(cfierName);
        expect(certification.certCertifier?.cfierPhysicalAddress).to.equal(cfierPhysicalAddress);
        expect(certification.certTemplate?.tempTitle).to.equal(tempTitle);
        expect(certification.certTemplate?.tempName).to.equal(tempName);
        ;
        expect(certification.certTemplate?.tempSpecs).to.deep.equal(tempSpecs);
    });

    it("should toggle student visibility", async function () {
        const cfiedFirstname = "John";
        const cfiedLastname = "Doe";
        const cfiedBirthdate = "1990-01-01";
        const cfierName = "Certifier Name";
        const cfierAdress = "Certifier Address";

        const tempTitle = "Template Title";
        const tempName = "Template Name";
        const tempDate = 1622179200; // Unix timestamp for June 28, 2021
        const tempSpecs = ["Spec 1", "Spec 2"];

        const tx = await dploma.createTemplate(tempTitle, tempName, tempDate, tempSpecs);
        const receipt = await tx.wait();

        const event = receipt.events.find((event) => event.event === "evtTemplate");
        const hashTemplate = event.args[1];

        const txInsert = await dploma.insertWithTemplate(
            cfiedFirstname,
            cfiedLastname,
            cfiedBirthdate,
            cfierName,
            cfierAdress,
            hashTemplate,
            addrCertified.address
        );
        const insertReceipt = await txInsert.wait();

        const insertEvent = insertReceipt.events.find((event) => event.event === "evtCertifCreation");
        const hashCert = insertEvent.args[1];

        // Check initial visibility
        let certification = await dploma.getCertification(hashCert);
        expect(certification.certCertified.cfiedFirstname).to.equal(cfiedFirstname);

        // Toggle visibility
        const txToggle = await dploma.toggleStudentVisibility(hashCert);
        const toggleReceipt = await txToggle.wait();

        const toggleEvent = toggleReceipt.events.find((event) => event.event === "evtCertifiedVisibility");
        expect(toggleEvent).to.not.be.undefined;

        // Check updated visibility
        certification = await dploma.getCertification(hashCert);
        expect(certification.certCertified.cfiedFirstname).to.equal("hidden");
        expect(certification.certCertified.cfiedLastname).to.equal("hidden");
        expect(certification.certCertified.cfiedBirthdate).to.equal("hidden");

        // Toggle visibility again
        const txToggleAgain = await dploma.toggleStudentVisibility(hashCert);
        const toggleAgainReceipt = await txToggleAgain.wait();

        // Check final visibility
        certification = await dploma.getCertification(hashCert);
        expect(certification.certCertified.cfiedFirstname).to.equal(cfiedFirstname);
        expect(certification.certCertified.cfiedLastname).to.equal(cfiedLastname);
        expect(certification.certCertified.cfiedBirthdate).to.equal(cfiedBirthdate);
    });

    it("should modify template", async function () {
        const cfiedFirstname = "John";
        const cfiedLastname = "Doe";
        const cfiedBirthdate = "1990-01-01";
        const cfierName = "Certifier Name";
        const cfierAdress = "Certifier Address";

        const tempTitle = "Template Title";
        const tempName = "Template Name";
        const tempDate = 1622179200; // Unix timestamp for June 28, 2021
        const tempSpecs = ["Spec 1", "Spec 2"];

        const tx = await dploma.createTemplate(tempTitle, tempName, tempDate, tempSpecs);
        const receipt = await tx.wait();

        const event = receipt.events.find((event) => event.event === "evtTemplate");
        const hashTemplate = event.args[1];

        const txInsert = await dploma.insertWithTemplate(
            cfiedFirstname,
            cfiedLastname,
            cfiedBirthdate,
            cfierName,
            cfierAdress,
            hashTemplate,
            addrCertified.address
        );
        const insertReceipt = await txInsert.wait();

        const insertEvent = insertReceipt.events.find((event) => event.event === "evtCertifCreation");
        const hashCert = insertEvent.args[1];

        // Modify template
        const newTitle = "New Template Title";
        const newName = "New Template Name";
        const newDate = 1654003200; // Unix timestamp for June 1, 2022
        const newSpecs = ["New Spec 1", "New Spec 2"];

        const txModify = await dploma.modifyTemplate(hashCert, newTitle, newName, newDate, newSpecs);
        const modifyReceipt = await txModify.wait();

        const modifyEvent = modifyReceipt.events.find((event) => event.event === "evtModificationMsg");
        expect(modifyEvent).to.not.be.undefined;

        // Check modified template
        const certification = await dploma.getCertification(hashCert);
        expect(certification.certTemplate.tempTitle).to.equal(newTitle);
        expect(certification.certTemplate.tempName).to.equal(newName);
        expect(certification.certTemplate.tempSpecs).to.deep.equal(newSpecs);
    });
    it("should delete certification", async function () {
        const cfiedFirstname = "John";
        const cfiedLastname = "Doe";
        const cfiedBirthdate = "1990-01-01";
        const cfierName = "Certifier Name";
        const cfierAdress = "Certifier Address";

        const tempTitle = "Template Title";
        const tempName = "Template Name";
        const tempDate = 1622179200; // Unix timestamp for June 28, 2021
        const tempSpecs = ["Spec 1", "Spec 2"];

        const tx = await dploma.createTemplate(tempTitle, tempName, tempDate, tempSpecs);
        const receipt = await tx.wait();

        const event = receipt.events.find((event) => event.event === "evtTemplate");
        const hashTemplate = event.args[1];

        const txInsert = await dploma.insertWithTemplate(
            cfiedFirstname,
            cfiedLastname,
            cfiedBirthdate,
            cfierName,
            cfierAdress,
            hashTemplate,
            addrCertified.address
        );
        const insertReceipt = await txInsert.wait();

        const insertEvent = insertReceipt.events.find((event) => event.event === "evtCertifCreation");
        const hashCert = insertEvent.args[1];

        // Delete certification
        const txDelete = await dploma.deleteCertif(hashCert);
        const deleteReceipt = await txDelete.wait();

        // Check if certification is deleted
        const certification = await dploma.getCertification(hashCert);
        !expect(certification.certAddrCertifier).to.exist;
    });

})
