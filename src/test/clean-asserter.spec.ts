import {describe, expect, test} from "bun:test";
import type { Dragee } from "@dragee-io/type/common";
import { type Report, asserterHandler } from "@dragee-io/type/asserter";
import cleanAsserter from "../..";

interface TestObject {
    dragees: Dragee[],
    result: {
        pass: boolean,
        errors: string[],
    },
}

function rulePassed(drageeDirectory: string) {
    test('Rule passed', () => {
        const data: TestObject = require(drageeDirectory)
        const report = asserterHandler(cleanAsserter, data.dragees)
        expect(report.pass).toBe(data.result.pass)
    })
}

function ruleFailed(drageeDirectory: string) {
    test('Rule failed', () => {
        const data: TestObject = require(drageeDirectory)
        const report = asserterHandler(cleanAsserter, data.dragees)

        expect(report.pass).toBe(data.result.pass)
        data.result.errors.forEach(error => {
            expect(JSON.stringify(report.errors)).toContain(JSON.stringify(error))
        })
    })
}


describe('Clean Asserter', () => {

    test('assert with no dragees', () => {
        const report: Report = asserterHandler(cleanAsserter, []);
        expect(report.pass).toBeTrue();
        expect(report.namespace).toBe('clean');
    });
    
    describe('Use Case Rules', () => {
        const USE_CASE_ALLOWED_DEPENDENCIES_TEST_DIRECTORY = './clean/use-case-allowed-dependencies/';
        describe('A use case must not have any dependency of type Controller/Presenter', () => {
            rulePassed(USE_CASE_ALLOWED_DEPENDENCIES_TEST_DIRECTORY + '/rule-passed.json');
            ruleFailed(USE_CASE_ALLOWED_DEPENDENCIES_TEST_DIRECTORY + '/rule-failed.json');
        })
    });
    
    describe('Controller Rules', () => {
        const CONTROLLER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY = './clean/controller-mandatory-dependencies/';
        describe('A controller must at least contain one use case', () => {
            rulePassed(CONTROLLER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-passed.json');
            ruleFailed(CONTROLLER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-failed.json');
        })
    });
    
    describe('Presenter Rules', () => {
        const PRESENTER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY = './clean/presenter-mandatory-dependencies/';
        describe('A presenter must at least contain one use case', () => {
            rulePassed(PRESENTER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-passed.json');
            ruleFailed(PRESENTER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-failed.json');
        })
    });
})