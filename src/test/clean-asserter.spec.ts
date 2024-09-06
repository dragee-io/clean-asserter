import {describe, expect, test} from "bun:test";
import type { Dragee, Report } from "@dragee-io/asserter-type";
import CleanDddAsserter from "../..";

const asserter = CleanDddAsserter.handler

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
        const report = asserter(data.dragees)
        expect(report.pass).toBe(data.result.pass)
    })
}

function ruleFailed(drageeDirectory: string) {
    test('Rule failed', () => {
        const data: TestObject = require(drageeDirectory)
        const report = asserter(data.dragees)

        expect(report.pass).toBe(data.result.pass)
        data.result.errors.forEach(error => {
            expect(report.errors).toContain(error)
        })
    })
}


describe('Clean Asserter', () => {

    test('assert with no dragees', () => {
        const report: Report = asserter([]);
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
        describe('An controller must at least contains one use case', () => {
            rulePassed(CONTROLLER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-passed.json');
            ruleFailed(CONTROLLER_MANDATORY_DEPENDENCIES_TEST_DIRECTORY + '/rule-failed.json');
        })
    });
})