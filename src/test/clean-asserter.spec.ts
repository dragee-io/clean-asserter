import { describe, expect, test } from 'bun:test';

import { type Report, asserterHandler } from '@dragee-io/type/asserter';
import cleanAsserter from '../..';
import { ruleFailed, rulePassed } from './test_utils';

describe('Clean Asserter', () => {
    const folder = './clean/';

    test('assert with no dragees', () => {
        const report: Report = asserterHandler(cleanAsserter, []);
        expect(report.pass).toBeTrue();
        expect(report.namespace).toBe('clean');
    });

    describe('Use Case Rules', () => {
        const USE_CASE_ALLOWED_DEPENDENCIES_RULE = 'use-case-allowed-dependencies';

        describe('A use case must not have any dependency of type Controller/Presenter', () => {
            rulePassed(
                `${folder}${USE_CASE_ALLOWED_DEPENDENCIES_RULE}/rule-passed.json`,
                USE_CASE_ALLOWED_DEPENDENCIES_RULE
            );
            ruleFailed(
                `${folder}${USE_CASE_ALLOWED_DEPENDENCIES_RULE}/rule-failed.json`,
                USE_CASE_ALLOWED_DEPENDENCIES_RULE
            );
        });
    });

    describe('Controller Rules', () => {
        const CONTROLLER_MANDATORY_DEPENDENCIES_RULE = 'controller-mandatory-dependencies';

        describe('A controller must at least contain one use case', () => {
            rulePassed(
                `${folder}${CONTROLLER_MANDATORY_DEPENDENCIES_RULE}/rule-passed.json`,
                CONTROLLER_MANDATORY_DEPENDENCIES_RULE
            );
            ruleFailed(
                `${folder}${CONTROLLER_MANDATORY_DEPENDENCIES_RULE}/rule-failed.json`,
                CONTROLLER_MANDATORY_DEPENDENCIES_RULE
            );
        });
    });

    describe('Presenter Rules', () => {
        const PRESENTER_MANDATORY_DEPENDENCIES_RULE = 'presenter-mandatory-dependencies';

        describe('A presenter must at least contain one use case', () => {
            rulePassed(
                `${folder}${PRESENTER_MANDATORY_DEPENDENCIES_RULE}/rule-passed.json`,
                PRESENTER_MANDATORY_DEPENDENCIES_RULE
            );
            ruleFailed(
                `${folder}${PRESENTER_MANDATORY_DEPENDENCIES_RULE}/rule-failed.json`,
                PRESENTER_MANDATORY_DEPENDENCIES_RULE
            );
        });
    });
});
